import React from 'react';
import { X, Shield, FileText, BadgeAlert, RefreshCw } from 'lucide-react';
import { ComplianceDocType } from '../types';

interface ComplianceModalsProps {
  activeDoc: ComplianceDocType;
  onClose: () => void;
}

export default function ComplianceModals({ activeDoc, onClose }: ComplianceModalsProps) {
  if (!activeDoc) return null;

  const renderContent = () => {
    switch (activeDoc) {
      case 'privacidade':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
              <Shield className="h-6 w-6 text-red-600 flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-stone-950">
                Política de Privacidade
              </h2>
            </div>
            <div className="space-y-4 text-stone-700 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
              <p>
                A <strong>AUTO PECAS MAX LTDA</strong> (doravante designada &quot;MAXPEÇAS&quot;), inscrita sob o CNPJ <strong>00.452.917/0001-27</strong>, estabelecida na Rua João Lúcio Brandão, 191, Prado, Belo Horizonte - MG, valoriza a privacidade dos seus usuários e clientes. Esta política descreve como coletamos, armazenamos e tratamos suas informações pessoais.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">1. Coleta de Informações</h3>
              <p>
                Coletamos informações que você fornece espontaneamente ao entrar em contato conosco através de nossos canais de atendimento, principalmente via WhatsApp ou e-mail, como nome completo, telefone celular, endereço para cotação de frete e informações relativas ao veículo de sua propriedade.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">2. Finalidade de Tratamento das Informações</h3>
              <p>
                As informações coletadas são utilizadas estritamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Prestar orçamentos detalhados de autopeças solicitados por você;</li>
                <li>Simular prazos e custos de frete através de nossas transportadoras parceiras;</li>
                <li>Emissão de Notas Fiscais Eletrônicas (NF-e) em caso de efetivação da compra;</li>
                <li>Atendimento pós-venda, incluindo acionamento de garantias legais.</li>
              </ul>
              <h3 className="font-semibold text-stone-900 mt-4">3. Compartilhamento com Terceiros</h3>
              <p>
                A MAXPEÇAS não vende, aluga ou comercializa seus dados pessoais para terceiros. Seus dados cadastrais poderão ser compartilhados unicamente com os órgãos fiscais governamentais (para fins de geração de nota fiscal eletrônica) ou empresas de transporte parceiras encarregadas de realizar a entrega física do seu produto.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">4. Segurança dos Dados</h3>
              <p>
                Adotamos medidas técnicas e administrativas compatíveis com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) para assegurar que suas informações estejam seguras e protegidas de vazamentos, acessos indevidos ou modificações indesejadas.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">5. Direitos do Usuário</h3>
              <p>
                Você poderá a qualquer tempo solicitar a validação, alteração ou exclusão definitiva de seus dados cadastrais de nossos servidores entrando em contato por e-mail pelo endereço <strong>contato.maxpecas@gmail.com</strong>.
              </p>
              <p className="text-xs text-stone-500 mt-6">
                Última atualização oficial realizada em: 08 de Junho de 2026.
              </p>
            </div>
          </>
        );

      case 'termos':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
              <FileText className="h-6 w-6 text-red-600 flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-stone-950">
                Termos de Uso do Site
              </h2>
            </div>
            <div className="space-y-4 text-stone-700 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
              <p>
                Seja bem-vindo ao portal institucional da <strong>MAXPEÇAS</strong>. Ao acessar e utilizar este endereço eletrônico, você manifesta sua concordância tácita com os presentes Termos de Uso.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">1. Dinâmica da Consulta e Orçamento</h3>
              <p>
                Este site funciona como uma vitrine virtual catalogada de peças automotivas comercializadas pela AUTO PECAS MAX LTDA. O preenchimento ou clique em botões direciona o usuário para o nosso canal oficial de comunicação no WhatsApp empresarial, onde um consultor técnico qualificado realizará a tratativa de preços, validação imediata do estoque físico atual da peça solicitada e fechamento comercial das condições.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">2. Transparência de Estoque e Isenção de Promessas</h3>
              <p>
                Atuamos com estoque rotativo diário de autopeças. Em estrita conformidade com as diretrizes do Google Ads, afirmamos que:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>O catálogo virtual de categorias reflete nosso portfólio regular de atuação, e não uma promessa incondicional de disponibilidade em tempo real de qualquer peça de qualquer fabricante;</li>
                <li>A confirmação do estado de conservação (nova ou seminova), código correspondente original do fabricante e compatibilidade com o chassis mecânico do veículo do cliente dar-se-á exclusivamente na etapa de cotação via WhatsApp.</li>
              </ul>
              <h3 className="font-semibold text-stone-900 mt-4">3. Direitos de Propriedade Intelectual</h3>
              <p>
                Os materiais visuais, logotipos, fotografias autorais e textos inseridos neste site são de propriedade exclusiva da AUTO PECAS MAX LTDA ou licenciados regularmente. Fica vedada a cópia desautorizada para fins concorrenciais comerciais.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">4. Foro de Eleição</h3>
              <p>
                Fica eleito o foro da Comarca de Belo Horizonte - MG para dirimir quaisquer controvérsias decorrentes das interações geradas por este site eletrônico institucional.
              </p>
            </div>
          </>
        );

      case 'garantia':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
              <BadgeAlert className="h-6 w-6 text-red-600 flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-stone-950">
                Política de Garantia
              </h2>
            </div>
            <div className="space-y-4 text-stone-700 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
              <p>
                Na <strong>MAXPEÇAS</strong>, a transparência e a seriedade comercial andam lado a lado. Todas as peças automotivas, sejam novas ou seminovas de procedência verificada, possuem garantia assegurada.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">1. Prazo da Garantia</h3>
              <p>
                Asseguramos uma garantia operacional rígida de <strong>90 (noventa) dias corridos (3 meses)</strong>. Este prazo inicia-se na data exata de retirada do produto em nosso balcão ou na data de entrega comprovada do produto nos casos de despacho postal/transportadora, em estrita conformidade com o Artigo 26, Inciso II do Código de Defesa do Consumidor (CDC) brasileiro.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">2. Requisitos Obrigatórios para Validade</h3>
              <p>
                As autopeças mecânicas, eletroeletrônicas e de acabamento sofisticado demandam criterioso processo técnico para sua correta aplicação. Para usufruir da garantia de 90 dias, é indispensável que:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A peça tenha sido instalada por uma oficina mecânica devidamente credenciada com emissão de Ordem de Serviço (OS) ou nota de prestação de serviços mecânicos de instalação correspondente;</li>
                <li>A peça de desmonte mantenha as marcas originais invioladas, lacres de selagem comercial ou marcações internas a laser aplicadas por nossa equipe.</li>
              </ul>
              <h3 className="font-semibold text-stone-900 mt-4">3. Exclusões da Cobertura de Garantia</h3>
              <p>
                Ficará expressamente extinta a cobertura da garantia comercial caso ocorra:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Uso indevido, sobrecarga mecânica ou aplicação incompatível com o modelo projetado da peça;</li>
                <li>Acidentes automotivos posteriores ou sinistros decorrentes de competições de alta aceleração;</li>
                <li>Desmontagem parcial da peça sem concordância prévia documentada da nossa equipe técnica;</li>
                <li>Problemas elétricos provocados por curtos-circuitos no restante da fiação elétrica original do automóvel do cliente.</li>
              </ul>
            </div>
          </>
        );

      case 'troca':
        return (
          <>
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
              <RefreshCw className="h-6 w-6 text-red-600 flex-shrink-0" />
              <h2 className="text-xl md:text-2xl font-display font-bold text-stone-950">
                Política de Trocas e Devoluções
              </h2>
            </div>
            <div className="space-y-4 text-stone-700 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
              <p>
                A <strong>MAXPEÇAS</strong> preza pela satisfação do cliente. Caso a autopeça adquirida não sirva perfeitamente ou apresente inconformidade, dispomos de política ágil para regularização.
              </p>
              <h3 className="font-semibold text-stone-900 mt-4">1. Direito de Arrependimento de Compra Virtual</h3>
              <p>
                Em conformidade com o Artigo 49 do CDC, nas operações de compra realizadas de forma puramente não presencial (por meio de contato no WhatsApp com despacho por transportadora), o cliente poderá desistir da aquisição em até <strong>7 (sete) dias corridos</strong> após o recebimento.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nesses casos, a peça deve ser reempacotada com todos os acessórios protetores originais;</li>
                <li>O reembolso do valor pago será providenciado estornando na mesma via de pagamento (PIX ou depósito bancário) tão logo o item chegue em nossa oficina de Belo Horizonte e passe por crivo examinador de conformidade dos selos.</li>
              </ul>
              <h3 className="font-semibold text-stone-900 mt-4">2. Troca de Peças Adquiridas com Código Incorreto</h3>
              <p>
                É dever do instalador ou do comprador certificar-se do código da peça do carro antes do fechamento comercial. No entanto, se houver incompatibilidade física, efetuaremos a troca do produto em até <strong>7 dias</strong> sob condições restritas:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sujeito à disponibilidade no estoque atual por outra peça que atenda devidamente à aplicação técnica;</li>
                <li>O frete decorrente de reenvio por equívoco na especificação técnica por parte do cliente correrá por conta do comprador de forma transparente.</li>
              </ul>
              <h3 className="font-semibold text-stone-900 mt-4">3. Trâmite de Devoluções</h3>
              <p>
                Para início formal do protocolo de trocas ou estornos, envie mensagem direta ao WhatsApp Oficial de Suporte no número <strong>(31) 98825-4981</strong> ou relate o ocorrido detalhadamente para <strong>contato.maxpecas@gmail.com</strong> anexando foto da etiqueta do produto e número da Nota Fiscal de venda correspondente.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        id={`modal-${activeDoc}`}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          id="btn-close-modal"
          aria-label="Botão Fechar Documento"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {renderContent()}
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-150 flex justify-end">
          <button
            onClick={onClose}
            id="btn-confirm-modal"
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors font-medium text-sm cursor-pointer"
          >
            Entendido, Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}
