import React from 'react';
import { HelpCircle, MessageCircle, ClipboardCheck, Camera, FileCheck, ArrowRight, Truck, Search } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Consulta de disponibilidade',
      description: 'O cliente consulta a disponibilidade da peça automotiva usada por WhatsApp, telefone ou e-mail com nossos assessores.',
      icon: <MessageCircle className="h-6 w-6 text-white" />
    },
    {
      num: '02',
      title: 'Equipe confirma a peça',
      description: 'Nossa equipe técnica verifica fisicamente a peça solicitada em nossa sede operacional para assegurar estoque atual.',
      icon: <ClipboardCheck className="h-6 w-6 text-white" />
    },
    {
      num: '03',
      title: 'Fotos e informações',
      description: 'O cliente de forma transparente recebe fotos reais do item, códigos de peças originais e diagnóstico básico para checar compatibilidade.',
      icon: <Camera className="h-6 w-6 text-white" />
    },
    {
      num: '04',
      title: 'Pagamento e Nota Fiscal',
      description: 'Comercialização assistida humana com emissão obrigatória da respectiva Nota Fiscal conforme a legislação aplicável integrada ao cadastro.',
      icon: <FileCheck className="h-6 w-6 text-white" />
    },
    {
      num: '05',
      title: 'Retirada ou Envio',
      description: 'Retirada balcão segura agendada em nossa sede ou envio assegurado por transportadora parceira contratada conforme sua região.',
      icon: <Truck className="h-6 w-6 text-white" />
    },
    {
      num: '06',
      title: 'Rastreio do Pedido',
      description: 'Após a postagem ou despacho, o cliente recebe o código de rastreio ou acompanhamento logístico correspondente, quando aplicável.',
      icon: <Search className="h-6 w-6 text-white" />
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
          <div className="inline-flex items-center gap-1.5 bg-red-600/10 text-red-500 border border-red-500/20 px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-widest italic tracking-wide">
            <HelpCircle className="h-3.5 w-3.5" /> PROCESSO DE COMPRA
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase italic tracking-tighter text-white">
            Como Funciona a <span className="text-red-500">Compra de Peças</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto" />
          <p className="text-stone-300 text-sm md:text-base leading-relaxed">
            Consulte a disponibilidade de forma segura, valide as fotos reais do estoque físico e compre com emissão eletrônica de nota fiscal.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative" id="how-it-works-steps-grid">
          {steps.map((s, index) => (
            <div
              key={s.num}
              id={`step-card-${s.num}`}
              className="relative p-6 bg-stone-950 border border-stone-850 rounded-lg space-y-4 group hover:border-red-600 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded bg-red-600 flex items-center justify-center shadow-md">
                  {s.icon}
                </div>
                <span className="font-display font-black text-3xl md:text-4xl text-stone-800 font-mono tracking-tighter">
                  {s.num}
                </span>
              </div>

              <div className="space-y-2 text-left">
                <h3 className="font-display font-bold text-white text-md tracking-tight uppercase italic text-red-500">
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
