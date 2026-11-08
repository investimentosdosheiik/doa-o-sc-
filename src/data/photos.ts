export interface DisasterPhoto {
  id: string;
  title: string;
  location: string;
  category: 'floods' | 'tornadoes' | 'landslides' | 'rescue';
  categoryLabel: string;
  src: string;
  caption: string;
  impactTag: string;
  featured?: boolean;
}

export const DISASTER_PHOTOS: DisasterPhoto[] = [
  {
    id: 'rio-sul-centro-cheia',
    title: 'Centro Urbano Submerso',
    location: 'Rio do Sul / Vale do Itajaí',
    category: 'floods',
    categoryLabel: 'Inundações Urbanas',
    src: '/assets/aistudio/keWrcCCYcuSKU_gFMSLCfufc1y5zwjx3HQVtA-06mSr5H1A_mjFDSpT_Mlo41lM5J-STLyEXPf_hHu2cMm9BvPLnMhHrEYnz4mrAibWtesLJFjHsPHRRiGiDoy6F4DnxAZONJMAi0IeuYpB_NhFI-spPE1g8Io6Mgv7BgdzcGIWUzXXxSvVXIetM_12263bff.jfif',
    caption: 'Cheia histórica invade primeiro pavimento de edifícios residenciais e paralisa o comércio central. Barcos são o único meio de acesso para salvamento.',
    impactTag: 'Bairros Alagados',
    featured: true
  },
  {
    id: 'familia-perdas-tornado',
    title: 'A Dor e a Esperança de Recomeçar',
    location: 'Xanxerê / Oeste Catarinense',
    category: 'rescue',
    categoryLabel: 'Famílias & Resgate',
    src: '/assets/aistudio/77DYlVs5lw4r6Y5pN_eZWASg-7lVj69YQlcz0sx97abTZLO4qrZG4ek2KEpf36U9CJmmsSXeayb4x6VOFF1QhIz4djc3oWnanGhtkCktsB6dmE1Xwe_9HI28vTT65xb1OcgMVMK5UcMpX0B58oozPx0ZWe3ks7axnTllyqoORG9VQfBN6kKV5Sjs_037249fd.jfif',
    caption: 'Moradora examina o local onde ficava sua residência, destruída em segundos por ventos violentos. Móveis, colchões e memórias espalhados pelo chão.',
    impactTag: 'Perda Total de Moradia',
    featured: true
  },
  {
    id: 'cratera-rodovia-veiculo',
    title: 'Cratera Colossal em Rodovia',
    location: 'BR-470 / Alto Vale do Itajaí',
    category: 'landslides',
    categoryLabel: 'Deslizamentos & Vias',
    src: '/assets/aistudio/jqW-ZLW_JLLsFJJOqrjumih2Ae1xM2C5dPBLlMccOJpEWIpd6khS5rnVJsozQJWNtqiaHTjJoUpLZHhFavqaNkVeNwN53HTOsCNlKloLGb79WdrZBvmzD2gHyvVDN3DARU8RXDaW6dz8zct-irx4jE61De6x70DRGXZYDu0aesE4yT66zrsOfsjz_1e9ca332.jfif',
    caption: 'Colapso total da pista após erosão fluvial violenta. Veículo arrastado para a ravina ao lado da correnteza. Abastecimento regional severamente bloqueado.',
    impactTag: 'Pista Totalmente Cedida',
    featured: true
  },
  {
    id: 'ponte-rio-itajai',
    title: 'Correnteza Extrema no Rio Itajaí-Açu',
    location: 'Blumenau / Margem Central',
    category: 'floods',
    categoryLabel: 'Inundações Urbanas',
    src: '/assets/aistudio/vYC_KqB3xQvlBfgLrpUdjENVOHHNx22QavDbizYvDSmCWguDHnJ_cfqTKx2FgQtvrbhoGRZH8tPtS-EdnYuV6zpR11LlHtwzHUCCoTozEToe9m9zl7LHaGkoiz8pgo5dnVIfiM1xl70gayTzjuKTIkAaXSre2TfvBPxT4argnvJubgY5qxYBsDpQ_da168d7c.jfif',
    caption: 'Fluxo volumoso e veloz ameaça pontes históricas e alaga as principais artérias viárias da cidade, deixando milhares de habitantes sem energia e água tratada.',
    impactTag: 'Alerta Vermelho de Vazão',
    featured: true
  },
  {
    id: 'bairro-destruido-zenital',
    title: 'Linha de Destruição do Tornado',
    location: 'Ponte Serrada / Oeste de SC',
    category: 'tornadoes',
    categoryLabel: 'Tornados & Ventanias',
    src: '/assets/aistudio/yxWu-Boh7a6H4zv43K5urzOn-K9AQSPYtjFgXonrRplcFbnqC6hLfrVxDSgrHTC0k-2ThoCVpcQtJPyJDNGqg5hNnYBLbzWRCPBL6LXxLFLcIwNPdMiEvbF66MUBEqTnNSdtQgU0wW5dHcA1dJ0nI7pxN8qlh3a4NWwLtjQn07WgbiUvRUw9OaFm_f2249adc.jfif',
    caption: 'Visão aérea impressionante demonstrando dezenas de residências com coberturas e telhas de zinco completamente arrancadas. Moradores recorrem a lonas plásticas.',
    impactTag: 'Ventos > 140 km/h',
    featured: true
  },
  {
    id: 'rua-comercial-alagada',
    title: 'Transporte Coletivo e Comércios Ilhados',
    location: 'Taió / Região das Barragens',
    category: 'floods',
    categoryLabel: 'Inundações Urbanas',
    src: '/assets/aistudio/CgztfiNPL3X-oRZtz6FTZ27i4kuYuLXY5ujlN-VrSm59fSoG6SUNaj8qW827PLRyuT_HEXbuh-M2OoqiVDmd4l0_FxSiItXoaKNkAncIXO2zwRcdKiuhRt_hX6un1aQ2SGr1dl3jkpdnebwYN8gRKXJxwh-yMCJIBt8CRKfxgqkTHQXYAi1oF9Hs_9a74c56b.jfif',
    caption: 'Ônibus escolares e carros de entrega paralisados nas avenidas tomadas por água barrenta. Necessidade crítica de água potável e alimentos prontos para consumo.',
    impactTag: 'Comércio 100% Inativo',
    featured: false
  },
  {
    id: 'avalanche-lama-residencial',
    title: 'Deslizamento Invade Ruas e Casas',
    location: 'Tubarão / Região Sul',
    category: 'landslides',
    categoryLabel: 'Deslizamentos & Vias',
    src: '/assets/aistudio/h6XVhTpqyPiVS4lrQCVRWw-0HN8TF3sVBkdBux2kBIEd3s8HdiOaImMjCEmg-ZADiaXdgU_VWwFSSRHF1vQ7lgpReHeIr_nOVS2d3rYIcZ-xXse8JZJkqPbRld6RrJG74Wt_9osAm3-s5ryh4RLre3pb-eeBuYGmXWauaHgra6Lf8WuEqT9Pq22J_163ed4d4.jfif',
    caption: 'Solo saturado por semanas ininterruptas de precipitação desaba de morro vizinho, cobrindo portões, garagens e deixando pedestres sem rota de escape segura.',
    impactTag: 'Risco Geológico Extremo',
    featured: false
  },
  {
    id: 'industria-telhado-arrancado',
    title: 'Galpões Industriais Retorcidos',
    location: 'Chapecó / Distrito Industrial',
    category: 'tornadoes',
    categoryLabel: 'Tornados & Ventanias',
    src: '/assets/aistudio/lbiT53eFDykJriQJ9LUjc1l6Pu9ltKHcfEvbucsexlFDpTekfQDPvCbaTXteyWvpjhB5tQO9r8f2c2sl4KFfcXxWD9dbF8cfOY6gZTw-NN_Jd4zuFUvTl6_1GyOkYle_7ySdVtOIVGvQ-EyL7VbtJESq4AkxUzQVxKQooT3p-E1x0xQ7IE6RGq04_900f3111.jfif',
    caption: 'Vigas metálicas reforçadas e folhas de aço galvanizado foram arremessadas a centenas de metros. Postos de trabalho destruídos exigirão meses de reconstrução.',
    impactTag: 'Impacto Estrutural Severo',
    featured: false
  },
  {
    id: 'corredor-devastacao-rua',
    title: 'O Rastro Direto da Tempestade',
    location: 'Campos Novos / Meio-Oeste',
    category: 'tornadoes',
    categoryLabel: 'Tornados & Ventanias',
    src: '/assets/aistudio/VcDblyDOucvrYplskuA0dSfZ8AGa64_RvdhxV3jnTdeeWRzEofe3l7nBydikk-QpwQzTWioZILu3xvGPeYb0pGHJuj-bPGHtfoBx1ZJtsJqYNPEr7eYmt80aMnghnMS7WU1LliIYwHdjrrBy_Xr3Rh0hfAulW2QkaAcrW35KE5TWYKmUUPOCDYc1_26272c36.jfif',
    caption: 'Fotografia perpendicular demonstrando a linha exata percorrida pelo vórtice: casas no lado direito foram pulverizadas enquanto estruturas vizinhas sofreram danos severos.',
    impactTag: 'Microexplosão Atmosférica',
    featured: false
  },
  {
    id: 'moradores-telhado-reparo',
    title: 'Mutirão Comunitário de Proteção',
    location: 'Ibirama / Alto Vale',
    category: 'rescue',
    categoryLabel: 'Famílias & Resgate',
    src: '/assets/aistudio/PEVRRhcYaAGSVM925yeWDsqdYOKU9BYGOlb_2TUAI8MjJRmY0SN0KWVPAPMwlRx27-i3dH8RTuJlE1vLz_46IrdD9KVoZkhMcsvYAEV3vY63i7zITYsZLrxN8VwN1cYzMnr2OzAMC8XSWwJMS0mHQPTDbmIUx8H8HrVPL0Dt7d_IG4Y0YrWFItLK_4f5d5f7a.jfif',
    caption: 'Vizinhos se unem sobre a laje de concreto para estender lonas impermeáveis e evitar que as chuvas subsequentes danifiquem o que restou no interior das casas.',
    impactTag: 'Solidariedade em Ação',
    featured: false
  },
  {
    id: 'aeroporto-estacionamento-danos',
    title: 'Colapso de Antenas e Veículos',
    location: 'Região Oeste / Aeroporto Regional',
    category: 'tornadoes',
    categoryLabel: 'Tornados & Ventanias',
    src: '/assets/aistudio/q1qAbzNlcXyMQ1z5nMwPIPVU5SyR9-bLoZt9swFLWuaGVtcgNZY6hZdlWtrqvF2gHULd5N3NHhXqM-WQsGzv0TmZ6OeClBNmejadhVD-r_A8Ik38IjQxf9_ZAbN8X1zzmpDzjuiePBbb7-6dI8LUkDZ8XrZT8GArl4YE7mkRLCst34Ntlmk9H5VA_e7f26b88.jfif',
    caption: 'Torres estruturais de telecomunicações dobradas ao meio e coberturas de estacionamento caídas sobre dezenas de veículos de moradores e socorristas.',
    impactTag: 'Comunicações Afetadas',
    featured: false
  },
  {
    id: 'encosta-rodovia-rio',
    title: 'Desmoronamento Massivo de Encosta',
    location: 'Serra do Mar / Trecho Sul SC',
    category: 'landslides',
    categoryLabel: 'Deslizamentos & Vias',
    src: '/assets/aistudio/TS_g6ElqJcRA6wGATT5D630PWOK4JZcb7wzkVRTwpu6MWvzRPtL0ZyZJsCEGRf0Jzg8iWb_shbmtf8Y2MBvxIgVvQSHp4gwCPTOu--mDurbx5HKSGCjsWpAVVi5QuymArc1KmA08xkOczvEFqzGm5e41D8TV6SV4nDhFbsYqRfbc7MkS6-j4YKL2_24783155.jfif',
    caption: 'Toneladas de terra, rochas e vegetação deslizaram morro abaixo, arrebentando o asfalto e caindo no leito do rio. Obras de contenção demandarão apoio emergencial contínuo.',
    impactTag: 'Ruptura Geológica Grave',
    featured: false
  },
  {
    id: 'vista-geral-bacias-alagadas',
    title: 'Panorama Geral da Cheia',
    location: 'Bacia Hidrográfica do Itajaí',
    category: 'floods',
    categoryLabel: 'Inundações Urbanas',
    src: '/assets/aistudio/6QCiI17S93WbkUfj7nggcJCvAShM0_RHM5F8owKYBmjQYLUCkjbwYSOuX5A4xUIVozra8iMPJ07Rale6pUUdXn-zQrtkF6Vj3YcSrZjtsI9E9c1AzhApv0qbqTCJWyXmBlct4vBE7jRXWpu3N1KbtAHLmq1f38ENngXxclpar7EuejTuDjryPshV_d5c8065f.jfif',
    caption: 'Registro panorâmico exibindo a extensão sem precedentes do transbordamento dos afluentes, transformando bairros inteiros em extensos espelhos de água barrenta.',
    impactTag: 'Mais de 40 Bairros Ilhados',
    featured: false
  },
  {
    id: 'destruicao-comercial-recuperacao',
    title: 'Escombros e Início da Desobstrução',
    location: 'Maravilha / Extremo Oeste',
    category: 'rescue',
    categoryLabel: 'Famílias & Resgate',
    src: '/assets/aistudio/PxzyTyJnu_zHAfiFla7wgdGQPwG65x9CXBhhzgHFxYWpy2Ugtx4ynIAjNUrL0_QSjBoEYUgo1UOYUfx1XTR16vL_OZ5AQX3Y_P1TEFryrEbgvE-KnUoq3muUoMGLYHTrZpjzaKYXgQL1LA0CPD1WKWHNaC01_9bNOw8R4EYUao7IJNNoACE7BA4W_fd152b52.jfif',
    caption: 'Equipes comunitárias e voluntários iniciam a remoção de entulhos e ferros retorcidos para liberar passagens essenciais e garantir acesso a remédios e mantimentos.',
    impactTag: 'Esforço de Limpeza e Apoio',
    featured: false
  },
  {
    id: 'placas-metalicas-retorcidas',
    title: 'Fúria dos Ventos sobre a Engenharia',
    location: 'Trevo de Acesso / BR-282',
    category: 'tornadoes',
    categoryLabel: 'Tornados & Ventanias',
    src: '/assets/aistudio/3qPAoQLvbGQHyNK1Hjwi0dWhHyrRRlgfZZPRkvjG5kX50MtSWo__YQTyirlOkkxUq9VtrL78oDr2MLlWS8EjOot0uxug5ucx9tJbE6ffWE9e0EVAsnyMPi_tuHL3aqzW9QWRyzCvq9HcuyosGyVfqjKSsbET_K0ZYqRUe0WWY3Utl7tAcGoKmCBz_bccfd3d8.jfif',
    caption: 'Painéis publicitários de grande porte e estruturas de aço maciço vergados até o solo, evidenciando a intensidade avassaladora dos ventos que atingiram o estado.',
    impactTag: 'Estruturas de Aço Dobradas',
    featured: false
  }
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'Todas as Fotos', count: 15 },
  { id: 'floods', label: 'Inundações Urbanas', count: 4 },
  { id: 'tornadoes', label: 'Tornados & Ventanias', count: 5 },
  { id: 'landslides', label: 'Deslizamentos & Vias', count: 3 },
  { id: 'rescue', label: 'Famílias & Resgate', count: 3 },
] as const;
