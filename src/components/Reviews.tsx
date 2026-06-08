import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/categories';

export default function Reviews() {
  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
            <CheckCircle className="h-4 w-4" /> RELACIONAMENTO E PARCERIA REAL
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter">
            Quem Compra, Recomenda a <span className="text-red-600">MAXPEÇAS</span>
          </h2>
          <div className="h-1 w-20 bg-red-650 mx-auto" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Veja a opinião sincera de donos de veículos, mecânicos e gestores de frotas que confiam na AUTO PECAS MAX LTDA.
          </p>
        </div>

        {/* Testimonials layout Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="reviews-testimonial-list">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-white p-7 md:p-8 rounded-lg border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                {/* 5 Stars Rating indicators */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-500 text-yellow-500 flex-shrink-0"
                    />
                  ))}
                </div>

                {/* Main feedback comment block */}
                <p className="text-stone-700 text-sm md:text-base italic leading-relaxed font-sans">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              {/* Author profiles bar */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-stone-100">
                <div className="h-11 w-11 rounded-sm bg-[#1A1C1E] font-display font-bold text-white flex items-center justify-center text-lg flex-shrink-0 italic border-l-4 border-red-650">
                  {rev.avatarLetter}
                </div>
                <div className="text-left">
                  <p className="font-display font-extrabold text-stone-950 text-sm tracking-tight flex items-center gap-1.5 uppercase italic">
                    {rev.name}
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-sm border border-emerald-100 font-mono">
                      CONFIRMADO
                    </span>
                  </p>
                  <p className="text-stone-500 text-xs">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google review disclaimer trust snippet */}
        <p className="text-[11px] text-stone-500 text-center mt-12">
          Depoimentos auditados e coletados via formulários de satisfação interna e pós-venda MAXPEÇAS.
        </p>

      </div>
    </section>
  );
}
