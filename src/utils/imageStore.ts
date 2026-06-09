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

// Memory cache for category images from Supabase table
export let categoryImagesCache: Record<string, string> = {};

// Helper to query current state of images
export function getSavedImages(): SiteImage[] {
  let images: SiteImage[] = [];
  if (memoryCache.length > 0) {
    images = memoryCache;
  } else if (typeof window === 'undefined') {
    images = defaultImages;
  } else {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultImages));
      memoryCache = [...defaultImages];
      images = defaultImages;
    } else {
      try {
        const parsed = JSON.parse(raw);
        memoryCache = parsed;
        images = parsed;
      } catch (err) {
        memoryCache = [...defaultImages];
        images = defaultImages;
      }
    }
  }

  // Inject loaded category images from the table cache (Supabase DB)
  return images.map(img => {
    if (img.id.startsWith('category-img-')) {
      const catId = img.id.replace('category-img-', '');
      if (categoryImagesCache[catId]) {
        return { ...img, url: categoryImagesCache[catId] };
      }
    }
    return img;
  });
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

// Fetch category images from Supabase table 'category_images'
export async function fetchCategoryImagesFromSupabase(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured() || !supabase) return {};
  try {
    const { data, error } = await supabase
      .from('category_images')
      .select('id, url');
    
    if (error) {
      console.warn(
        `[Supabase Table Error] Erro ao carregar a tabela "category_images": ${error.message}\n` +
        `Por favor, execute o seguinte SQL no editor SQL do seu painel do Supabase:\n\n` +
        `CREATE TABLE category_images (\n` +
        `  id TEXT PRIMARY KEY,\n` +
        `  url TEXT NOT NULL,\n` +
        `  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL\n` +
        `);\n\n` +
        `E lembre-se de de-ativar o RLS ou criar uma política permissiva (Read & Write para anon) para esta tabela.`
      );
      return {};
    }
    
    const fetched: Record<string, string> = {};
    if (data) {
      data.forEach((row: any) => {
        fetched[row.id] = row.url;
      });
    }
    categoryImagesCache = fetched;
    
    // Also save simple values to local storage strictly as a secondary instant-load cache (NOT primary source)
    if (typeof window !== 'undefined') {
      Object.entries(fetched).forEach(([catId, url]) => {
        localStorage.setItem(`maxpecas_category_img_${catId}`, url);
      });
    }
    
    // Dispatch an event to notify components that category images have updated
    window.dispatchEvent(new CustomEvent('maxpecas_category_images_updated', { detail: fetched }));
    
    return fetched;
  } catch (err) {
    console.error('Failed to fetch category images from Supabase table:', err);
    return {};
  }
}

// Save category image URL to Supabase table 'category_images'
export async function saveCategoryImageToSupabase(id: string, url: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('category_images')
      .upsert({ id, url }, { onConflict: 'id' });
    
    if (error) {
      console.error(`Error saving category image for ${id} to Supabase table:`, error.message);
      return false;
    }
    
    // Update local variables
    categoryImagesCache[id] = url;
    if (typeof window !== 'undefined') {
      localStorage.setItem(`maxpecas_category_img_${id}`, url);
    }
    
    // Dispatch update event
    window.dispatchEvent(new CustomEvent('maxpecas_category_images_updated', { detail: categoryImagesCache }));
    return true;
  } catch (err) {
    console.error(`Failed to save category image for ${id} to Supabase table:`, err);
    return false;
  }
}

// Delete category image URL from Supabase table 'category_images'
export async function deleteCategoryImageFromSupabase(id: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  try {
    const { error } = await supabase
      .from('category_images')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting category image for ${id} from Supabase table:`, error.message);
      return false;
    }
    
    delete categoryImagesCache[id];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`maxpecas_category_img_${id}`);
    }
    
    // Dispatch update event
    window.dispatchEvent(new CustomEvent('maxpecas_category_images_updated', { detail: categoryImagesCache }));
    return true;
  } catch (err) {
    console.error(`Failed to delete category image for ${id} from Supabase table:`, err);
    return false;
  }
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
  
  // Intercept category image update and save directly to Supabase table 'category_images'
  if (id.startsWith('category-img-')) {
    const categoryId = id.replace('category-img-', '');
    categoryImagesCache[categoryId] = newUrl;
    if (typeof window !== 'undefined') {
      localStorage.setItem(`maxpecas_category_img_${categoryId}`, newUrl);
    }
    if (isSupabaseConfigured() && supabase) {
      saveCategoryImageToSupabase(categoryId, newUrl);
    }
  }
  
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

// Reset standard system image URL to its factory original
export function resetImageToDefault(id: string): SiteImage[] {
  const current = getSavedImages();
  const original = defaultImages.find(img => img.id === id);
  if (!original) return current;

  const updated = current.map(img => {
    if (img.id === id) {
      return { ...img, url: original.url };
    }
    return img;
  });
  saveImages(updated);

  // If a category image is reset, remove it from the Supabase table 'category_images'
  if (id.startsWith('category-img-')) {
    const categoryId = id.replace('category-img-', '');
    delete categoryImagesCache[categoryId];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`maxpecas_category_img_${categoryId}`);
    }
    if (isSupabaseConfigured() && supabase) {
      deleteCategoryImageFromSupabase(categoryId);
    }
  }

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
  // If it is a category image, check the in-memory/Supabase-table database cache first
  if (id.startsWith('category-img-')) {
    const categoryId = id.replace('category-img-', '');
    if (categoryImagesCache[categoryId]) {
      return categoryImagesCache[categoryId];
    }
    // Secondary fallback just to prevent blank if table is still loading
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(`maxpecas_category_img_${categoryId}`);
      if (cached) {
        categoryImagesCache[categoryId] = cached;
        return cached;
      }
    }
  }

  const images = getSavedImages();
  const match = images.find(img => img.id === id);
  return match?.url || fallbackUrl || 'https://images.unsplash.com/photo-1504215680048-db15fc060c3a?auto=format&fit=crop&q=80&w=400';
}
