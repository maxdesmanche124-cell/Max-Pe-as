import { CATEGORIES } from '../data/categories';
import { 
  supabase, 
  isSupabaseConfigured, 
  ensureBucketExists, 
  uploadToStorage, 
  uploadRemoteUrlToSupabase 
} from './supabaseClient';

// Types for the configurable site images
export interface SiteImage {
  id: string;
  category: 'banner' | 'category' | 'multimarca' | 'diferencial' | 'institutional' | 'reviews' | 'general';
  name: string; // Friendly visible name for categorization
  url: string;
  description?: string;
  isCustom?: boolean; // True if added by the admin
}

// Initial default multimarca brands
export interface MultimarcaBrand {
  id: string;
  name: string;
  imageUrl: string;
}

const DEFAULT_MULTIMARCAS: MultimarcaBrand[] = [
  { id: 'm1', name: 'Chevrolet', imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=300' },
  { id: 'm2', name: 'Fiat', imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=300' },
  { id: 'm3', name: 'Volkswagen', imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=300' },
  { id: 'm4', name: 'Ford', imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=300' },
  { id: 'm5', name: 'Toyota', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=300' },
  { id: 'm6', name: 'Honda', imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=300' },
  { id: 'm7', name: 'Hyundai', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=300' },
  { id: 'm8', name: 'Jeep', imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=300' }
];

const LOCAL_STORAGE_KEY = 'maxpecas_managed_images';

// Build premium default starting list for all 7 categories
export const defaultImages: SiteImage[] = [
  // 1. Banner Principal
  {
    id: 'hero-banner-bg',
    category: 'banner',
    name: 'Fundo do Banner Principal',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    description: 'Imagem de fundo estilizada exibida na seção principal do site'
  },
  // 2. Institucional
  {
    id: 'inst-about-main',
    category: 'institutional',
    name: 'Imagem Sobre a Empresa',
    url: 'https://images.unsplash.com/photo-1504215680048-db15fc060c3a?auto=format&fit=crop&q=80&w=600',
    description: 'Foto exibida na seção que detalha a história da MAXPEÇAS'
  },
  {
    id: 'inst-shipping-main',
    category: 'institutional',
    name: 'Imagem "Enviamos para Todo o Brasil"',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600',
    description: 'Imagem para a seção de despacho e transporte nacional'
  },
  // 3. Categorias de Autopeças
  ...CATEGORIES.map(cat => ({
    id: `category-img-${cat.id}`,
    category: 'category' as const,
    name: `Categoria - ${cat.name}`,
    url: cat.imageUrl || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
    description: `Foto de capa da categoria para ${cat.name}`
  })),
  // 4. Multimarcas Images
  ...DEFAULT_MULTIMARCAS.map(brand => ({
    id: `brand-img-${brand.id}`,
    category: 'multimarca' as const,
    name: `Marca - ${brand.name}`,
    url: brand.imageUrl,
    description: `Mini card com logotipo ou modelo representativo da marca ${brand.name}`
  })),
  // 5. Diferenciais (Icon/Fallback illustrations)
  {
    id: 'dif-safety-bg',
    category: 'diferencial',
    name: 'Imagem Ilustrativa - Segurança & Procedência',
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
    description: 'Fundo ilustrativo do compromisso de integridade regulatória e desmonte credenciado'
  },
  // 6. Avaliações (Placeholder or user photos)
  {
    id: 'review-avatar-placeholder',
    category: 'reviews',
    name: 'Foto Padrão de Clientes',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    description: 'Imagem de perfil ilustrativa exibida na seção de feedbacks e satisfação'
  },
  // 7. Imagens Gerais
  {
    id: 'general-facade',
    category: 'general',
    name: 'Fachada da Loja Física',
    url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=500',
    description: 'Miniatura representativa da localização e galpão de estoque físico'
  }
];

// memoryCache ensures speedy local lookups and renders on app mount
let memoryCache: SiteImage[] = [];

// Helper to query current state of images
export function getSavedImages(): SiteImage[] {
  if (memoryCache.length > 0) {
    return memoryCache;
  }
  if (typeof window === 'undefined') return defaultImages;
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultImages));
    memoryCache = [...defaultImages];
    return defaultImages;
  }
  try {
    const parsed = JSON.parse(raw);
    memoryCache = parsed;
    return parsed;
  } catch (err) {
    memoryCache = [...defaultImages];
    return defaultImages;
  }
}

export function saveImages(images: SiteImage[]) {
  memoryCache = [...images];
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
  }
}

// Upload metadata array directly to Supabase Storage
export async function saveMetadataToSupabase(imagesList: SiteImage[]): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    await ensureBucketExists();
    const jsonString = JSON.stringify(imagesList, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    const { error } = await supabase.storage
      .from('site-images')
      .upload('uploads/site-images-metadata.json', blob, {
        upsert: true,
        contentType: 'application/json',
      });
      
    if (error) {
      console.error('Failed to upload uploads/site-images-metadata.json:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving metadata to Supabase:', err);
    return false;
  }
}

// Synchronize memoryCache and localStorage with the live Supabase storage registry
export async function syncImagesWithSupabase(): Promise<SiteImage[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;
  try {
    await ensureBucketExists();
    const { data, error } = await supabase.storage
      .from('site-images')
      .download('uploads/site-images-metadata.json');

    if (error) {
      // If metadata not found, create and seed it
      console.log('uploads/site-images-metadata.json not found. Initializing and migrating default state...');
      await saveMetadataToSupabase(getSavedImages());
      return getSavedImages();
    }

    const text = await data.text();
    const remoteList = JSON.parse(text) as SiteImage[];
    
    // Update local cache & storage so layout picks it up
    saveImages(remoteList);
    return remoteList;
  } catch (err) {
    console.warn('Sync images with Supabase failed. Using local state.', err);
    return null;
  }
}

// Migrate any remote URLs (Unsplash) to be fully hosted in Supabase Storage instead
export async function migrateAllImagesToSupabase(
  onProgress?: (idx: number, total: number) => void
): Promise<SiteImage[]> {
  const currentList = getSavedImages();
  if (!isSupabaseConfigured() || !supabase) return currentList;

  const migratedList: SiteImage[] = [];
  await ensureBucketExists();

  for (let i = 0; i < currentList.length; i++) {
    const item = currentList[i];
    if (onProgress) onProgress(i + 1, currentList.length);

    // If the image is not already hosted on Supabase, fetch and migrate it
    if (!item.url.includes('.supabase.co/storage/v1/object/public/site-images')) {
      console.log(`Migrating image "${item.name}"...`);
      const supabaseUrlAddress = await uploadRemoteUrlToSupabase(item.id, item.url);
      migratedList.push({ ...item, url: supabaseUrlAddress });
    } else {
      migratedList.push(item);
    }
  }

  // Update memoryCache, localStorage, and Supabase JSON metadata
  saveImages(migratedList);
  await saveMetadataToSupabase(migratedList);
  return migratedList;
}

// Update single image URL
export function updateImageUrl(id: string, newUrl: string): SiteImage[] {
  const current = getSavedImages();
  const updated = current.map(img => {
    if (img.id === id) {
      return { ...img, url: newUrl };
    }
    return img;
  });
  saveImages(updated);
  
  // Asynchronous background persistence to Supabase
  if (isSupabaseConfigured()) {
    saveMetadataToSupabase(updated).then((res) => {
      if (res) {
        window.dispatchEvent(new CustomEvent('maxpecas_images_updated', { detail: updated }));
      }
    });
  }
  
  return updated;
}

// Add custom image
export function addCustomImage(
  category: SiteImage['category'], 
  name: string, 
  url: string, 
  description?: string
): SiteImage[] {
  const current = getSavedImages();
  const newId = `${category}-custom-${Date.now()}`;
  const newImg: SiteImage = {
    id: newId,
    category,
    name,
    url,
    description,
    isCustom: true
  };
  const updated = [...current, newImg];
  saveImages(updated);
  
  // Asynchronous background persistence to Supabase
  if (isSupabaseConfigured()) {
    saveMetadataToSupabase(updated).then((res) => {
      if (res) {
        window.dispatchEvent(new CustomEvent('maxpecas_images_updated', { detail: updated }));
      }
    });
  }
  
  return updated;
}

// Remove custom image
export function removeCustomImage(id: string): SiteImage[] {
  const current = getSavedImages();
  const updated = current.filter(img => img.id !== id);
  saveImages(updated);
  
  // Asynchronous background persistence to Supabase
  if (isSupabaseConfigured()) {
    saveMetadataToSupabase(updated).then((res) => {
      if (res) {
        window.dispatchEvent(new CustomEvent('maxpecas_images_updated', { detail: updated }));
      }
    });
  }
  
  return updated;
}

// Get specific image URL (fallback to default if not found)
export function getImageUrl(id: string, fallbackUrl?: string): string {
  const images = getSavedImages();
  const match = images.find(img => img.id === id);
  return match?.url || fallbackUrl || 'https://images.unsplash.com/photo-1504215680048-db15fc060c3a?auto=format&fit=crop&q=80&w=400';
}
