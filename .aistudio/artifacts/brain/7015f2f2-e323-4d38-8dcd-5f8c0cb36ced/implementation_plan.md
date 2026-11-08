# SC em Pé: Ajuda Urgente para Santa Catarina (Portal Humanitário de Emergência)

Uma plataforma humanitária e campanha de socorro emergencial para as vítimas das enchentes, deslizamentos e tornados em Santa Catarina, apresentando curadoria fotográfica de alto impacto, galeria categorizada com transições suaves em CSS, modal lightbox imersivo, simulador interativo de doação PIX com QR Code dinâmico, calculadora de impacto e mural de transparência ao vivo.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões Confirmadas pelo Usuário (Fase 1):**
> 1. **Organização da Galeria**: Galeria categorizada por abas temáticas interativas (*Todas*, *Inundações & Enchentes*, *Tornados & Ventanias*, *Deslizamentos & Estruturas*, *Comunidade & Resgate*) com transições suaves e modal lightbox completo com navegação por teclado e miniaturas.
> 2. **Sistema de Doação**: Simulação interativa e funcional de PIX com geração de QR Code, chave copia-e-cola imediata com feedback tátil de cópia, seleção de cotas com calculadora de impacto em tempo real e barra de meta comunitária.
> 3. **Identidade Visual**: Tema escuro de emergência humanitária (*dark emergency relief*), utilizando tons de ardósia profunda e obsidiana (`#0a0f1d`), combinados com vermelho de urgência humanitária (`#dc2626`), toques de alerta âmbar (`#f59e0b`) e tipografia de alta legibilidade.

---

## 1. Overview & Core Concept

- **O que a aplicação faz**:
  Transforma a página estática simples em um portal moderno, comovente e de alta conversão solidária. Apresenta a magnitude real da tragédia em Santa Catarina com 15 fotografias reais categorizadas, animações fluidas de entrada e foco, demonstrativo transparente de onde cada real é investido (lonas, água potável, cestas básicas, resgate), acompanhamento de metas em tempo real e canal de prestação de contas.
- **Público-alvo**:
  Doadores de todo o Brasil e do exterior, voluntários, empresas parceiras, veículos de imprensa e familiares que buscam informações confiáveis e canal direto para apoiar as vítimas em Santa Catarina.
- **Proposta de Valor**:
  Sensibilização através da verdade visual e remoção de qualquer atrito para doar via PIX, transmitindo credibilidade absoluta através de prestação de contas minuciosa e design profissional de nível internacional.

---

## 2. User Experience & Visual Design

### A. Fluxo de Navegação do Usuário
1. **Hero de Emergência**:
   - Título impactante com tipografia forte e equilibrada (`text-wrap: balance`).
   - Alerta humanitário sutil com status oficial de situação de emergência.
   - Chamada de ação primária destacada (*Fazer Doação PIX*) e secundária (*Ver Galeria da Crise*).
   - Métricas humanitárias resumidas (cidades atingidas, famílias acolhidas, meta arrecadada).
2. **Barra de Progresso da Meta Solidária**:
   - Barra animada com percentual atingido, valor arrecadado e meta de reconstrução inicial.
3. **Galeria da Crise (Curadoria Fotográfica Categorizada)**:
   - Filtros de categoria suaves (*Todas*, *Inundações Urbanas*, *Tornados & Ventanias*, *Deslizamentos & Vias*, *Abrigos & Famílias*).
   - Grade assimétrica com hover suave (efeito zoom sutil, vinheta cinematográfica e metadados contextuais).
   - Modal Lightbox expandido com controles anterior/próximo, atalho de teclado (Esc/Setas), contagem e legenda detalhada.
4. **Calculadora Interativa de Impacto Solidário & PIX**:
   - Seleção de cotas pré-definidas (R$ 25, R$ 50, R$ 100, R$ 250, R$ 500) e valor personalizado.
   - Conversão instantânea: cálculo dinâmico do que a doação compra (litros de água, lonas impermeáveis de 8x6m, cestas básicas de 14kg, kits dormitório).
   - Modal/Painel PIX com QR Code renderizado, chave oficial copia-e-cola com 1 clique e botão de confirmação.
5. **Mural de Atualizações das Equipes em Campo**:
   - Linha do tempo com relatos cronológicos das últimas ações em Blumenau, Rio do Sul, Chapecó e Tubarão.
6. **Perguntas Frequentes & Transparência**:
   - Acordeom expansível sem recarga, detalhando compra no comércio local, auditoria de notas fiscais e canais oficiais.
7. **Rodapé Institucional**:
   - Identificação do projeto, contatos para imprensa e voluntariado, termos de transparência e nota de solidariedade.

### B. Sistema de Design & Paleta de Cores
- **60% Fundo Neutro Profundo**: `#070b14` (fundo principal) e `#0f172a` (superfícies e cartões de mídia).
- **30% Estrutura & Bordas Sutis**: `#1e293b` (divisórias finas de 1px) e `#94a3b8` / `#cbd5e1` (texto de apoio e títulos).
- **10% Acentos de Urgência**: `#dc2626` / `#ef4444` (vermelho emergência para CTAs e âncoras principais) e `#f59e0b` (âmbar para avisos humanitários).
- **Tipografia**:
  - Títulos: *Plus Jakarta Sans* / *Outfit* com peso 700 e `tracking-tight`.
  - Corpo de texto: *Plus Jakarta Sans* / *DM Sans* com altura de linha 1.6 para leitura confortável.
  - Dados & Valores: *Tabular numbers* (`font-mono tabular-nums`) para métricas financeiras e cronômetros.

---

## 3. Curadoria e Separação das Melhores Fotos

As 15 fotografias fornecidas retratam dimensões complementares da tragédia catarinense e foram estruturadas em 4 categorias estratégicas:

| Categoria | Descrição | Fotos Selecionadas |
| :--- | :--- | :--- |
| **Inundações Urbanas** | Cheia dos rios, áreas centrais submersas e vias bloqueadas por água | • Drone do centro urbano sob cheia histórica (`keWrcCCY...`)<br>• Rio Itajaí-Açu em cota de alerta máximo junto à ponte (`vYC_KqB...`)<br>• Bairros e comércios inundados com transporte ilhado (`CgztfiNP...`)<br>• Vista aérea geral de vale e cidade inundada (`6QCiI17...`) |
| **Tornados & Ventanias** | Impacto destrutivo de microexplosões e tornados no Oeste de SC | • Bairro residencial devastado com telhados arrancados (`yxWu-Boh...`)<br>• Galpão industrial com estrutura metálica retorcida (`lbiT53eF...`)<br>• Pátio aeroportuário e antenas colapsadas (`q1qAbzN...`)<br>• Vista zenital da linha de passagem do tornado (`VcDblyDO...`)<br>• Outdoor e placas gigantes retorcidas pelo vento (`3qPAoQL...`) |
| **Deslizamentos & Rodovias** | Quedas de encostas e destruição da malha viária | • Cratera aberta em rodovia com veículo tombado no precipício (`jqW-ZLW...`)<br>• Encosta deslizada arrastando mata e asfalto até o rio (`TS_g6El...`)<br>• Enxurrada de lama descendo por rua residencial (`h6XVhTpq...`) |
| **Famílias & Resgate** | O fator humano, escombros e a urgência de reconstrução | • Moradora entre os escombros da casa destruída apontando perdas (`77DYlVs...`)<br>• Família sobre a laje avaliando telhado desfeito (`PEVRRhc...`)<br>• Vista aérea de comércios destruídos e reconstrução iniciada (`PxzyTyJn...`) |

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App.tsx (Root Container)                        │
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ TopBar: Brand "SC em Pé", links de navegação, botão doar primário  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ HeroEmergency: Headline de urgência, métricas de impacto, CTAs     │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ GoalTracker: Meta arrecadada, progresso visual, doadores recentes  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ PhotoGallery: Abas de filtro, grid com hover suave, lightbox modal │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ ImpactCalculator & PixModal: Cotas dinâmicas, chave copia-e-cola   │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ LiveFieldUpdates: Linha do tempo de socorro e prestação de contas  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ FAQAccordion: Perguntas sobre logística e transparência            │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Footer: Direitos, contato oficial da Defesa Civil, termos          │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

- **Gerenciamento de Estado**:
  - `selectedCategory`: filtro atual da galeria com animações de transição sem layout jump.
  - `activePhoto`: foto aberta no lightbox modal (índice, zoom, teclado).
  - `donationAmount`: cota selecionada no simulador de doação com cálculo de itens entregues.
  - `isPixModalOpen`: modal com QR code gerado via canvas/SVG limpo e chave copia-e-cola com status temporário de "Chave copiada!".
  - `copied`: feedback visual instantâneo ao copiar chave PIX.
- **Transições CSS & Animações**:
  - Utilização de `transition-all duration-300 ease-out` e transforms leves (`scale-[1.02]`, `opacity`, `translateY`).
  - Suporte total a `prefers-reduced-motion`.

---

## 5. Execution Steps Once Approved

1. Atualizar `index.html` com metatags humanitárias, tipografia aprimorada e título oficial.
2. Atualizar `metadata.json` com nome e descrição descritiva da aplicação de emergência de SC.
3. Configurar módulo de dados fotográficos com caminhos locais das 15 imagens, títulos, legendas e categorias.
4. Desenvolver componentes modulares em `src/App.tsx` e subcomponentes com design de alto nível.
5. Executar `compile_applet` e `lint_applet` para garantir compilação sem falhas e integridade de tipos.
