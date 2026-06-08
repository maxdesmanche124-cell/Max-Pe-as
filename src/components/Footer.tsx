import React from 'react';
import { Mail, Phone, MapPin, Scale, ChevronRight, FileText, ShieldAlert } from 'lucide-react';
import { ComplianceDocType } from '../types';

interface FooterProps {
  onOpenDoc: (doc: 'privacidade' | 'termos' | 'garantia' | 'troca') => void;
  onNavigate?: (path: string) => void;
}

export default function Footer({ onOpenDoc, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-stone-950 text-stone-400 pt-16 pb-8 border-t border-stone-900 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-900">
          
          {/* Column 1 - Brand Summary */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/');
                  }
                }}
                className="bg-red-600 px-3 py-1 font-display font-black text-xl text-white italic skew-x-[-10deg] tracking-tight hover:scale-102 transition-transform"
              >
                MAX PEÇAS
              </a>
            </div>
            
            <p className="text-xs md:text-sm leading-relaxed text-stone-400">
              Desde 1995 atuando com ética e respeito às regras de trânsito e meio ambiente. Credenciada nos órgãos de regulação para comercialização de peças com total procedência.
            </p>

            <div className="p-3 bg-stone-900/50 rounded-sm border border-stone-850 space-y-1 text-[11px] font-sans">
              <p className="text-stone-300 font-bold font-mono">AUTORIDADE INDUSTRIAL</p>
              <p className="text-stone-500">Origem Comprovada & Peças Verificadas</p>
            </div>
          </div>

          {/* Column 2 - Category Quicklinks */}
          <div className="space-y-4 text-left">
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest border-l-2 border-red-600 pl-2">
              Menu de Navegação
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Sobre Nós', href: '#sobre', path: '/' },
                { name: 'Categorias de Peças', href: '#categorias', path: '/' },
                { name: 'Nossos Diferenciais', href: '#diferenciais', path: '/' },
                { name: 'Processo de Atendimento', href: '#como-funciona', path: '/' },
                { name: 'Avaliações dos Clientes', href: '#depoimentos', path: '/' },
                { name: 'Dúvidas Frequentes (FAQ)', href: '#faq', path: '/' },
                { name: 'Localização Física', href: '#localizacao', path: '/' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (onNavigate && window.location.pathname !== link.path) {
                        e.preventDefault();
                        onNavigate(link.path);
                        setTimeout(() => {
                          window.location.hash = link.href;
                        }, 100);
                      }
                    }}
                    className="hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 text-red-500" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Corporate Compliance Pages (Google Ads Core requirement) */}
          <div className="space-y-4 text-left" id="footer-compliance-links">
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest border-l-2 border-red-600 pl-2">
              Políticas e Contratos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/politica-de-privacidade"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/politica-de-privacidade');
                    }
                  }}
                  className="hover:text-white flex items-center gap-1.5 cursor-pointer text-left transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-red-500" />
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="/termos-de-uso"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/termos-de-uso');
                    }
                  }}
                  className="hover:text-white flex items-center gap-1.5 cursor-pointer text-left transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-red-500" />
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="/trocas-garantia-procedencia"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('/trocas-garantia-procedencia');
                    }
                  }}
                  className="hover:text-white flex items-center gap-1.5 cursor-pointer text-left transition-colors"
                >
                  <FileText className="h-3.5 w-3.5 text-red-500" />
                  Trocas, Garantia e Procedência
                </a>
              </li>
            </ul>

            <div className="pt-2 text-stone-500 text-[10px] space-y-1">
              <p>• Prado, Belo Horizonte</p>
              <p>• Estoque Catalogado sem Promessas Falsas</p>
            </div>
          </div>

          {/* Column 4 - Direct Contacts */}
          <div className="space-y-4 text-left">
            <h3 className="text-white font-display font-bold text-sm uppercase tracking-widest border-l-2 border-red-600 pl-2">
              Canais de Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="https://wa.me/558000003728" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    <p className="text-stone-300 font-bold">0800 000 3728</p>
                  </a>
                  <p className="text-[11px] text-stone-500">Orçamentos WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-stone-300 break-all font-semibold text-xs leading-none">
                    contato.maxpecas@gmail.com
                  </p>
                  <p className="text-[11px] text-stone-500">Dúvidas administrativas</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-stone-400">
                  Rua João Lúcio Brandão, 191, Prado, Belo Horizonte - MG, CEP 30411-046
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Corporate footer details block */}
        <div className="mt-8 text-center space-y-4 text-[11px] text-stone-500" id="footer-coorporate-details">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-900/50 pb-6">
            <div className="text-left space-y-1">
              <p className="font-semibold text-stone-300 text-xs text-center md:text-left">
                AUTO PECAS MAX LTDA | CNPJ: 00.452.917/0001-27
              </p>
              <p className="text-center md:text-left leading-relaxed">
                Empresa credenciada em conformidade com a Lei do Desmonte (Lei Federal nº 12.977/2014) e cadastrada nos órgãos ambientais federais e estaduais para a prática de desmonte ecologicamente rastreado.
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 text-stone-300 text-xs bg-stone-900 px-3.5 py-1.5 rounded-lg border border-stone-800">
              <Scale className="h-4 w-4 text-red-500" />
              <span>Código de Defesa do Consumidor Respeitado</span>
            </div>
          </div>

          <p className="text-center">
            &copy; {currentYear} MAX PEÇAS - AUTO PECAS MAX LTDA. Todos os direitos reservados. É proibida a reprodução total ou parcial das mídias digitais sem autorização prévia por escrito.
          </p>

        </div>

      </div>
    </footer>
  );
}
