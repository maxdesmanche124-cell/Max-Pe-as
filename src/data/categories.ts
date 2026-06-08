import { PartCategory, Differential, Review, FAQItem } from '../types';

export const CATEGORIES: PartCategory[] = [
  {
    id: 'motores',
    name: 'Motores',
    description: 'Motores usados e seminovos conforme disponibilidade. Consulte compatibilidade com nossa equipe.',
    iconName: 'Fuel',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'MOT'
  },
  {
    id: 'cabecotes',
    name: 'Cabeçotes',
    description: 'Cabeçotes seminovos de motores nacionais e importados, conferidos e inspecionados para consulta.',
    iconName: 'Cpu',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'CAB'
  },
  {
    id: 'cambios',
    name: 'Câmbios',
    description: 'Câmbios manuais, automáticos e componentes relacionados. Atendimento para orçamento.',
    iconName: 'Settings',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'CAM'
  },
  {
    id: 'portas',
    name: 'Portas',
    description: 'Portas originais usadas conforme disponibilidade técnica de estoque.',
    iconName: 'Square',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'POR'
  },
  {
    id: 'capos',
    name: 'Capôs',
    description: 'Capôs usados e seminovos para reposição compatível sob consulta.',
    iconName: 'FolderOpen',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'CAP'
  },
  {
    id: 'parachoques',
    name: 'Para-choques',
    description: 'Para-choques prontos para adequação e montagem conforme estoque.',
    iconName: 'Maximize',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'PAR'
  },
  {
    id: 'bancos',
    name: 'Bancos',
    description: 'Bancos em tecido ou couro, sob consulta de conservação e modelos em estoque.',
    iconName: 'Armchair',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'BAN'
  },
  {
    id: 'rodas',
    name: 'Rodas',
    description: 'Jogos de rodas e unidades avulsas usados sob consulta de disponibilidade.',
    iconName: 'Disc',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1505682631551-a0668d22e5a1?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'ROD'
  },
  {
    id: 'farois',
    name: 'Faróis',
    description: 'Faróis e componentes de iluminação conforme estoque disponível.',
    iconName: 'Sun',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'FAR'
  },
  {
    id: 'lanternas',
    name: 'Lanternas',
    description: 'Lanternas traseiras e componentes sobressalentes para identificação.',
    iconName: 'Lightbulb',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1625217527288-93919c996509?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'LAN'
  },
  {
    id: 'suspensao',
    name: 'Suspensão',
    description: 'Quadros de suspension, amortecedores, balanças e mangas de eixo usados e seminovos.',
    iconName: 'Activity',
    popularVehicles: ['Nacionais', 'Importados', 'Multimarcas', 'Sob consulta'],
    imageUrl: 'https://images.unsplash.com/photo-1562620658-963b65287349?auto=format&fit=crop&q=80&w=400',
    categoryCode: 'SUS'
  },
  {
    id: 'pecas-eletricas',
    name: 'Peças Elétricas e Eletrônicas',
    description: 'Módulos e centrais eletrônicas conforme disponibilidade. Confirme aplicação antes da compra e consulte nossa equipe.',
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
    description: 'Peças com origem comprovada e procedência informada de frotas comerciais desativadas.',
    iconName: 'SearchCode'
  },
  {
    id: 'd2',
    title: 'Nota Fiscal Eletrônica',
    description: 'Nossas vendas acompanham Nota Fiscal Eletrônica (NF-e) nos termos da legislação aplicável.',
    iconName: 'FileText'
  },
  {
    id: 'd3',
    title: 'Garantia e Atendimento',
    description: 'Todas as peças acompanham garantia de funcionamento conforme condições informadas antes de fechar a sua compra.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'd4',
    title: 'Atendimento Especializado',
    description: 'Nossa equipe possui amplo conhecimento técnico e prático para auxiliar você a tirar dúvidas exatas e conferir a peça correta.',
    iconName: 'UserCheck'
  },
  {
    id: 'd5',
    title: 'Tradição Desde 1995',
    description: 'Tradição com atuação sólida em Belo Horizonte, sendo referência em atendimento de confiança no Prado.',
    iconName: 'Calendar'
  },
  {
    id: 'd6',
    title: 'Estoque Organizacional',
    description: 'Galpão próprio estruturado para triagem e catalogação protegida de itens para consulta.',
    iconName: 'Layers'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Roberto Mendonça',
    role: 'Proprietário de Oficina Mecânica (AutoCenter Prado)',
    rating: 5,
    comment: 'Compro peças com a MAX PEÇAS há mais de 10 anos. A procedência das autopeças usadas é informada de forma correta, a nota fiscal vem sempre certa para faturamento e os clientes saem satisfeitos.',
    avatarLetter: 'R',
    date: 'Há 1 semana'
  },
  {
    id: 'r2',
    name: 'Juliana Vasconcellos',
    role: 'Proprietária de T-Cross 2021',
    rating: 5,
    comment: 'Precisei de um capô e farol compatíveis para reposição. Comprei com eles seminovos excelentes, com nota fiscal e compatibilidade perfeita. Atendimento no WhatsApp nota 10!',
    avatarLetter: 'J',
    date: 'Há 2 semanas'
  },
  {
    id: 'r3',
    name: 'Mário Funilaria BH',
    role: 'Empresário e Funileiro',
    rating: 5,
    comment: 'Peças de lataria originais e usadas. O preço é muito justo, com frete rápido e garantia operacional de funcionamento.',
    avatarLetter: 'M',
    date: 'Há 3 semanas'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'As peças vendidas possuem procedência lícita de frotas desativadas?',
    answer: 'Sim! Toda e qualquer peça disponível em nosso estoque é oriunda de veículos adquiridos junto a companhias de frotas desativadas ou empresas parceiras, possuindo nota fiscal de origem correspondente. Prezamos pela conformidade jurídica de nossa empresa.'
  },
  {
    id: 'f2',
    question: 'Vocês emitem Nota Fiscal (NF-e)?',
    answer: 'Sim. Nossas peças novas ou seminovas são comercializadas obrigatoriamente acompanhadas de Nota Fiscal de emissão eletrônica no nome do comprador (Pessoa Física ou Jurídica) conforme legislação aplicável.'
  },
  {
    id: 'f3',
    question: 'Como funciona a garantia das peças?',
    answer: 'Todos os nossos produtos gozam de garantia legal de 90 dias contra defeitos funcionais ocultos, em estrita conformidade com o Código de Defesa do Consumidor brasileiro, conforme condições informadas antes de finalizar o atendimento.'
  },
  {
    id: 'f4',
    question: 'Posso retirar a peça diretamente na loja física em Belo Horizonte?',
    answer: 'Sim, você é muito bem-vindo! Estamos localizados na Rua João Lúcio Brandão, 191, no bairro Prado em Belo Horizonte - MG. Você pode fazer a cotação no WhatsApp e vir retirar pessoalmente, fazendo a conferência do item na hora.'
  },
  {
    id: 'f5',
    question: 'Vocês enviam para outras cidades ou estados?',
    answer: 'Sim, realizamos envios em parceria com transportadoras adequadas. Solicitamos o seu CEP no WhatsApp para que nossos consultores consultem as tarifas e prazos logísticos.'
  },
  {
    id: 'f6',
    question: 'Vocês possuem qualquer modelo de peça automotiva em estoque?',
    answer: 'Nosso estoque no galpão é amplo e organizado. No entanto, por transparência e compliance, não garantimos a disponibilidade permanente de todos os itens. Incentivamos que nos envie os dados do seu veículo (modelo, ano de fabricação, motorização) para que nossos atendentes façam a consulta imediata no sistema.'
  }
];
