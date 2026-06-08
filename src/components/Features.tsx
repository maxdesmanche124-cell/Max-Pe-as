import React from 'react';
import { 
  ShieldCheck, FileText, UserCheck, Calendar, Layers, Search, ShieldAlert, BadgeCheck, Check
} from 'lucide-react';
import { DIFFERENTIALS } from '../data/categories';

export default function Features() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'SearchCode': return <Search className="h-6 w-6 text-red-600" />;
      case 'FileText': return <FileText className="h-6 w-6 text-red-600" />;
      case 'ShieldCheck': return <ShieldCheck className="h-6 w-6 text-red-600" />;
      case 'UserCheck': return <UserCheck className="h-6 w-6 text-red-600" />;
      case 'Calendar': return <Calendar className="h-6 w-6 text-red-600" />;
      case 'Layers': return <Layers className="h-6 w-6 text-red-600" />;
      default: return <BadgeCheck className="h-6 w-6 text-red-600" />;
    }
  };

  return (
    <section id="diferenciais" className="py-20 md:py-28 bg-white border-b border-stone-150 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-zinc-900 text-stone-200 px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-widest border border-stone-800 italic">
            <ShieldAlert className="h-3.5 w-3.5 text-red-500 animate-pulse" /> COMPROMISSO E TRANSPARÊNCIA
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter">
            Por que escolher a <span className="text-red-600">MAX PEÇAS</span>?
          </h2>
          <div className="h-1 w-20 bg-red-650 mx-auto" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Unimos a segurança jurídica e financeira de uma empresa sólida ao portfólio completo de peças originais para seu carro.
          </p>
        </div>

        {/* Six Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="differentials-cards-grid">
          {DIFFERENTIALS.map((diff) => (
            <div
              key={diff.id}
              id={`diff-card-${diff.id}`}
              className="group p-8 rounded-lg bg-stone-50 border border-stone-150 shadow-xs hover:shadow-lg hover:border-red-600 transition-all duration-300 relative overflow-hidden"
            >
              {/* Card top flare link */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-red-600 group-hover:w-full transition-all duration-350 rounded-t-lg" />

              <div className="space-y-4">
                <div className="p-3 w-fit rounded bg-white border border-stone-150 shadow-xs group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                  {getIcon(diff.iconName)}
                </div>

                <h3 className="font-display font-bold text-stone-950 text-xl tracking-tight group-hover:text-red-600 transition-colors uppercase italic">
                  {diff.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small Bottom Assurance Banner to pass Google Merchant Ads checklist */}
        <div className="mt-16 bg-stone-50 border border-stone-150 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-600 font-bold">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-stone-950 text-base uppercase italic">Sem futilidades ou pegadinhas comerciais</p>
              <p className="text-stone-500 text-xs">Atendimento focado em encontrar a peça exata para o seu carro</p>
            </div>
          </div>
          <a
            href="https://wa.me/558000003728?text=Olá,%20gostaria%20de%20consultar%20uma%20peça."
            target="_blank"
            rel="noopener noreferrer"
            id="diff-bottom-wa-btn"
            className="flex items-center gap-2 bg-stone-900 hover:bg-[#1A1C1E] text-white font-bold text-sm px-6 py-3.5 rounded-sm transition-all cursor-pointer uppercase italic tracking-wider border-b-2 border-red-650"
          >
            Fale Conosco Agora
          </a>
        </div>

      </div>
    </section>
  );
}
