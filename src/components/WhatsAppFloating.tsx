import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function WhatsAppFloating() {
  const [showChip, setShowChip] = useState(false);
  const whatsAppUrl = 'https://wa.me/558000003728?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento.';

  useEffect(() => {
    // Show a helpful conversion chip 3 seconds after load to engage the user
    const timer = setTimeout(() => {
      setShowChip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 pointer-events-auto" id="whatsapp-floating-widget">
      {/* Help dialog indicator balloon */}
      {showChip && (
        <div className="relative bg-[#1A1C1E] text-white p-3.5 rounded-sm shadow-2xl border-2 border-red-650 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 max-w-[280px]">
          <button
            onClick={() => setShowChip(false)}
            id="floating-wa-chip-close"
            className="absolute -top-1.5 -right-1.5 bg-stone-850 text-stone-400 hover:text-white rounded-full p-0.5 border border-stone-750 transition-colors cursor-pointer"
            title="Fechar chat box"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          
          <div className="text-left flex gap-2.5 items-start">
            <div className="text-emerald-500 mt-0.5 shrink-0">
              <WhatsAppIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-xs text-red-500 uppercase italic tracking-wider">MAX PEÇAS de Plantão</p>
              <p className="text-[11px] text-stone-300">Olá! Qual peça você precisa para o seu veículo hoje?</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Pulsing Circular button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-pulsing-wa-btn"
        className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl animate-pulse-green transform hover:scale-105 transition-all outline-none border-0 cursor-pointer"
        aria-label="Atendimento Urgente via WhatsApp"
        title="Fazer Orçamento Grátis"
      >
        {/* Customized high fidelity icon widget */}
        <WhatsAppIcon className="h-7 w-7 text-white animate-pulse" />
      </a>
    </div>
  );
}
