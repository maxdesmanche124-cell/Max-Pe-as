import React from 'react';
import { MapPin, Clock, Phone, Mail, Building2, ExternalLink } from 'lucide-react';

export default function Location() {
  const addressQuery = "Av. Thomaz Alberto Whately, 1435, Parque Industrial Coronel Quito Junqueira, Ribeirão Preto - SP, CEP 14075-390";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressQuery)}`;

  return (
    <section id="localizacao" className="py-20 md:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Grid layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Text / Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider italic">
                <MapPin className="h-4 w-4" /> VENHA NOS VISITAR
              </div>
              
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-stone-950 italic uppercase tracking-tighter text-left leading-none">
                Nossa Sede em <span className="text-red-650">Ribeirão Preto</span>
              </h2>
              
              <p className="text-stone-600 text-sm md:text-base leading-relaxed text-left">
                Estamos localizados estrategicamente na cidade de Ribeirão Preto - SP. Amplo galpão próprio com fácil acesso e estacionamento facilitado para carregamento de peças.
              </p>

              {/* Informative Address Group card list */}
              <div className="space-y-4" id="location-details-stack">
                
                <div className="flex gap-4 p-4 bg-white border border-stone-200 rounded-sm shadow-xs">
                  <MapPin className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left text-sm md:text-base">
                    <p className="font-bold text-stone-900 uppercase italic">Endereço Oficial:</p>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      Av. Thomaz Alberto Whately, 1435<br />
                      Parque Industrial Coronel Quito Junqueira, Ribeirão Preto - SP<br />
                      CEP 14075-390
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white border border-stone-200 rounded-sm shadow-xs">
                  <Clock className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left text-sm md:text-base">
                    <p className="font-bold text-stone-900 uppercase italic">Horários de Atendimento:</p>
                    <ul className="text-stone-600 text-sm space-y-1">
                      <li><strong>Segunda a Sexta:</strong> 08:00h às 18:00h</li>
                      <li><strong>Sábados:</strong> 08:00h às 12:00h</li>
                      <li><strong>Domingos e Feriados:</strong> Fechado</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white border border-stone-200 rounded-sm shadow-xs">
                  <Building2 className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left text-sm md:text-base">
                    <p className="font-bold text-stone-900 uppercase italic">Identidade Jurídica:</p>
                    <p className="text-stone-600 text-xs md:text-sm">
                      MAX DOIMO PINHEIRO AUTO PECAS<br />
                      CNPJ: 33.403.195/0001-70<br />
                      Empresa localizada em Ribeirão Preto/SP.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Google Directions trigger action */}
            <div className="pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                id="maps-directions-trigger-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1C1E] hover:bg-[#2A2C2F] text-white font-bold text-sm px-6 py-3.5 rounded-sm transition-all cursor-pointer uppercase italic border-b-2 border-red-600"
              >
                Como Chegar pelo GPS (Waze / Google Mapas)
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>

          {/* Right Map Embed Visual Frame */}
          <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px] relative rounded-lg overflow-hidden border border-stone-250 shadow-lg">
            <iframe
              id="location-google-maps-iframe"
              title="Localização Física MAX DOIMO PINHEIRO AUTO PECAS"
              src={mapUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
