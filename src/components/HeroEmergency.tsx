import React, { useState } from 'react';
import { Heart, QrCode, ShieldCheck, Camera, Maximize2, MapPin } from 'lucide-react';
import { DISASTER_PHOTOS, DisasterPhoto } from '../data/photos';

interface HeroEmergencyProps {
  onOpenDonate: (amount?: number) => void;
  onExploreGallery: () => void;
  onOpenPhoto: (photo: DisasterPhoto) => void;
}

const QUICK_AMOUNTS = [10, 25, 50, 100];

// 4 high-impact highlight photos for the hero showcase in requested order
const HERO_PHOTOS = [
  {
    ...DISASTER_PHOTOS[1], // Moradora nos Escombros
    label: '🏚️ Famílias sem Teto',
  },
  {
    ...DISASTER_PHOTOS[4], // Bairro Destruído Tornado
    label: '🌪️ Casas Destelhadas (Oeste)',
  },
  {
    ...DISASTER_PHOTOS[0], // Rio do Sul Centro Submerso
    label: '🌊 Cidade Alagada (Rio do Sul)',
  },
  {
    ...DISASTER_PHOTOS[2], // Cratera Rodovia BR-470
    label: '🚧 Rodovia Cedida (BR-470)',
  },
];

export const HeroEmergency: React.FC<HeroEmergencyProps> = ({
  onOpenDonate,
  onExploreGallery,
  onOpenPhoto,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customValue, setCustomValue] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const activeHeroPhoto = HERO_PHOTOS[selectedPhotoIndex];
  const effectiveAmount = isCustom ? (Number(customValue) || 10) : selectedAmount;

  const getImpactDescription = (amount: number) => {
    if (amount <= 15) return 'Garante 2 galões de água mineral tratada (10L) para quem está sem abastecimento.';
    if (amount <= 30) return 'Garante 1 marmita reforçada quente e kit higiene com sabonete e pasta.';
    if (amount <= 60) return 'Garante 1 lona impermeável grande (8x6m) para cobrir o telhado arrancado.';
    if (amount <= 120) return 'Garante 1 cesta básica completa com 14kg de mantimentos essenciais para 1 semana.';
    return `Ajuda com R$ ${amount.toFixed(2)} na compra direta de lonas, medicamentos e água no comércio local.`;
  };

  return (
    <section id="topo" className="relative bg-[#090e18] border-b border-slate-800 text-slate-100 pt-4 pb-12 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency Status Bar */}
        <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-500/30 px-3.5 py-2 text-xs text-red-200 mb-5">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="font-bold tracking-wide">SOS SANTA CATARINA:</span>
          <span>Situação de emergência em mais de 130 municípios por cheias e tornados</span>
        </div>

        {/* 1. VISUAL IMPACT HERO PHOTO SHOWCASE (Immediately visible on mobile & desktop) */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
          <div
            onClick={() => onOpenPhoto(activeHeroPhoto)}
            className="relative h-60 sm:h-80 md:h-96 lg:h-[420px] w-full overflow-hidden cursor-pointer group bg-slate-950"
          >
            <img
              src={activeHeroPhoto.src}
              alt={activeHeroPhoto.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Bottom Scrim for crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

            {/* Top Right: Expand Prompt */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-medium text-slate-200 border border-white/10 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">Ampliar foto</span>
              </span>
            </div>

            {/* Bottom Caption & Location on the Photo */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 mb-1">
                <MapPin className="h-4 w-4 shrink-0 text-red-500" />
                <span>{activeHeroPhoto.location}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {activeHeroPhoto.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl line-clamp-2 leading-relaxed">
                {activeHeroPhoto.caption}
              </p>
            </div>
          </div>

          {/* Quick Photo Switcher Tabs underneath the Impact Photo */}
          <div className="bg-slate-950/90 border-t border-slate-800 p-2 sm:p-2.5 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-2 shrink-0 hidden md:inline">
              Ver outras áreas:
            </span>
            {HERO_PHOTOS.map((item, idx) => {
              const isSelected = selectedPhotoIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Appeal & Fast PIX Card Section */}
        <div id="crise" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Context, Need & Trust */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Famílias inteiras perderam tudo em Santa Catarina.
              <span className="block mt-1 text-red-400">
                Sua ajuda a partir de R$ 10 chega ainda hoje.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Tornados arrastaram telhados em minutos no Oeste e os rios inundaram dezenas de cidades no Vale do Itajaí. Mais de 30 mil pessoas estão desabrigadas precisando de água limpa, lonas impermeáveis e refeições quentes.
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <p>
                  <strong>Sem intermediários:</strong> O dinheiro arrecadado é transferido para compras diretas no comércio dos próprios municípios afetados.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <p>
                  <strong>Transparência total:</strong> Todas as notas fiscais das compras (lonas, água, cestas) são divulgadas diariamente.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Camera className="h-4 w-4 text-red-400" />
                <span>Ver galeria de fotos ↓</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct, Instant PIX Box starting at R$ 10 */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    <span>Faça uma Doação PIX</span>
                  </h3>
                  <p className="text-xs text-slate-400">Qualquer valor ajuda · A partir de R$ 10</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Repasse Direto
                </span>
              </div>

              {/* Quick Amount Selector */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Escolha quanto deseja doar:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {QUICK_AMOUNTS.map((amt) => {
                    const isSelected = !isCustom && selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setIsCustom(false);
                        }}
                        className={`py-2 px-1 text-center rounded-lg text-sm font-bold font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        R$ {amt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount starting from R$ 10 */}
                <div className="mt-2.5">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                      R$
                    </span>
                    <input
                      type="number"
                      min="10"
                      placeholder="Outro valor (mínimo R$ 10)"
                      value={customValue}
                      onChange={(e) => {
                        setCustomValue(e.target.value);
                        setIsCustom(true);
                      }}
                      className={`w-full rounded-lg border py-2 pl-9 pr-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none ${
                        isCustom ? 'border-red-500 bg-slate-950' : 'border-slate-800 bg-slate-950/70'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Impact Statement */}
              <div className="mt-3.5 rounded-lg bg-slate-950/80 p-3 border border-slate-800/80">
                <p className="text-xs text-slate-300">
                  <strong className="text-white font-mono">R$ {effectiveAmount.toFixed(2)}</strong>: {getImpactDescription(effectiveAmount)}
                </p>
              </div>

              {/* Action Button: Open QR Code Modal */}
              <div className="mt-5">
                <button
                  onClick={() => onOpenDonate(effectiveAmount >= 10 ? effectiveAmount : 10)}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-red-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <QrCode className="h-5 w-5" />
                  <span>Pagar via PIX (R$ {effectiveAmount >= 10 ? effectiveAmount.toFixed(2) : '10.00'})</span>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Auditoria diária · Prestação de contas aberta</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
