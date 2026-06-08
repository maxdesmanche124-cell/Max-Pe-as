import React from 'react';
import { ShieldCheck, FileText, BadgeCheck, Scale, Search, Layers } from 'lucide-react';
import { getImageUrl } from '../utils/imageStore';
import heroBg from '../assets/images/maxpecas_hero_bg_1780923020621.png';
import WhatsAppIcon from './WhatsAppIcon';

export default function Hero() {
  const whatsAppUrl = 'https://wa.me/558000003728?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento%20de%20peças.';

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center bg-[#1A1C1E] pt-20 overflow-hidden"
    >
      {/* Background Image / Gradient Graphic */}
      <div className="absolute inset-0 z-0 opacity-40 animate-fade-in">
        <img
          src={getImageUrl('hero-banner-bg', heroBg)}
          alt="Premium Automotive Parts Background"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1E] via-[#1A1C1E]/90 to-[#1A1C1E]/40" />
      </div>

      {/* Modern Red Radial Highlight to match the "Vermelho moderno" theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-650/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Main Content Card Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center lg:text-left">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            {/* Trust Badging */}
            <div className="inline-flex items-center gap-2" id="trust-pill-tag">
              <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-tighter italic">
                Desde 1995 em Belo Horizonte
              </span>
              <span className="text-xs font-mono font-bold text-stone-400 tracking-wider uppercase hidden sm:inline-block">
                • Procedência Informada
              </span>
            </div>

            {/* Main Catchy Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white italic uppercase tracking-tighter leading-[0.95]" id="hero-main-title">
              Peças automotivas usadas e seminovas com atendimento especializado
            </h1>

            {/* Realistic Bullet Substantiation without false promises */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Consulte motores, câmbios, módulos, latarias, faróis, lanternas, rodas, suspensão e outras autopeças conforme disponibilidade em estoque. Atendimento para orçamento e consulta de compatibilidade.
            </p>

            {/* Horizontal trust parameters badge-group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-stone-900/50 backdrop-blur-xs border border-stone-850 p-3 rounded-xl">
                <FileText className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-stone-400 font-mono">SEGURANÇA</p>
                  <p className="text-sm font-semibold text-white">Emissão de Nota Fiscal</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-stone-900/50 backdrop-blur-xs border border-stone-850 p-3 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-stone-400 font-mono">SUPORTE</p>
                  <p className="text-sm font-semibold text-white">Garantia Informada</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-stone-900/50 backdrop-blur-xs border border-stone-850 p-3 rounded-xl">
                <BadgeCheck className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-stone-400 font-mono">LOJA FÍSICA</p>
                  <p className="text-sm font-semibold text-white">Desde 1995 em BH</p>
                </div>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-whatsapp-pulse"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-emerald-950/20 hover:shadow-emerald-950/45 transform hover:-translate-y-1 transition-all animate-pulse-green cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5 animate-bounce" />
                Consultar Disponibilidade
              </a>
              <a
                href="#categorias"
                id="hero-cta-explore"
                className="w-full sm:w-auto flex items-center justify-center text-stone-300 hover:text-white font-semibold text-sm px-6 py-4 rounded-xl border border-stone-850 hover:bg-stone-900 transition-colors"
              >
                Ver Categorias de Peças
              </a>
            </div>

            {/* Google Ads Compliance Mini Tag */}
            <p className="text-[10px] sm:text-xs text-stone-500 flex items-center justify-center lg:justify-start gap-1">
              <Scale className="h-3 w-3 text-red-600" />
              Consulte disponibilidade de peças com nossa equipe de atendimento no WhatsApp.
            </p>

          </div>

          {/* Right Live-Visual Column */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto max-w-md">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-stone-800 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              
              {/* Dynamic Overlay Info Card inside frame */}
              <div className="relative bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">Atendimento WhatsApp</span>
                  </div>
                  <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-md font-mono">Retorno Rápido</span>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3 bg-stone-950/80 p-3 rounded-lg border border-stone-850 text-sm">
                    <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded h-fit">
                      <WhatsAppIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Você envia os dados do carro</p>
                      <p className="text-stone-400 text-xs">Ex: Porta dianteira HB20 ano 2021</p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-stone-950/80 p-3 rounded-lg border border-stone-850 text-sm">
                    <div className="bg-red-500/10 text-red-400 p-2 rounded h-fit">
                      <Search className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Nós consultamos nosso estoque</p>
                      <p className="text-stone-400 text-xs">Consulta técnica em segundos</p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-stone-950/80 p-3 rounded-lg border border-stone-850 text-sm">
                    <div className="bg-red-600/10 text-red-500 p-2 rounded h-fit">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Orçamento com Foto e Código</p>
                      <p className="text-stone-400 text-xs">Transparência total na negociação</p>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-950/80 p-4 rounded-xl text-center space-y-1.5 border border-stone-850">
                  <p className="text-xs text-stone-400">Canal Exclusivo para Orçamentos:</p>
                  <p className="text-lg font-mono font-bold text-white tracking-widest">
                    0800 000 3728
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
