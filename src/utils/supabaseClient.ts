import { createClient } from '@supabase/supabase-js';

// Environment variables checks
const rawSupabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

// Clean up the URL to guarantee compatibility if the user pasted full PostgREST endpoint
export function cleanSupabaseUrl(url: string): string {
  let cleaned = url.trim();
  if (cleaned.endsWith('/rest/v1/')) {
    cleaned = cleaned.slice(0, -'/rest/v1/'.length);
  } else if (cleaned.endsWith('/rest/v1')) {
    cleaned = cleaned.slice(0, -'/rest/v1'.length);
  }
  if (cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

const supabaseUrl = cleanSupabaseUrl(rawSupabaseUrl);

// Lazy initialization check
export function isSupabaseConfigured(): boolean {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'YOUR_SUPABASE_URL' &&
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
    supabaseUrl.trim() !== '' &&
    supabaseAnonKey.trim() !== ''
  );
}

// Safely export client or null if not configured
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initialize the site-images bucket if needed
export async function ensureBucketExists(): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.warn('[Supabase Config] Nao foi possivel listar os buckets:', error.message);
      console.warn(
        'Dica de configuracao: Caso o bucket "site-images" nao exista, crie-o manualmente no painel da Supabase com acesso Public.'
      );
      return false;
    }
    const exists = buckets?.some((b) => b.name === 'site-images');
    if (!exists) {
      const { error: createError } = await supabase.storage.createBucket('site-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      if (createError) {
        console.warn('[Supabase Config] Falha ao tentar criar o bucket "site-images" via Anon Key:', createError.message);
        console.warn(
          'Aviso: O cliente anonimo nao possui permissao de criar buckets automaticamente no Supabase. Crie-o manualmente com o nome de "site-images" e tipo Public.'
        );
        return false;
      }
    }
    return true;
  } catch (err) {
    console.warn('[Supabase Config] Erro ao garantir existencia do bucket:', err);
    return false;
  }
}

// Upload a text/blob payload as a file in the "site-images" storage bucket
export async function uploadToStorage(
  filePath: string,
  fileBody: Blob | File | string,
  contentType?: string
): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { error } = await supabase.storage
      .from('site-images')
      .upload(filePath, fileBody, {
        upsert: true,
        contentType: contentType,
      });

    if (error) {
      console.warn(`[Supabase Upload] Nao foi possivel salvar no caminho "${filePath}":`, error.message);
      console.warn(
        'Caso receba erro de Row Level Security (RLS), lembre-se de configurar as permissoes para Insert/Select do bucket "site-images" no seu dashboard do Supabase.'
      );
      return null;
    }

    const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.warn(`[Supabase Upload] Erro no upload para "${filePath}":`, err);
    return null;
  }
}

// Drop a file from "site-images" storage bucket
export async function deleteFromStorage(filePath: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.storage.from('site-images').remove([filePath]);
    if (error) {
      console.warn(`Failed to delete "${filePath}" from Supabase Storage:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`Error deleting storage file for "${filePath}":`, err);
    return false;
  }
}

// Helper to download remote Unsplash / HTTP image and re-upload it publicly via Supabase Storage
export async function uploadRemoteUrlToSupabase(id: string, remoteUrl: string): Promise<string> {
  if (!supabase) return remoteUrl;
  try {
    // If the URL already comes from Supabase Storage, do not re-upload it
    if (remoteUrl.includes('supabase.co/storage/v1/object/public/site-images')) {
      return remoteUrl;
    }

    const res = await fetch(remoteUrl);
    if (!res.ok) {
      console.warn(`Unsuccessful fetch response for remote image ${remoteUrl}. Using original URL.`);
      return remoteUrl;
    }
    const blob = await res.blob();
    
    // Identify file format
    let ext = 'jpg';
    if (blob.type === 'image/png') ext = 'png';
    else if (blob.type === 'image/webp') ext = 'webp';
    else if (blob.type === 'image/gif') ext = 'gif';
    else if (blob.type === 'image/svg+xml') ext = 'svg';

    const filePath = `uploads/${id}.${ext}`;
    const pubUrl = await uploadToStorage(filePath, blob, blob.type);
    return pubUrl || remoteUrl;
  } catch (err) {
    console.warn(`Could not fetch & upload remote URL "${remoteUrl}" to Supabase storage. Falling back to source url.`, err);
    return remoteUrl;
  }
}
