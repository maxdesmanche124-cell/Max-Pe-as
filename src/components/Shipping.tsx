import React from 'react';
import { Truck, ShieldCheck, FileText, Headphones, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { getImageUrl } from '../utils/imageStore';

export default function Shipping() {
  const handleWhatsAppShipping = () => {
    window.open('https://wa.me/5531988254981?text=Olá,%20gostaria%20de%20cotar%20o%20envio%20de%20uma%20peça.', '_blank');
  };

  const shippingInfo = [
    {
      title: 'Emissão de Nota Fiscal',
      description: 'Todas as peças de nosso estoque são despachadas obrigatoriamente com a respectiva Nota Fiscal Eletrônica (NF-e).',
      icon: <FileText className="h-5 w-5 text-red-650" />
    },
    {
      title: 'Transporte Seguro',
      description: 'Utilizamos engradados protetores e embalagens de alta cubagem com seguro total contra roubo ou sinistro na rota.',
      icon: <ShieldCheck className="h-5 w-5 text-red-650" />
    },
    {
      title: 'Suporte Ativo de Despacho',
      description: 'Nossa equipe de pós-venda fornece códigos de rastreamento e faz o monitoramento diário da carga até a sua oficina.',
      icon: <Headphones className="h-5 w-5 text-red-650" />
    }
  ];

  return (
    <section id="envios" className="py-20 md:py-28 bg-[#1A1C1E] text-white border-b border-stone-850 relative overflow-hidden">
      {/* Visual background highlight to match the modern Red & Dark theme */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Big Strategic Narrative with Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-red-650 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
              <Truck className="h-3.5 w-3.5" /> ENVIAMOS PARA TODO O BRASIL
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase italic tracking-tighter text-white">
              Logística Ágil & <span className="text-red-500">Entrega Garantida</span>
            </h2>
            
            <div className="h-1 w-20 bg-red-600" />
            
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Atendemos de forma expressa Belo Horizonte, toda a região metropolitana (Contagem, Betim, Nova Lima, etc.) e distribuímos autopeças qualificadas para qualquer cidade do território nacional através de transportadoras rodoviárias e aéreas credenciadas.
            </p>

            {/* Strategic Image */}
            <div className="relative h-60 md:h-72 w-full rounded-lg overflow-hidden border border-stone-800 shadow-xl group">
              <img
                src={getImageUrl('inst-shipping-main', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600')}
                alt="Logística de Distribuição e Transporte MAXPEÇAS"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <p className="absolute bottom-3 left-3 text-[10px] font-mono text-stone-400 bg-stone-950/70 py-1 px-2.5 rounded-sm uppercase tracking-wider">
                Despacho prioritário para motorizações e lataria pesada
              </p>
            </div>
          </div>

          {/* Right Column - Highlight Cards Stack & CTA */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xl md:text-2xl font-display font-bold uppercase italic text-stone-100 border-l-4 border-red-600 pl-3">
              Compromisso com o Prazo e Integridade Física
            </h3>

            <div className="space-y-4">
              {shippingInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-5 bg-stone-950 border border-stone-850 rounded-lg group hover:border-red-600 transition-all duration-300 text-left"
                >
                  <div className="p-3 bg-red-600/10 rounded border border-red-500/20 text-red-500 h-fit">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white text-base md:text-lg uppercase italic group-hover:text-red-500 transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleWhatsAppShipping}
                id="shipping-whatsapp-cta-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-4 rounded-sm shadow-lg hover:shadow-emerald-900/15 transition-all cursor-pointer uppercase italic tracking-wider border-b-2 border-white/20"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Simular Frete no WhatsApp
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-stone-500 text-[11px] mt-2 text-left">
                *Cotações de frete geradas com tarifas especiais de faturamento compartilhado.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
