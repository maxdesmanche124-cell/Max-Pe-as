import { PartCategory, Differential, Review, FAQItem } from '../types';

export const CATEGORIES: PartCategory[] = [
  {
    id: '1',
    name: 'Motores',
    description: 'Motores seminovos selecionados, com nota fiscal e garantia conforme disponibilidade.',
    iconName: 'Fuel',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'MOT'
  },
  {
    id: '2',
    name: 'Cabeçotes',
    description: 'Cabeçotes de motores nacionais e importados, testados sob pressão e prontos para instalação.',
    iconName: 'Cpu',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'CAB'
  },
  {
    id: '3',
    name: 'Câmbios',
    description: 'Câmbios manuais e automáticos revisados, com troca de fluidos em dia e garantia de funcionamento.',
    iconName: 'Settings',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'CAM'
  },
  {
    id: '4',
    name: 'Portas',
    description: 'Portas dianteiras e traseiras originais de fábrica com pintura preservada e sem oxigenação.',
    iconName: 'Square',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'POR'
  },
  {
    id: '5',
    name: 'Capôs',
    description: 'Capôs originais com excelente alinhamento estrutural, perfeitos para funilaria e pintura rápida.',
    iconName: 'FolderOpen',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'CAP'
  },
  {
    id: '6',
    name: 'Para-choques',
    description: 'Para-choques originais estruturados, prontos para lixamento e pintura na cor do seu carro.',
    iconName: 'Maximize',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'PAR'
  },
  {
    id: '7',
    name: 'Bancos',
    description: 'Bancos em tecido ou couro legítimo, com regulagem de altura manual ou elétrica em ótimo estado.',
    iconName: 'Armchair',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'BAN'
  },
  {
    id: '8',
    name: 'Rodas',
    description: 'Jogos de rodas de liga leve ou unidades avulsas originais de montadoras, balanceadas e retas.',
    iconName: 'Disc',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1505682631551-a0668d22e5a1?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'ROD'
  },
  {
    id: '9',
    name: 'Faróis',
    description: 'Faróis máscara negra, projetores e convencionais em policarbonato polido com travas intactas.',
    iconName: 'Sun',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'FAR'
  },
  {
    id: '10',
    name: 'Lanternas',
    description: 'Lanternas traseiras originais em excelente estado óptico, sem trincados e com vedação perfeita.',
    iconName: 'Lightbulb',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1625217527288-93919c996509?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'LAN'
  },
  {
    id: '11',
    name: 'Suspensão',
    description: 'Quadros de suspensão, amortecedores sobressalentes, balanças e mangas de eixo originais.',
    iconName: 'Activity',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1562620658-963b65287349?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'SUS'
  },
  {
    id: '12',
    name: 'Peças Elétricas e Eletrônicas',
    description: 'Componentes elétricos e eletrônicos para diversas marcas e modelos, com procedência, nota fiscal e garantia conforme disponibilidade.',
    iconName: 'Zap',
    popularVehicles: [
      'Módulos',
      'Sensores',
      'Chicotes',
      'Painéis',
      'Caixas de Fusíveis',
      'Centrais Eletrônicas',
      'Comandos Elétricos'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'EEL'
  }
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: 'd1',
    title: 'Procedência das Peças',
    description: 'Peças com origem comprovada adquiridas legalmente com nota fiscal de frotas e seguradoras. Garantia de procedência.',
    iconName: 'SearchCode'
  },
  {
    id: 'd2',
    title: 'Nota Fiscal Eletrônica',
    description: '100% das nossas vendas acompanham Nota Fiscal Eletrônica (NF-e), garantindo legitimidade jurídica.',
    iconName: 'FileText'
  },
  {
    id: 'd3',
    title: 'Garantia por Escrito',
    description: 'Todas as peças acompanham garantia expressa de 3 meses segundo o Código de Defesa do Consumidor.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'd4',
    title: 'Atendimento Especializado',
    description: 'Nossa equipe técnica possui amplo conhecimento técnico e prático para tirar dúvidas exatas sobre a peça correta para o seu modelo.',
    iconName: 'UserCheck'
  },
  {
    id: 'd5',
    title: 'Tradição Desde 1995',
    description: 'São mais de 30 anos de atuação sólida em Belo Horizonte, sendo referência em autopeças de confiança no Prado.',
    iconName: 'Calendar'
  },
  {
    id: 'd6',
    title: 'Estoque Próprio',
    description: 'Galpão próprio amplo com milhares de itens catalogados para pronta-entrega ou retirada rápida na loja.',
    iconName: 'Layers'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Roberto Mendonça',
    role: 'Proprietário de Oficina Mecânica (AutoCenter Prado)',
    rating: 5,
    comment: 'Compro motores e câmbios com a MAXPEÇAS há mais de 10 anos. A procedência é impecável, a nota fiscal vem sempre certa para o cadastro ou regularização do motor e os clientes saem satisfeitos. Entrega rápida demais aqui em BH!',
    avatarLetter: 'R',
    date: 'Há 1 semana'
  },
  {
    id: 'r2',
    name: 'Juliana Vasconcellos',
    role: 'Proprietária de T-Cross 2021',
    rating: 5,
    comment: 'Precisei de um capô e farol originais depois de uma pequena colisão. Na concessionária ficava o triplo do preço. Comprei com eles seminovos perfeitos, com nota e pintura excelente. Atendimento no WhatsApp nota 10!',
    avatarLetter: 'J',
    date: 'Há 2 semanas'
  },
  {
    id: 'r3',
    name: 'Mário Funilaria BH',
    role: 'Empresário e Funileiro',
    rating: 5,
    comment: 'Peças de lataria como portas e para-choques originais são raros de achar com bom alinhamento. A MAXPEÇAS só vende peça boa. O preço é justo, com frete rápido e garantia documentada.',
    avatarLetter: 'M',
    date: 'Há 3 semanas'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'As peças vendidas possuem selo de procedência legal?',
    answer: 'Sim! Toda e qualquer peça disponível em nosso estoque é oriunda de veículos adquiridos junto a companhias de frotas desativadas ou seguradoras, possuindo nota fiscal de origem correspondente. Temos garantia de procedência comprovada e empresa regularizada para total segurança.'
  },
  {
    id: 'f2',
    question: 'Vocês emitem Nota Fiscal (NF-e)?',
    answer: 'Com certeza. Sem exceção, 100% de nossas peças novas ou seminovas são comercializadas obrigatoriamente acompanhadas de Nota Fiscal de emissão eletrônica no nome do comprador (Pessoa Física ou Jurídica).'
  },
  {
    id: 'f3',
    question: 'Como funciona a garantia das peças?',
    answer: 'Todos os nossos produtos (como motores, cabeçotes, câmbios, faróis e suspensão) gozam de garantia legal de 90 dias contra qualquer defeito operacional oculto, de acordo com o CDC. A garantia vai discriminada expressamente na Nota Fiscal.'
  },
  {
    id: 'f4',
    question: 'Posso retirar a peça diretamente na loja física em Belo Horizonte?',
    answer: 'Sim, você é muito bem-vindo! Localizamo-nos na Rua João Lúcio Brandão, 191, no bairro Prado em Belo Horizonte - MG. Você pode fechar o orçamento no WhatsApp e vir retirar pessoalmente, fazendo a inspeção visual na hora.'
  },
  {
    id: 'f5',
    question: 'Vocês enviam para outras cidades ou estados?',
    answer: 'Sim, realizamos envios diários para todo o Brasil através de transportadoras parceiras e Correios. Solicitamos o seu CEP no WhatsApp para cotar a tarifa com os melhores prazos e descontos logísticos.'
  },
  {
    id: 'f6',
    question: 'Vocês possuem qualquer modelo de peça automotiva em estoque?',
    answer: 'Nosso estoque próprio é um dos maiores de Belo Horizonte, contando com milhares de peças catalogadas. No entanto, por transparência e compliance comercial, não afirmamos ter todas as peças existentes no mercado. Incentivamos que nos envie os dados do seu veículo (ano, modelo, motorização) no WhatsApp para que façamos a consulta imediata da disponibilidade em nosso sistema.'
  }
];
