import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface HeaderProps {
  onOpenDoc: (doc: 'privacidade' | 'termos' | 'garantia' | 'troca') => void;
}

export default function Header({ onOpenDoc }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Categorias', href: '#categorias' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'Avaliações', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Localização', href: '#localizacao' }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5531988254981?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento.', '_blank');
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A1C1E]/95 backdrop-blur-md shadow-lg py-3 border-b-2 border-red-600'
          : 'bg-[#1A1C1E]/80 backdrop-blur-xs py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand - Sleek Skewed Design */}
          <a href="#" className="flex items-center gap-3 group" id="brand-logo-link">
            <div className="bg-red-600 px-3.5 py-1.5 font-display font-black text-xl text-white italic skew-x-[-10deg] tracking-tight group-hover:scale-102 transition-transform duration-250">
              MAXPEÇAS
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-mono font-bold text-stone-300 tracking-[0.15em] uppercase">
                AUTO PEÇAS MAX LTDA
              </span>
              <span className="text-[8px] font-mono text-red-500 tracking-widest uppercase">
                CNPJ 00.452.917/0001-27
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-navbar">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Area CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="hidden xl:flex items-center gap-1 text-xs text-stone-400">
              <ShieldAlert className="h-4 w-4 text-emerald-500" />
              Procedência Verificada
            </span>
            <button
              onClick={handleWhatsAppClick}
              id="header-cta-whatsapp-btn"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Orçamento WhatsApp
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleWhatsAppClick}
              id="header-mobile-quick-wa-btn"
              className="sm:hidden p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all cursor-pointer flex items-center justify-center"
              title="Orçamento WhatsApp Rápido"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="header-mobile-toggle-btn"
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden bg-stone-950 border-t border-stone-800 animate-in slide-in-from-top duration-300 shadow-xl"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-stone-300 hover:text-white hover:bg-stone-900 px-3 py-2.5 rounded-md transition-all border-b border-stone-900 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleWhatsAppClick();
                }}
                id="header-mobile-cta"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp (Grátis)
              </button>
              <div className="flex justify-around text-xs text-stone-400 pt-2 border-t border-stone-900">
                <button 
                  onClick={() => { setIsOpen(false); onOpenDoc('garantia'); }}
                  className="hover:text-white cursor-pointer active:text-red-500"
                >
                  Garantia
                </button>
                <button 
                  onClick={() => { setIsOpen(false); onOpenDoc('troca'); }}
                  className="hover:text-white cursor-pointer active:text-red-500"
                >
                  Trocas
                </button>
                <button 
                  onClick={() => { setIsOpen(false); onOpenDoc('privacidade'); }}
                  className="hover:text-white cursor-pointer active:text-red-500"
                >
                  Privacidade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
