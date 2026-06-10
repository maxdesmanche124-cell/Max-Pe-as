import React, { useEffect, useState } from 'react';
import { ArrowLeft, Shield, FileText, BadgeAlert, Phone, Mail, MapPin, Truck, Search, Send, Clock, Building2, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  path: string;
  onNavigate: (path: string) => void;
}

export default function LegalPage({ path, onNavigate }: LegalPageProps) {
  // Scroll to top when legal page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // Contato Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactPart, setContactPart] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Rastrear Pedido States
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingError, setTrackingError] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactPhone) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Telefone).');
      return;
    }
    setIsContactSubmitted(true);
    // Reset form
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactPart('');
    setContactMessage('');
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) {
      setTrackingError('Por favor, insira um código de rastreamento.');
      return;
    }
    setTrackingError('');
    // Open Correios tracking page in a new tab
    window.open('https://rastreamento.correios.com.br/app/index.php', '_blank');
  };

  const addressQuery = "Av. Thomaz Alberto Whately, 1435, Parque Industrial Coronel Quito Junqueira, Ribeirão Preto - SP, CEP 14075-390";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const renderContent = () => {
    switch (path) {
      case '/politica-de-privacidade':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <Shield className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Política de Privacidade
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Última atualização: Junho de 2026</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                A <strong>MAX DOIMO PINHEIRO AUTO PECAS</strong> (doravante designada &quot;MAX PEÇAS&quot;), inscrita sob o CNPJ <strong>33.403.195/0001-70</strong>, estabelecida na Av. Thomaz Alberto Whately, 1435, Parque Industrial Coronel Quito Junqueira, Ribeirão Preto - SP, CEP 14075-390, valoriza a privacidade dos seus usuários e clientes. Esta política descreve de forma clara e transparente como coletamos, armazenamos e tratamos suas informações pessoais.
              </p>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Coleta de Informações</h2>
                <p>
                  O nosso site coleta apenas informações que você fornece voluntariamente ao entrar em contato conosco através de nossos canais de atendimento, principalmente via WhatsApp ou e-mail. Essas informações podem incluir nome completo, telefone celular, endereço para cotação de frete, mensagem e informações referentes ao veículo de sua propriedade (como modelo, ano e motorização).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Finalidade do Tratamento das Informações</h2>
                <p>
                  As informações fornecidas são utilizadas estritamente para:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li>Prestar orçamentos detalhados de autopeças seminovas e usadas solicitados por você;</li>
                  <li>Inspecionar a compatibilidade física da peça com o veículo especificado;</li>
                  <li>Simular prazos e custos de frete através de nossas transportadoras parceiras conforme sua localização;</li>
                  <li>Emissão de documentação fiscal e relatórios obrigatórios de compliance comercial;</li>
                  <li>Atendimento pós-venda e suporte técnico referente às condições da peça.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Segurança dos Dados e Confidencialidade</h2>
                <p>
                  Adotamos medidas técnicas e administrativas compatíveis com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) para assegurar que suas informações estejam seguras. 
                </p>
                <p className="mt-2 text-emerald-400 font-medium">
                  IMPORTANTE: A MAX PEÇAS nunca solicita senhas, dados bancários sensíveis ou informações confidenciais de cartões de crédito em nosso site ou por canais não oficiais.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Uso de Cookies, Pixels e Análises</h2>
                <p>
                  Este site pode utilizar cookies, pixels e ferramentas de análise e rastreamento (como Google Analytics e Google Tag Manager) para entender o comportamento do visitor, otimizar a experiência de navegação e veicular anúncios adequados e transparentes no Google Ads. O usuário pode desativar o uso de cookies nas configurações do seu navegador a qualquer momento.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">5. Direitos do Usuário</h2>
                <p>
                  Você, como titular de dados pessoais, tem o direito de solicitar a validação, correção, atualização ou exclusão definitiva de seus dados cadastrais de nossos registros. Para exercer esses direitos, basta enviar um e-mail detalhado para <strong>MAXDOIMOPINHEIROAUTOPECAS@gmail.com</strong> ou falar com nosso encarregado no WhatsApp de atendimento.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">6. Compartilhamento com Terceiros</h2>
                <p>
                  A MAX PEÇAS não vende, aluga ou comercializa seus dados pessoais para terceiros para fins de marketing. Seus dados cadastrais serão compartilhados unicamente com as transportadoras encarregadas de realizar a entrega do produto ou órgãos tributários competentes para emissão de nota fiscal eletrônica.
                </p>
              </div>
            </div>
          </>
        );

      case '/termos-de-uso':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <FileText className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Termos de Uso do Site
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Institucional e Comercial</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                Seja bem-vindo ao portal da <strong>MAX PEÇAS</strong>. Ao acessar e utilizar este endereço eletrônico, você manifesta sua integral concordância com os presentes Termos de Uso.
              </p>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Proposta Comercial e Vitrine Virtual</h2>
                <p>
                  Este portal funciona como uma vitrine virtual catalogada de peças automotivas usadas e seminovas comercializadas pela MAX DOIMO PINHEIRO AUTO PECAS. O preenchimento de formulários, solicitações ou cliques nos botões direcionam o usuário para o nosso canal de comunicação no WhatsApp comercial, onde um consultor técnico qualificado realizará a verificação de compatibilidade, preços vigentes e as tratativas para atendimento e fechamento.
                </p>
                <p className="mt-2 text-stone-400">
                  Nosso site não realiza transações nem vendas automáticas imediatas. Toda venda é processada e finalizada de forma assistida através de atendimento humano.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Disponibilidade de Estoque e Imagens</h2>
                <p>
                  Trabalhamos com estoque rotativo de peças automotivas. Portanto:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li>O catálogo virtual de categorias reflete nosso portfólio regular de atuação, não representando promessa ou disponibilidade incondicional em tempo real de qualquer item;</li>
                  <li>As imagens exibidas no site são de caráter essencialmente ilustrativo ou correspondem a peças em estoque no momento do registro. O estado físico atual e código da peça devem ser confirmados com nossos profissionais durante a cotação no WhatsApp;</li>
                  <li>A MAX PEÇAS não garante disponibilidade permanente de qualquer item anunciado.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Dever de Informação do Comprador</h2>
                <p>
                  Para a correta localização de peças adequadas ao seu automóvel, o comprador deve fornecer informações corretas correspondentes à motorização, ano, modelo e, se necessário, número do chassi ou código gravado na peça antiga a ser substituída.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Isenção de Vínculos Oficiais</h2>
                <p>
                  A MAX PEÇAS é uma empresa comercial independente. Não somos concessionária, revendedor, representante oficial ou assistência técnica de qualquer fabricante de veículos ou montadora (tais como Chevrolet, Fiat, Volkswagen, Ford, Toyota, Honda, Hyundai, Jeep, etc.). Todas as marcas, logotipos e nomes de modelos são citados estritamente para indicação de compatibilidade técnica e aplicação das autopeças comercializadas secundariamente.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">5. Alterações de Preços e Condições</h2>
                <p>
                  Os preços sugeridos, estimativas de frete e informações comerciais estão sujeitos a alterações sem prévio aviso, refletindo a variação cambial, custos logísticos e rotatividade do mercado. Apenas a cotação formalizada por nossos técnicos de atendimento tem validade comercial.
                </p>
              </div>
            </div>
          </>
        );

      case '/trocas-garantia-procedencia':
      case '/politica-de-garantia':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <BadgeAlert className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Política de Garantia
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Termos de Cobertura Comercial</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                Na <strong>MAX PEÇAS</strong>, as peças automotivas usadas e seminovas acompanham termos claros de garantia, em respeito à legislação pertinente e com base em condições operacionais transparentes.
              </p>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Prazos de Cobertura</h2>
                <p>
                  Nossa empresa concede cobertura de garantia técnica operacional pelo prazo de <strong>90 (noventa) dias corridos</strong>, que atende rigorosamente ao disposto no Código de Defesa do Consumidor (CDC) para bens duráveis, contados a partir da data de recebimento do produto pelo cliente.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Requisitos para Atendimento da Garantia</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-400">
                  <li>Preservação dos lacres de segurança e marcações físicas aplicadas em nosso estoque de Ribeirão Preto - SP. O rompimento, rasura ou remoção destes identificadores acarreta a perda da cobertura;</li>
                  <li>Apresentação da respectiva emissão de nota fiscal eletrônica emitida no momento da venda;</li>
                  <li>Envio de fotos ou vídeos demonstrando o inconveniente no funcionamento da peça por nossos canais digitais.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Limites de Cobertura</h2>
                <p>
                  A garantia cobre defeitos de funcionamento relacionados ao desgaste natural e à aplicação padrão da autopeça. No entanto, ela fica expressamente excluída nas seguintes situações:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li>Incompetência técnica na instalação, montagem incorreta ou falta de adaptação recomendada na mão de obra profissional;</li>
                  <li>Danos provocados por colisões, uso além dos limites de projeto do fabricante ou adulterações mecânicas posteriores;</li>
                  <li>Uso inadequado de fluidos, óleos, aditivos ou falta de lubrificação básica exigida pelo motor/câmbio.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Procedimento de Acionamento</h2>
                <p>
                  Para dar início ao processo de análise de garantia, entre em contato com nosso WhatsApp oficial ou envie e-mail detalhado para: <strong>MAXDOIMOPINHEIROAUTOPECAS@gmail.com</strong>.
                </p>
              </div>
            </div>
          </>
        );

      case '/politica-de-troca-e-devolucao':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <BadgeAlert className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Política de Troca e Devolução
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Trocas e Cancelamentos</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                Em conformidade com as diretrizes do comércio eletrônico e do Código de Defesa do Consumidor, a <strong>MAX PEÇAS</strong> apresenta uma política objetiva de troca e devolução das peças automotivas comercializadas.
              </p>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Direito de Arrependimento de Compra Virtual</h2>
                <p>
                  Para as aquisições realizadas de forma totalmente virtual (mensagens ou contatos sob entrega a distância), o consumidor tem o prazo legal de reflexão de até <strong>7 (sete) dias corridos</strong>, contados do recebimento do produto no endereço indicado, para manifestar arrependimento.
                </p>
                <p className="mt-2 text-stone-400">
                  A peça deve ser devolvida exatamente nas mesmas condições físicas de recepção, com embalagem segura, lacres intactos e acompanhada da Nota Fiscal correspondiente.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Devoluções por Incompatibilidade de Peça</h2>
                <p>
                  Caso o comprador perceba incompatibilidade no momento de montagem da autopeça, a troca poderá ser providenciada mediante as seguintes diretrizes:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li>A peça não pode ter sido danificada ou modificada na tentativa de adaptação forçada;</li>
                  <li>A constatação deve ser informada de imediato ao nosso suporte para realizarmos o processo logístico adequado.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Estorno e Devoluções de Valores</h2>
                <p>
                  O reembolso do valor pago será processado após a recepção física do item de retorno em nosso galpão de Ribeirão Preto - SP e conferência técnica dos lacres. O estorno será creditado pela mesma via de pagamento utilizada no momento do fechamento.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Iniciar Formalização</h2>
                <p>
                  Evite atrasos enviando uma mensagem para o nosso suporte técnico comercial via WhatsApp ou reporte pelo e-mail: <strong>MAXDOIMOPINHEIROAUTOPECAS@gmail.com</strong>.
                </p>
              </div>
            </div>
          </>
        );

      case '/politica-de-envio-e-entrega':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <Truck className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Política de Envio e Entrega
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Entregas e Distribuição Logística</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                A <strong>MAX PEÇAS</strong> realiza envios de peças automotivas usadas e seminovas para diversas regiões brasileiras e atende presencialmente na sede física de Ribeirão Preto/SP.
              </p>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Modalidades de Expedição</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-400">
                  <li><strong>Envio por Transportadora:</strong> Peças de médio e grande porte (como motores, transmissões completas, portas, capôs, suspensão) são despachadas por transportadoras parceiras e qualificadas com base em peso, cubagem e localidade;</li>
                  <li><strong>Correios:</strong> Peças leves e de pequeno volume são enviadas preferencialmente via PAC ou Sedex;</li>
                  <li><strong>Retirada Física Agendada:</strong> Você pode realizar a retirada física diretamente em nossa loja de Ribeirão Preto - SP mediante prévia confirmação de disponibilidade da autopeça por WhatsApp.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Prazos e Custos Logísticos</h2>
                <p>
                  Os prazos de entrega e valores de frete variam de acordo com a distância geográfica e características físicas do pacote. Essas estimativas são calculadas no momento do atendimento no WhatsApp. O prazo se inicia formalmente após o faturamento da nota fiscal e envio da peça aos transportadores.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Rastreamento da Entrega</h2>
                <p>
                  No momento da postagem do material, informamos o respectivo código de rastreamento ou dados do transportador para que você possa acompanhar o trânsito da sua encomenda.
                </p>
              </div>
            </div>
          </>
        );

      case '/rastrear-pedido':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <Truck className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Rastrear Pedido
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Acompanhe seu Envio</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                Nossos clientes podem acompanhar de forma direta e transparente a entrega das peças adquiridas. Insira o código de rastreamento fornecido por nossa equipe técnica nos canais de pós-venda.
              </p>

              <div className="bg-stone-900 border border-stone-800 p-6 rounded-lg my-6 max-w-lg">
                <form onSubmit={handleTrackingSubmit} className="space-y-4">
                  <label htmlFor="trackingInput" className="block text-sm font-semibold text-white tracking-wide uppercase font-mono">
                    Código de Rastreamento (Correios ou Transportadora):
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        id="trackingInput"
                        required
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder="Ex: AB123456789BR"
                        className="w-full bg-stone-950 border border-stone-750 text-white rounded-md pl-4 pr-4 py-3 placeholder:text-stone-600 text-sm focus:border-red-650 focus:outline-none focus:ring-0"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-red-650 hover:bg-red-700 text-white font-bold h-12 px-6 rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer text-sm tracking-uppercase active:translate-y-0.5"
                    >
                      <Search className="h-4 w-4" />
                      Rastrear nos Correios
                    </button>
                  </div>
                  {trackingError && (
                    <p className="text-xs text-red-500 italic mt-1">{trackingError}</p>
                  )}
                </form>
              </div>

              <div className="p-4 bg-stone-900/60 border-l-4 border-emerald-600 rounded-r-md text-stone-400 text-xs md:text-sm">
                <p className="font-bold text-white mb-1">Aviso:</p>
                O rastreamento será realizado no ambiente oficial dos Correios. Para entregas feitas por transportadoras parceiras, nossa equipe enviará o link ou código correspondente pelo WhatsApp ou e-mail.
              </div>
            </div>
          </>
        );

      case '/contato':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <Phone className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Contato Comercial
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Fale Direto Conosco</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Box Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                    Precisa de suporte comercial ou deseja consultar a disponibilidade de peças automotivas usadas no estoque de Ribeirão Preto? Atendemos de forma objetiva nos canais institucionais listados abaixo:
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs md:text-sm">
                  <div className="flex items-start gap-3 p-3 bg-stone-900 border border-stone-850 rounded">
                    <Building2 className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold uppercase tracking-wide">MAX DOIMO PINHEIRO AUTO PECAS</p>
                      <p className="text-stone-500 mt-1">CNPJ: 33.403.195/0001-70</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-stone-900 border border-stone-850 rounded">
                    <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold uppercase tracking-wide">WhatsApp / Suporte:</p>
                      <p className="text-emerald-400 mt-1 font-bold font-sans text-sm md:text-base">0800 000 3728</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-stone-900 border border-stone-850 rounded">
                    <Mail className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold uppercase tracking-wide">E-mail Administrativo:</p>
                      <p className="text-stone-400 mt-1 break-all select-all">MAXDOIMOPINHEIROAUTOPECAS@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-stone-900 border border-stone-850 rounded">
                    <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold uppercase tracking-wide">Endereço de Atendimento:</p>
                      <p className="text-stone-400 mt-1">
                        Av. Thomaz Alberto Whately, 1435, Parque Industrial Coronel Quito Junqueira, Ribeirão Preto - SP, CEP 14075-390
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-stone-900 border border-stone-850 rounded">
                    <Clock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold uppercase tracking-wide">Expediente:</p>
                      <p className="text-stone-400 mt-1">Segunda a Sexta: 08:00h às 18:00h<br />Sábados: 08:00h às 12:00h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form de Contato */}
              <div className="lg:col-span-7 bg-stone-900/40 border border-stone-850 rounded-lg p-6 flex flex-col justify-between">
                {isContactSubmitted ? (
                  <div className="text-center py-12 space-y-4 my-auto">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-950 border border-emerald-500/50 mb-2">
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide italic">Sua Mensagem foi Enviada!</h3>
                    <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                      Recebemos seus dados cadastrais de contato e nossa equipe fará a verificação de peças no estoque físico atual para responder o mais breve possível.
                    </p>
                    <button
                      onClick={() => setIsContactSubmitted(false)}
                      className="mt-4 text-xs font-mono text-red-500 hover:text-white uppercase tracking-widest block mx-auto cursor-pointer"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide border-b border-stone-850 pb-2 mb-4">
                      Formulário de Contato Rápido
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact_name" className="text-xs font-semibold text-stone-300 font-mono">Nome Completo *</label>
                        <input
                          type="text"
                          id="contact_name"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ex: João da Silva"
                          className="w-full bg-stone-950 border border-stone-800 text-white rounded p-2.5 placeholder:text-stone-600 text-sm focus:border-red-650 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact_email" className="text-xs font-semibold text-stone-300 font-mono">E-mail de Contato *</label>
                        <input
                          type="email"
                          id="contact_email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="Ex: joao@seuprovedor.com"
                          className="w-full bg-stone-950 border border-stone-800 text-white rounded p-2.5 placeholder:text-stone-600 text-sm focus:border-red-650 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact_phone" className="text-xs font-semibold text-stone-300 font-mono">Telefone / WhatsApp *</label>
                        <input
                          type="text"
                          id="contact_phone"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="Ex: (16) 99999-9999"
                          className="w-full bg-stone-950 border border-stone-800 text-white rounded p-2.5 placeholder:text-stone-600 text-sm focus:border-red-650 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact_part" className="text-xs font-semibold text-stone-300 font-mono">Peça Automotiva que Procura</label>
                        <input
                          type="text"
                          id="contact_part"
                          value={contactPart}
                          onChange={(e) => setContactPart(e.target.value)}
                          placeholder="Ex: Farol Dianteiro Fiat Argo 2021"
                          className="w-full bg-stone-950 border border-stone-800 text-white rounded p-2.5 placeholder:text-stone-600 text-sm focus:border-red-650 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact_msg" className="text-xs font-semibold text-stone-300 font-mono">Conteúdo da Mensagem</label>
                      <textarea
                        id="contact_msg"
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Escreva detalhes técnicos adicionais ou solicitação de orçamento..."
                        className="w-full bg-stone-950 border border-stone-800 text-white rounded p-2.5 placeholder:text-stone-600 text-sm focus:border-red-650 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded transition-all cursor-pointer text-sm uppercase font-mono shadow-md"
                    >
                      <Send className="h-4 w-4" />
                      Enviar Solicitação de Orçamento
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Mapa Incorporado */}
            <div className="mt-8 border border-stone-850 rounded-lg overflow-hidden h-[350px] relative shadow-lg">
              <iframe
                id="contact-page-maps-iframe"
                title="Sede Física MAX PEÇAS Ribeirão Preto"
                src={mapUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-12 text-stone-400">
            Página jurídica ou corporativa não localizada.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#141517] pt-24 pb-20 px-4 md:px-8 border-t-2 border-red-650" id="legal-layout-viewport">
      <div className="max-w-7xl mx-auto rounded-xl bg-[#1A1C1E] border border-stone-850 p-6 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs md:text-sm font-mono tracking-wider uppercase mb-8 cursor-pointer group transition-colors bg-transparent border-0"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Voltar para o Início
        </button>

        {/* Legal text holder styled carefully */}
        <article className="prose prose-invert max-w-none">
          {renderContent()}
        </article>

        {/* Quick corporate trust footer card inside the document */}
        <div className="mt-12 pt-8 border-t border-stone-850 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-1.5">
            <p className="text-sm font-bold text-white uppercase tracking-tight font-sans">MAX DOIMO PINHEIRO AUTO PECAS</p>
            <p className="text-xs text-stone-500 leading-relaxed font-mono">
              CNPJ: 33.403.195/0001-70<br />
              Av. Thomaz Alberto Whately, 1435, Parque Industrial Coronel Quito Junqueira<br />
              Ribeirão Preto - SP, CEP 14075-390
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1 text-xs text-stone-400 font-mono">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-emerald-500" /> Suporte: 0800 000 3728</span>
            <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-red-500" /> e-mail: MAXDOIMOPINHEIROAUTOPECAS@gmail.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}
