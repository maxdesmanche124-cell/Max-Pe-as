import React, { useState } from 'react';
import { Calendar, MapPin, Users, Package, FileText, ChevronRight, X, ZoomIn, Building2 } from 'lucide-react';
import { getImageUrl } from '../utils/imageStore';

export default function About() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const highlights = [
    {
      icon: <Calendar className="h-6 w-6 text-red-600" />,
      title: 'Empresa Estabelecida em Ribeirão Preto',
      desc: 'Atuando desde 2019 no mercado de reposição de autopeças na região de Ribeirão Preto - SP.'
    },
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      title: 'Atendimento ao Público',
      desc: 'Portas abertas para receber proprietários, frotistas e profissionais da mecânica com atendimento consultivo.'
    },
    {
      icon: <Package className="h-6 w-6 text-red-600" />,
      title: 'Estoque Próprio',
      desc: 'Amplo estoque físico catalogado, higienizado e armazenado em galpão coberto e de fácil acesso.'
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: 'Consulta de Disponibilidade',
      desc: 'Nossa equipe realiza a consulta rápida no sistema para confirmar se a peça que você procura está disponível.'
    },
    {
      icon: <FileText className="h-6 w-6 text-red-600" />,
      title: 'Atendimento Especializado',
      desc: 'Equipe com conhecimento técnico para auxiliar na identificação exata e aplicação da peça correta para o veículo.'
    }
  ];

  const gallery = [
    {
      id: 'empresa-fachada',
      defaultUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
      title: 'Fachada Física',
      category: 'fachada'
    },
    {
      id: 'empresa-estoque',
      defaultUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800',
      title: 'Estoque de Peças',
      category: 'estoque'
    },
    {
      id: 'empresa-balcao',
      defaultUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      title: 'Balcão de Atendimento',
      category: 'atendimento'
    },
    {
      id: 'empresa-interna',
      defaultUrl: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800',
      title: 'Área Interna Operacional',
      category: 'área interna'
    }
  ];

  const getWhatsAppUrl = () => {
    const text = 'Olá, gostaria de fazer um orçamento com a MAX PEÇAS.';
    const encoded = encodeURIComponent(text);
    return `https://wa.me/558000003728?text=${encoded}`;
  };

  return (
    <section id="sobre" className="py-20 md:py-28 bg-white border-b border-stone-150 relative z-10" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-red-650 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
            <Building2 className="h-3.5 w-3.5" /> CONHEÇA A MAX PEÇAS
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter" id="about-panel-title">
            Nossa Empresa
          </h2>
          <div className="h-1 w-20 bg-red-650 mx-auto" />
          <p className="text-stone-600 text-base md:text-lg">
            Sólida estrutura física e atendimento transparente para garantir a melhor experiência em reposição de autopeças.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - 5 Pillars */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-stone-900 tracking-tight uppercase italic">
                Sua compra de peças usadas de forma segura e direta
              </h3>
              <p className="text-stone-650 text-sm md:text-base leading-relaxed">
                A <strong>MAX PEÇAS</strong> atua na comercialização de peças automotivas originais usadas e seminovas com foco na sustentabilidade comercial, fornecendo atendimento consultivo de alta precisão.
              </p>
            </div>

            {/* List of 5 Highlights */}
            <div className="space-y-6" id="about-company-pillars">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
                  <div className="flex-shrink-0 p-3 bg-red-50 rounded-md border border-red-100 h-fit">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-stone-950 uppercase italic text-sm md:text-base tracking-wide flex items-center gap-1">
                      {item.title}
                    </h4>
                    <p className="text-stone-600 text-xs md:text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Gallery with real photo cards */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-extrabold text-stone-900 uppercase italic tracking-tight mb-2">
                Galeria da Empresa (Fotos Reais)
              </h3>
              <p className="text-stone-600 text-xs md:text-sm">
                Confira imagens de nossas instalações em Ribeirão Preto - SP. Clique na foto para ampliar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4" id="company-photos-gallery">
              {gallery.map((photo) => {
                const url = getImageUrl(photo.id, photo.defaultUrl);
                return (
                  <div 
                    key={photo.id}
                    id={`gallery-card-${photo.id}`}
                    onClick={() => setActivePhoto(url)}
                    className="group relative aspect-video sm:aspect-square bg-stone-100 border border-stone-200 rounded-lg overflow-hidden cursor-pointer shadow-xs hover:shadow-md hover:border-red-600 transition-all duration-300"
                  >
                    <img 
                      src={url} 
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-3 sm:p-4 text-left">
                      <span className="text-[9px] bg-red-650 text-white font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-xs w-fit mb-1">
                        {photo.category}
                      </span>
                      <h4 className="text-white font-display font-bold text-xs sm:text-sm uppercase italic tracking-tight leading-tight flex items-center gap-1.5">
                        {photo.title}
                        <ZoomIn className="h-3 w-3 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-stone-500 text-[10px] font-mono font-bold uppercase">Atendimento Local e Remoto</p>
                <h4 className="font-display font-extrabold text-stone-950 text-sm md:text-base uppercase italic">Venha nos visitar ou faça uma consulta</h4>
              </div>
              <a 
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-red-650 hover:bg-red-700 text-white font-bold text-xs py-3 px-5 rounded-xs uppercase tracking-wide italic transition-colors"
              >
                Iniciar Consulta no WhatsApp <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
          id="lightbox-backdrop"
        >
          <button 
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-2 bg-stone-900 border border-stone-800 rounded-full text-stone-300 hover:text-white hover:bg-stone-850 cursor-pointer transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={activePhoto} 
            alt="Max Peças Zoom"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
