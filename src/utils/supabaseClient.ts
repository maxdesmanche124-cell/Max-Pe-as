import { createClient } from '@supabase/supabase-js';

// Environment variables checks
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

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
      console.error(`Upload to storage path "${filePath}" failed:`, error.message);
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
