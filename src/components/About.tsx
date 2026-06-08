import React from 'react';
import { Calendar, Building2, MapPin, BadgeCheck, FileText, Sparkles } from 'lucide-react';
import { getImageUrl } from '../utils/imageStore';

export default function About() {
  const stats = [
    { label: 'Anos de Tradição', value: 'Desde 1995' },
    { label: 'Nota Fiscal em Vendas', value: 'Emissão de NF' },
    { label: 'Origem das Peças', value: 'Informada' },
    { label: 'Sede Própria', value: 'Belo Horizonte' }
  ];

  return (
    <section id="sobre" className="py-20 md:py-28 bg-white border-b border-stone-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-red-650 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
            <Calendar className="h-3.5 w-3.5" /> TRADIÇÃO E ATENDIMENTO QUALIFICADO
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter">
            AUTO PEÇAS MAX LTDA (MAX PEÇAS)
          </h2>
          <div className="h-1 w-20 bg-red-650 mx-auto" />
          <p className="text-stone-600 text-base md:text-lg">
            Estoque de peças seminovas de procedência informada para consulta em Belo Horizonte.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Big Narrative Card */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-stone-900 tracking-tight uppercase italic">
              Uma história de integridade automotiva construída passo a passo
            </h3>
            
            <p className="text-stone-700 leading-relaxed text-sm md:text-base">
              Fundada em <strong className="text-stone-900">1995</strong> no coração de Belo Horizonte, a <strong className="text-stone-900">AUTO PECAS MAX LTDA</strong> surgiu com a premissa de oferecer a mecânicos, oficinas e clientes finais uma alternativa segura, viável e qualificada de reposição automotiva.
            </p>

            <p className="text-stone-700 leading-relaxed text-sm md:text-base">
              Nosso estoque é composto de peças adquiridas em lotes de frotas comerciais desativadas e empresas parceiras. Todas as peças seminovas passam por uma cuidadosa inspeção visual, higienização e testes práticos de funcionamento antes de serem devidamente catalogadas e comercializadas.
            </p>

            {/* Strategic visual about section image loaded via our image manager */}
            <div className="relative aspect-square w-full rounded border border-stone-200 bg-stone-50 overflow-hidden flex items-center justify-center p-4">
              <img
                src={getImageUrl('inst-about-main', 'https://images.unsplash.com/photo-1504215680048-db15fc060c3a?auto=format&fit=crop&q=80&w=600')}
                alt="Equipe Técnica e Estoque de Peças MAX PEÇAS"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-stone-900/60 p-2 text-stone-200 text-[10px] uppercase font-mono text-center">
                Organização mecânica rigorosa desde a catalogação
              </div>
            </div>

            <blockquote className="border-l-4 border-red-600 bg-stone-50 p-4 rounded-r italic text-stone-600 text-sm">
              &quot;Nossa premissa não é simplesmente vender a autopeça mais barata, mas sim assegurar que a peça que entra no seu carro seja original, tenha procedência informada, nota fiscal correspondente e garantia operacional de 3 meses.&quot; 
              <span className="block mt-2 text-xs font-bold font-mono text-stone-900">— Direção MAX PEÇAS.</span>
            </blockquote>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 text-stone-700 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>Prado, Belo Horizonte - MG</span>
              </div>
              <div className="hidden sm:block text-stone-300">|</div>
              <div className="flex items-center gap-1.5">
                <Building2 className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span>CNPJ: 00.452.917/0001-27</span>
              </div>
            </div>
          </div>

          {/* Right Column - Beautiful Bento-grid like stats container */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-stone-50 border border-stone-150 p-6 rounded-lg space-y-3 relative overflow-hidden group hover:border-red-600 transition-all duration-300">
              <div className="h-10 w-10 bg-red-600 text-white flex items-center justify-center font-bold text-sm uppercase italic">
                1995
              </div>
              <h4 className="font-display font-bold text-stone-900 text-lg uppercase italic">Histórico Sólido</h4>
              <p className="text-stone-600 text-xs md:text-sm">
                Atuando ininterruptamente desde 1995 no polo automotivo do bairro Prado, em BH.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-150 p-6 rounded-lg space-y-3 relative overflow-hidden group hover:border-red-600 transition-all duration-300">
              <div className="h-10 w-10 bg-stone-950 text-white flex items-center justify-center">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <h4 className="font-display font-bold text-stone-900 text-lg uppercase italic">Nota Fiscal de Entrada</h4>
              <p className="text-stone-600 text-xs md:text-sm">
                Atendimento seguro e orientado para total conformidade de procedência e segurança tributária.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-150 p-6 rounded-lg space-y-3 relative overflow-hidden group hover:border-red-600 transition-all duration-300">
              <div className="h-10 w-10 bg-stone-950 text-white flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-red-500" />
              </div>
              <h4 className="font-display font-bold text-stone-900 text-lg uppercase italic">Procedência Informada</h4>
              <p className="text-stone-600 text-xs md:text-sm">
                Aquisições devidamente catalogadas com nota fiscal e origem de frotas comerciais desativadas.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-150 p-6 rounded-lg space-y-3 relative overflow-hidden group hover:border-red-600 transition-all duration-300">
              <div className="h-10 w-10 bg-stone-950 text-white flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-red-500" />
              </div>
              <h4 className="font-display font-bold text-stone-900 text-lg uppercase italic">Inovação e Estoque</h4>
              <p className="text-stone-600 text-xs md:text-sm">
                Galpão coberto e organizado para armazenar, catalogar e proteger todas as autopeças.
              </p>
            </div>

          </div>

        </div>

        {/* Dynamic bottom counters banner */}
        <div className="mt-16 bg-[#1A1C1E] text-white rounded-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg border-2 border-red-600">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <p className="font-display font-black text-2xl md:text-4xl text-red-500">
                {s.value}
              </p>
              <p className="text-stone-400 font-mono text-[10px] md:text-xs uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
