import React from 'react';
import { Star } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { getSavedImages } from '../utils/imageStore';

export default function Multimarcas() {
  // Query images dynamically so if administrators change the image in they persist instantly
  const savedImages = getSavedImages();
  
  // We can filter the imageStore images of category 'multimarca'
  // Or fall back to static list if none found
  const multimarcaImages = savedImages.filter(img => img.category === 'multimarca');

  const handleBrandConsult = (brandName: string) => {
    const text = `Olá! Gostaria de consultar a disponibilidade de peças para veículos da marca ${brandName}.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5531988254981?text=${encoded}`, '_blank');
  };

  return (
    <section id="multimarcas" className="py-20 md:py-28 bg-white border-b border-stone-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-red-650 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
            <Star className="h-3.5 w-3.5 fill-white text-white" /> VARIEDADE INDUSTRIAL
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter">
            Peças de <span className="text-red-500">Multimarcas</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Oferecemos uma linha abrangente de peças originais seminovas para as montadoras nacionais e importadas mais populares do Brasil.
          </p>
        </div>

        {/* Brand Mini Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" id="multimarcas-grid">
          {multimarcaImages.map((brand) => {
            // Extract core brand name by stripping "Marca - " from SiteImage.name
            const brandName = brand.name.replace('Marca - ', '');
            
            return (
              <div
                key={brand.id}
                id={`brand-card-${brand.id}`}
                className="group relative bg-stone-50 border border-stone-150 rounded-lg overflow-hidden flex flex-col justify-between hover:border-red-600 hover:shadow-lg transition-all duration-300"
              >
                {/* Brand Showcase Cover Image */}
                <div className="h-36 w-full bg-stone-50 border-b border-stone-200 relative overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={brand.url}
                    alt={`Modelos ${brandName}`}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Micro Actions Area */}
                <div className="p-4 bg-white">
                  <button
                    onClick={() => handleBrandConsult(brandName)}
                    id={`btn-consult-brand-${brand.id}`}
                    className="w-full flex items-center justify-center gap-1.5 bg-stone-950 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-3 rounded-sm tracking-wider uppercase italic transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    Consultar Peça
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro Guarantee Note */}
        <p className="text-center text-stone-500 text-xs mt-8">
          Temos também peças para carros de frotas executivas e utilitários. Consulte-nos sobre outras montadoras.
        </p>

      </div>
    </section>
  );
}
