import React from 'react';
import { HelpCircle, MessageCircle, ClipboardCheck, Camera, FileCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Você Solicita',
      description: 'Acione nossa equipe no WhatsApp. Envie o nome da peça desejada e os dados básicos do seu carro (ano, modelo ou motorização).',
      icon: <MessageCircle className="h-6 w-6 text-white" />
    },
    {
      num: '02',
      title: 'Damos o Feedback',
      description: 'Nossa equipe técnica consulta o estoque físico real. Se tivermos, enviamos na hora fotos detalhadas e o código gravado original.',
      icon: <Camera className="h-6 w-6 text-white" />
    },
    {
      num: '03',
      title: 'Aprovando a Cotação',
      description: 'Combinamos a melhor logística de frete ou agendamos sua retirada em nossa sede em Ribeirão Preto - SP. Emitimos a sua respectiva Nota Fiscal.',
      icon: <ClipboardCheck className="h-6 w-6 text-white" />
    },
    {
      num: '04',
      title: 'Uso e Garantia',
      description: 'A peça vai selada e com o respectivo termo impresso de garantia operacional de 3 meses. Instale com tranquilidade e nota fiscal em mãos.',
      icon: <FileCheck className="h-6 w-6 text-white" />
    }
  ];

  const whatsAppUrl = 'https://wa.me/558000003728?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento.';

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-[#1A1C1E] text-white relative overflow-hidden">
      
      {/* Decorative mechanical gear element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-650/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-red-600/10 text-red-500 border border-red-500/20 px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-widest italic1">
            <HelpCircle className="h-3.5 w-3.5" /> AGILIDADE CONSCIENTE
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase italic tracking-tighter text-white">
            Atendimento Sem <span className="text-red-500">Complicações</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto" />
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            Consulte, valide e retire de forma rápida. Zero burocracia, 100% segurança e conformidade fiscal.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" id="how-it-works-steps-grid">
          {steps.map((s, index) => (
            <div
              key={s.num}
              id={`step-card-${s.num}`}
              className="relative p-6 bg-stone-950 border border-stone-850 rounded-lg space-y-4 group hover:border-red-600 transition-all duration-300"
            >
              {/* Arrow divider for wider desktops */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-10 -right-4 translate-x-1/2 z-20 text-stone-700">
                  <ArrowRight className="h-6 w-6 text-red-600" />
                </div>
              )}

              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded bg-red-600 flex items-center justify-center shadow-md">
                  {s.icon}
                </div>
                <span className="font-display font-black text-3xl md:text-4xl text-stone-800 font-mono tracking-tighter">
                  {s.num}
                </span>
              </div>

              <div className="space-y-2 text-left">
                <h3 className="font-display font-bold text-white text-lg tracking-tight uppercase italic text-red-500">
                  {s.title}
                </h3>
                <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centralised call to action */}
        <div className="mt-16 text-center">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="how-it-works-cta-btn"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-3.5 rounded-sm shadow-lg hover:shadow-red-900/10 cursor-pointer duration-200 uppercase italic tracking-wider border-b-2 border-white/20"
          >
            <MessageCircle className="h-5 w-5" />
            Entrar em Contato e Solicitar Peça
          </a>
          <p className="text-stone-500 text-xs mt-3">
            Atendimento humanizado disponível das 08h às 18h de Segunda a Sexta, e das 08h às 12h aos Sábados.
          </p>
        </div>

      </div>
    </section>
  );
}
