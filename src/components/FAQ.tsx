import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { FAQS } from '../data/categories';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('f1'); // Default first open for usability

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsAppUrl = 'https://wa.me/558000003728?text=Olá,%20tenho%20uma%20dúvida%20sobre%20as%20peças.';

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-stone-150 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center pb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
            <HelpCircle className="h-4 w-4 text-white" /> SOLUCIONANDO SUAS DÚVIDAS
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter">
            Perguntas <span className="text-red-600">Frequentes</span>
          </h2>
          <div className="h-1 w-20 bg-red-650 mx-auto" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Tem alguma dúvida sobre faturamento, procedência ou transporte de autopeças seminovas? Respondemos de forma objetiva.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4 max-w-3xl mx-auto" id="faq-accordions-group">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="border border-stone-200 rounded-sm overflow-hidden shadow-xs hover:border-red-600 transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  id={`btn-faq-trigger-${faq.id}`}
                  className="w-full flex items-center justify-between p-5 text-left bg-stone-50 hover:bg-stone-100/50 cursor-pointer transition-colors duration-200"
                >
                  <span className="font-display font-bold text-stone-900 text-sm md:text-base pr-4 uppercase italic">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-red-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-stone-400 flex-shrink-0" />
                  )}
                </button>

                {/* Collapsible Content wrapper */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`transition-all duration-200 overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-stone-150' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-stone-700 text-xs md:text-sm leading-relaxed font-sans bg-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic bottom contact trigger */}
        <div className="mt-14 text-center bg-stone-50 border border-stone-150 rounded-lg p-6 max-w-xl mx-auto space-y-3">
          <p className="text-sm text-stone-700 font-bold uppercase">
            Não encontrou a resposta específica que procurava?
          </p>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="faq-fallback-whatsapp-btn"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-sm shadow-md hover:shadow-emerald-950/10 cursor-pointer transition-colors uppercase italic tracking-wider"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Tirar Dúvida no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
