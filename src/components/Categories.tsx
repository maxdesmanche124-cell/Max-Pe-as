import React, { useState } from 'react';
import { 
  Fuel, Cpu, Settings, Square, FolderOpen, Maximize, 
  Armchair, Disc, Sun, Lightbulb, Activity, Zap, Search, 
  Star, ArrowRight, HelpCircle
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { CATEGORIES } from '../data/categories';
import { PartCategory } from '../types';
import { getImageUrl } from '../utils/imageStore';

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fuel': return <Fuel className="h-5 w-5 text-red-600" />;
      case 'Cpu': return <Cpu className="h-5 w-5 text-red-600" />;
      case 'Settings': return <Settings className="h-5 w-5 text-red-600" />;
      case 'Square': return <Square className="h-5 w-5 text-red-600" />;
      case 'FolderOpen': return <FolderOpen className="h-5 w-5 text-red-600" />;
      case 'Maximize': return <Maximize className="h-5 w-5 text-red-600" />;
      case 'Armchair': return <Armchair className="h-5 w-5 text-red-600" />;
      case 'Disc': return <Disc className="h-5 w-5 text-red-600" />;
      case 'Sun': return <Sun className="h-5 w-5 text-red-600" />;
      case 'Lightbulb': return <Lightbulb className="h-5 w-5 text-red-600" />;
      case 'Activity': return <Activity className="h-5 w-5 text-red-600" />;
      case 'Zap': return <Zap className="h-5 w-5 text-red-600" />;
      default: return <Settings className="h-5 w-5 text-red-600" />;
    }
  };

  const filteredCategories = CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuoteClick = (categoryName: string) => {
    const text = `Olá, gostaria de fazer um orçamento de ${categoryName.toLowerCase()} para meu veículo.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5531988254981?text=${encoded}`, '_blank');
  };

  return (
    <section id="categorias" className="py-20 md:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-xs text-xs font-mono font-bold uppercase tracking-widest h-fit italic">
              <Star className="h-3.5 w-3.5 fill-white text-white" /> NOSSO ESTOQUE PRÓPRIO
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter">
              Categorias em <span className="text-red-600">Destaque</span>
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              Explore nossa ampla linha de componentes mecânicos, acabamentos e acessórios originais seminovos da MAXPEÇAS.
            </p>
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:w-80 flex-shrink-0" id="search-container">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              name="search-category"
              id="search-category-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar categoria de peças..."
              className="w-full bg-white border-2 border-stone-200 text-stone-900 rounded-sm pl-10 pr-4 py-3 placeholder:text-stone-400 text-sm focus:border-red-600 focus:ring-0 outline-none transition-all"
            />
          </div>
        </div>

        {/* Dynamic Help Banner CTA above cards */}
        <div className="mb-12 p-6 bg-white border-l-4 border-red-600 rounded-r-md shadow-xs flex flex-col md:flex-row items-center justify-between gap-6" id="search-help-banner">
          <div className="space-y-1 text-left flex-1">
            <h4 className="font-display font-extrabold text-stone-950 text-base md:text-lg uppercase italic tracking-tight">
              Não encontrou a peça ou modelo do seu veículo?
            </h4>
            <p className="text-stone-650 text-xs md:text-sm leading-relaxed">
              Fale com nossa equipe no WhatsApp e consulte a disponibilidade.
            </p>
          </div>
          <button
            onClick={() => handleQuoteClick('específico')}
            id="cat-top-whats-cta"
            className="w-full md:w-auto flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white hover:text-white font-bold text-sm py-3.5 px-6 rounded-xs shadow-xs hover:shadow-md transition-all uppercase italic tracking-wider cursor-pointer"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            Consultar agora no WhatsApp
          </button>
        </div>

        {/* Categories Grid layout with subtle animations and scroll reveals */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="categories-grid">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                id={`cat-card-${category.id}`}
                className="group relative bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-red-600 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Category Image Overlay */}
                  <div className="relative h-44 w-full bg-stone-900 overflow-hidden">
                    <img
                      src={getImageUrl(`category-img-${category.id}`, category.imageUrl)}
                      alt={category.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    {/* Floating Code Badge */}
                    <span className="absolute top-3 right-3 bg-red-600 text-white font-mono text-[10px] px-2.5 py-1 rounded-xs uppercase tracking-wider italic">
                      REF: {category.categoryCode}
                    </span>
                  </div>

                  {/* Category Text Description */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-red-50 border border-red-100 flex-shrink-0">
                        {getIcon(category.iconName)}
                      </div>
                      <h3 className="font-display font-bold text-stone-950 text-lg leading-tight group-hover:text-red-600 transition-colors uppercase italic">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-stone-600 text-xs md:text-sm leading-relaxed min-h-[48px]">
                      {category.description}
                    </p>
                    <p className="text-stone-400 text-[11px] font-medium italic leading-tight">
                      Consulte disponibilidade para diversas marcas e modelos
                    </p>
                  </div>
                </div>

                {/* Card Button Area Footer */}
                <div className="p-5 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-1.5 pb-4" id={`cat-vehicles-${category.id}`}>
                    {category.popularVehicles?.map((v, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-stone-150 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-sm font-bold uppercase"
                      >
                        {v}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleQuoteClick(category.name)}
                    id={`btn-quote-category-${category.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-stone-950 hover:bg-emerald-600 text-white hover:text-white font-bold text-xs py-3 px-3 rounded-sm shadow-xs transition-all duration-300 cursor-pointer uppercase italic tracking-wider"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Consultar disponibilidade da peça
                    <ArrowRight className="h-3 w-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl space-y-4 max-w-xl mx-auto">
            <HelpCircle className="h-12 w-12 text-stone-300 mx-auto" />
            <h3 className="text-lg font-display font-bold text-stone-900">Nenhuma categoria encontrada</h3>
            <p className="text-stone-650 text-sm px-6">
              Não se preocupe! Mesmo que sua categoria não esteja descrita exatamente na busca, você pode falar diretamente com nossa equipe técnica que buscará em nosso sistema de estoque integrado de forma personalizada.
            </p>
            <button
              onClick={() => handleQuoteClick('outra peça')}
              id="search-empty-fallback-btn"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Perguntar por Peça Específica
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
