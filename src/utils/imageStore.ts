import { CATEGORIES } from '../data/categories';

// Types for the configurable site images
export interface SiteImage {
  id: string;
  category: 'banner' | 'category' | 'multimarca' | 'institutional' | 'background' | 'diferencial';
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

// We extract all default category images
const defaultImages: SiteImage[] = [
  // 1. Banner
  {
    id: 'hero-banner-bg',
    category: 'banner',
    name: 'Fundo do Banner Principal',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    description: 'Imagem de fundo estilizada exibida na seção principal do site'
  },
  // 2. Institutional
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
  // 3. Category Images
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
  }))
];

// Helper to query current state of images
export function getSavedImages(): SiteImage[] {
  if (typeof window === 'undefined') return defaultImages;
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultImages));
    return defaultImages;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    return defaultImages;
  }
}

export function saveImages(images: SiteImage[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(images));
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
  return updated;
}

// Add custom image
export function addCustomImage(category: SiteImage['category'], name: string, url: string, description?: string): SiteImage[] {
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
  return updated;
}

// Remove custom image
export function removeCustomImage(id: string): SiteImage[] {
  const current = getSavedImages();
  const updated = current.filter(img => img.id !== id);
  saveImages(updated);
  return updated;
}

// Get specific image URL (fallback to default if not found)
export function getImageUrl(id: string, fallbackUrl?: string): string {
  const images = getSavedImages();
  const match = images.find(img => img.id === id);
  return match?.url || fallbackUrl || 'https://images.unsplash.com/photo-1504215680048-db15fc060c3a?auto=format&fit=crop&q=80&w=400';
}
