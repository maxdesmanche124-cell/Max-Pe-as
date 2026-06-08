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
      console.warn('Error listing buckets in Supabase:', error.message);
      console.error(
        `🚨 DIAGNÓSTICO DE INICIALIZAÇÃO DO BUCKET:\n` +
        `Ao listar os buckets do Supabase, ocorreu o erro: "${error.message}". Código: ${error.name}.\n` +
        `Geralmente isso ocorre se a API de Storage não está exposta no endpoint ou se o bucket "site-images" precisa ser criado manualmente através do painel do Supabase com o nome EXATO de "site-images" marcado como PÚBLICO.`
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
        console.warn('Failed to auto-create bucket "site-images":', createError.message);
        console.error(
          `🚨 ERRO AO CRIAR BUCKET AUTOMATICAMENTE:\n` +
          `O cliente anônimo não possui permissão para criar buckets automáticos no seu projeto do Supabase.\n` +
          `Por favor, acesse seu painel do Supabase (https://supabase.com), vá em Storage, clique em "New bucket", defina o nome como "site-images" (letras minúsculas) e marque a opção "Public bucket" como ATIVADA.`
        );
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error('ensureBucketExists error:', err);
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
      console.error(`[SUPABASE ERROR] Falha no upload para o caminho "${filePath}":`, error.message, error);
      console.error(
        `🚨 INSTRUÇÕES DE DIAGNÓSTICO DO SUPABASE STORAGE:\n` +
        `Para resolver o erro "${error.message}", certifique-se de que no seu painel do Supabase:\n` +
        `1. O bucket "site-images" exista e seja do tipo PÚBLICO (Public).\n` +
        `2. Você tenha configurado as políticas de RLS (Row Level Security) para habilitar uploads anônimos/públicos. No SQL Editor do Supabase, execute o seguinte comando:\n\n` +
        `   -- 1. Permitir que qualquer pessoa acesse os arquivos públicos\n` +
        `   CREATE POLICY "Acesso Publico de Leitura" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');\n\n` +
        `   -- 2. Permitir inserts/uploads na pasta 'uploads' ou no bucket 'site-images'\n` +
        `   CREATE POLICY "Permitir Upload Publico" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images');\n\n` +
        `   -- 3. Permitir atualização rápida se necessário (upsert/update)\n` +
        `   CREATE POLICY "Permitir Update Publico" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images');\n`
      );
      return null;
    }

    const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error(`Error in uploadToStorage for "${filePath}":`, err);
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
    console.error(`Error deleting storage file for "${filePath}":`, err);
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
