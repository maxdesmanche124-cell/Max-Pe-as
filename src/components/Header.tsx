import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface HeaderProps {
  onOpenDoc: (doc: 'privacidade' | 'termos' | 'garantia' | 'troca') => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export default function Header({ onOpenDoc, onNavigate, currentPath = '/' }: HeaderProps) {
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
    { name: 'Sobre', href: '#sobre', isAnchor: true },
    { name: 'Categorias', href: '#categorias', isAnchor: true },
    { name: 'Como Funciona', href: '#como-funciona', isAnchor: true },
    { name: 'Rastrear Pedido', href: '/rastrear-pedido', isAnchor: false },
    { name: 'Contato', href: '/contato', isAnchor: false }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (!link.isAnchor) {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(link.href);
      }
    } else {
      if (onNavigate && currentPath !== '/') {
        e.preventDefault();
        onNavigate('/');
        setTimeout(() => {
          const id = link.href.replace('#', '');
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = link.href;
          }
        }, 150);
      }
    }
  };

  const whatsAppUrl = 'https://wa.me/558000003728?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento.';

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A1C1E]/95 backdrop-blur-md shadow-lg py-3 border-b-2 border-red-650'
          : 'bg-[#1A1C1E]/80 backdrop-blur-xs py-4 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand - Sleek Skewed Design */}
          <a
            href="/"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('/');
              }
            }}
            className="flex items-center gap-3 group"
            id="brand-logo-link"
          >
            <div className="bg-red-650 px-3.5 py-1.5 font-display font-black text-xl text-white italic skew-x-[-10deg] tracking-tight group-hover:scale-102 transition-transform duration-250">
              MAX PEÇAS
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-mono font-bold text-stone-300 tracking-[0.15em] uppercase">
                MAX DOIMO PINHEIRO AUTO PECAS
              </span>
              <span className="text-[8px] font-mono text-red-500 tracking-widest uppercase">
                CNPJ 33.403.195/0001-70
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-navbar">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  currentPath === link.href 
                    ? 'text-red-500 font-bold' 
                    : 'text-stone-300 hover:text-white'
                }`}
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
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-cta-whatsapp-btn"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Orçamento WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-mobile-quick-wa-btn"
              className="sm:hidden p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all cursor-pointer flex items-center justify-center"
              title="Orçamento WhatsApp Rápido"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
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
                onClick={(e) => {
                  setIsOpen(false);
                  handleLinkClick(e, link);
                }}
                className={`block text-base font-medium px-3 py-2.5 rounded-md transition-all border-b border-stone-900 last:border-0 ${
                  currentPath === link.href 
                    ? 'text-red-500 bg-stone-900 font-bold' 
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 px-3 flex flex-col gap-3">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                id="header-mobile-cta"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-center cursor-pointer text-base"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
              <div className="flex justify-around text-xs text-stone-400 pt-2 border-t border-stone-900">
                <a 
                  href="/politica-de-garantia"
                  onClick={(e) => {
                    setIsOpen(false);
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/politica-de-garantia');
                    }
                  }}
                  className="hover:text-white cursor-pointer active:text-red-500"
                >
                  Garantia / Trocas
                </a>
                <a 
                  href="/politica-de-privacidade"
                  onClick={(e) => {
                    setIsOpen(false);
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/politica-de-privacidade');
                    }
                  }}
                  className="hover:text-white cursor-pointer active:text-red-500"
                >
                  Privacidade
                </a>
                <a 
                  href="/termos-de-uso"
                  onClick={(e) => {
                    setIsOpen(false);
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/termos-de-uso');
                    }
                  }}
                  className="hover:text-white cursor-pointer active:text-red-500"
                >
                  Termos
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
