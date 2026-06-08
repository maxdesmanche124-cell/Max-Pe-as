import React, { useEffect } from 'react';
import { ArrowLeft, Shield, FileText, BadgeAlert, Phone, Mail, MapPin } from 'lucide-react';

interface LegalPageProps {
  path: string;
  onNavigate: (path: string) => void;
}

export default function LegalPage({ path, onNavigate }: LegalPageProps) {
  // Scroll to top when legal page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

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
                A <strong>AUTO PEÇAS MAX LTDA</strong> (doravante designada &quot;MAX PEÇAS&quot;), inscrita sob o CNPJ <strong>00.452.917/0001-27</strong>, estabelecida na Rua João Lúcio Brandão, 191, Prado, Belo Horizonte - MG, valoriza a privacidade dos seus usuários e clientes. Esta política descreve de forma clara e transparente como coletamos, armazenamos e tratamos suas informações pessoais.
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
                  Este site pode utilizar cookies, pixels e ferramentas de análise e rastreamento (como Google Analytics e Google Tag Manager) para entender o comportamento do visitante, otimizar a experiência de navegação e veicular anúncios adequados e transparentes no Google Ads. O usuário pode desativar o uso de cookies nas configurações do seu navegador a qualquer momento.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">5. Direitos do Usuário</h2>
                <p>
                  Você, como titular de dados pessoais, tem o direito de solicitar a validação, correção, atualização ou exclusão definitiva de seus dados cadastrais de nossos registros. Para exercer esses direitos, basta enviar um e-mail detalhado para <strong>contato.maxpecas@gmail.com</strong> ou falar com nosso encarregado no WhatsApp de atendimento.
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
                  Este portal funciona como uma vitrine virtual catalogada de peças automotivas usadas e seminovas comercializadas pela AUTO PEÇAS MAX LTDA. O preenchimento de formulários, solicitações ou cliques nos botões direcionam o usuário para o nosso canal de comunicação no WhatsApp comercial, onde um consultor técnico qualificado realizará a verificação de compatibilidade, preços vigentes e as tratativas para atendimento e fechamento.
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
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Dever de Informação do Computador</h2>
                <p>
                  Para a correta localização de peças adequadas ao seu automóvel, o comprador deve fornecer informações corretas correspondentes à motorização, ano, modelo e, se necessário, número do chassi ou código gravado na peça antiga a ser substituída.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Isenção de Vínculos Oficiais</h2>
                <p>
                  A MAX PEÇAS é uma empresa comercial independente. Não somos concessionária, revendedor autorizado, representante oficial ou assistência técnica autorizada de qualquer fabricante de veículos ou montadora (tais como Chevrolet, Fiat, Volkswagen, Ford, Toyota, Honda, Hyundai, Jeep, etc.). Todas as marcas, logotipos e nomes de modelos são citados estritamente para indicação de compatibilidade técnica e aplicação das autopeças comercializadas secundariamente.
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
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-850 pb-6 mb-6">
              <BadgeAlert className="h-8 w-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-black text-white italic uppercase tracking-tight">
                  Trocas, Garantia e Procedência
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1 uppercase">Orientação de Consumo Seguro</p>
              </div>
            </div>

            <div className="space-y-6 text-stone-300 text-sm md:text-base leading-relaxed">
              <p>
                Na <strong>MAX PEÇAS</strong>, atuamos com rigor técnico corporativo. Todas as peças automotivas comercializadas — majoritariamente usadas e seminovas oriundas de processos de desmontagem lícitos — são selecionadas, catalogadas e expedidas sob estrito critério de conformidade comercial.
              </p>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">1. Procedência Informada</h2>
                <p>
                  Nossas peças lícitas possuem procedência minuciosamente documentada. Comercializamos peças com histórico seguro de veículos, acompanhadas de Nota Fiscal. Não possuímos vínculo, convênio ou parceria com órgãos governamentais de trânsito, leiloeiros públicos ou seguradoras, atuando como empresa do mercado privado regularizado de autopeças.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">2. Garantia Conforme Condições da Peça</h2>
                <p>
                  Oferecemos cobertura de garantia operacional de <strong>90 (noventa) dias corridos</strong> para os produtos, em conformidade com as regras gerais do Artigo 26 do Código de Defesa do Consumidor brasileiro.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li><strong>Compatibilidade e Aplicação:</strong> A compatibilidade da peça com o veículo deve ser devidamente confirmada com nossa equipe técnica antes do faturamento comercial;</li>
                  <li><strong>Condições Próprias de Componentes Específicos:</strong> Peças elétricas, eletrônicas, módulos eletrônicos de injeção ou componentes de alta sensibilidade técnica possuem condições de garantia específicas comunicadas de forma transparente pelo consultor antes da finalização do atendimento;</li>
                  <li><strong>Instalação Técnica Exigida:</strong> Recomenda-se enfaticamente que a montagem das peças seja realizada por oficina mecânica ou centro automotivo especializado equipado com documentação profissional. Danos decorrentes de instalação incorreta ou negligência não são passíveis de garantia.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">3. Política de Trocas e Devoluções</h2>
                <p>
                  Caso necessite de troca ou devolução, o procedimento deve respeitar os seguintes termos corporativos:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-stone-400">
                  <li><strong>Prazo de Desistência para Vendas a Distância:</strong> Conforme artigo 49 do CDC, nas vendas realizadas integralmente fora do estabelecimento físico (despachadas eletronicamente por telefone ou WhatsApp com envio logístico), o cliente dispõe do prazo de reflexão de até 7 dias corridos a contar da entrega;</li>
                  <li><strong>Integridade do Produto:</strong> Para que a troca ou devolução se concretize, o item deve ser preservado sem rompimento de lacres de segurança físicos, gravação interna ou marcações aplicadas pela nossa equipe de catalogação;</li>
                  <li><strong>Erros de Compatibilidade:</strong> Custos de frete adicionais decorrentes de pedidos incorretos feitos sem a validação mecânica prévia correrão conforme condições informadas antes da finalização da compra.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">4. Recomendação no Recebimento</h2>
                <p>
                  O cliente deve conferir minuciosamente a peça no ato de recebimento físico ou desempacotamento antes de assinar o canhoto do transportador, informando qualquer falha ou avaria decorrente do trânsito logístico imediatamente ao canal oficial de atendimento da MAX PEÇAS.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">5. Canal Oficial de Atendimento</h2>
                <p>
                  Para abertura de protocolo técnico de garantia, trocas ou esclarecimentos, entre em contato imediatamente com nossos consultores corporativos através do WhatsApp <strong>0800 000 3728</strong> ou relate formalmente para o e-mail: <strong>contato.maxpecas@gmail.com</strong>.
                </p>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-12 text-stone-400">
            Página jurídica não localizada.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#141517] pt-24 pb-20 px-4 md:px-8 border-t-2 border-red-650" id="legal-layout-viewport">
      <div className="max-w-4xl mx-auto rounded-xl bg-[#1A1C1E] border border-stone-850 p-6 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs md:text-sm font-mono tracking-wider uppercase mb-8 cursor-pointer group transition-colors"
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
            <p className="text-sm font-bold text-white uppercase tracking-tight">AUTO PEÇAS MAX LTDA</p>
            <p className="text-xs text-stone-500 leading-relaxed font-mono">
              CNPJ: 00.452.917/0001-27<br />
              Rua João Lúcio Brandão, 191, Prado<br />
              Belo Horizonte - MG, CEP 30411-046
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1 text-xs text-stone-400 font-mono">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-emerald-500" /> Suporte: 0800 000 3728</span>
            <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-red-500" /> e-mail: contato.maxpecas@gmail.com</span>
          </div>
        </div>

      </div>
    </div>
  );
}
