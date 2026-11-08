import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, ShieldCheck, Camera, ArrowDown, MapPin } from 'lucide-react';

interface HeroEmergencyProps {
  onOpenDonate: (amount?: number) => void;
  onExploreGallery: () => void;
}

const QUICK_AMOUNTS = [10, 25, 50, 100];

export const HeroEmergency: React.FC<HeroEmergencyProps> = ({
  onOpenDonate,
  onExploreGallery,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customValue, setCustomValue] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const pixKey = 'socorro.sc@scempe.org.br';

  const effectiveAmount = isCustom ? (Number(customValue) || 10) : selectedAmount;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const getImpactDescription = (amount: number) => {
    if (amount <= 15) return 'Garante 2 galões de água mineral tratada (10L) para quem está sem abastecimento.';
    if (amount <= 30) return 'Garante 1 marmita reforçada quente e kit higiene com sabonete e pasta.';
    if (amount <= 60) return 'Garante 1 lona impermeável grande (8x6m) para cobrir o telhado arrancado.';
    if (amount <= 120) return 'Garante 1 cesta básica completa com 14kg de mantimentos essenciais para 1 semana.';
    return `Ajuda com R$ ${amount.toFixed(2)} na compra direta de lonas, medicamentos e água no comércio local.`;
  };

  return (
    <section id="topo" className="relative bg-[#0c121e] border-b border-slate-800 text-slate-100 pt-8 pb-14 sm:pb-20">
      {/* Background with real Santa Catarina flood photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/6QCiI17S93WbkUfj7nggcJCvAShM0_RHM5F8owKYBmjQYLUCkjbwYSOuX5A4xUIVozra8iMPJ07Rale6pUUdXn-zQrtkF6Vj3YcSrZjtsI9E9c1AzhApv0qbqTCJWyXmBlct4vBE7jRXWpu3N1KbtAHLmq1f38ENngXxclpar7EuejTuDjryPshV_d5c8065f.jfif"
          alt="Inundação em Santa Catarina"
          className="h-full w-full object-cover opacity-20 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/90 to-[#0c121e]/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Urgent Bulletin Notice */}
        <div className="inline-flex items-center gap-2 rounded-md bg-red-600/20 border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>SOS SANTA CATARINA · Campanha Solidária para as Vítimas das Chuvas e Ventanias</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Human Story & Appeal */}
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Famílias inteiras perderam tudo em Santa Catarina.
              <span className="block mt-1 text-red-400">
                Sua ajuda a partir de R$ 10 chega ainda hoje.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Tornados arrastaram telhados em segundos no Oeste e os rios inundaram dezenas de cidades no Vale do Itajaí. Mais de 30 mil pessoas estão fora de casa precisando de água limpa, lonas para não molhar o que restou e comida quente.
            </p>

            <p className="text-sm text-slate-400">
              Não cobramos taxa de intermediação. O dinheiro é usado no comércio das próprias cidades atingidas para abastecer os abrigos de imediato.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Camera className="h-4 w-4 text-red-400" />
                <span>Ver as 15 fotos reais da tragédia</span>
                <ArrowDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Blumenau, Rio do Sul, Taió, Chapecó e região</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct, Instant PIX Box (No AI Slop, pure function) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    <span>Faça um PIX Solidário</span>
                  </h2>
                  <p className="text-xs text-slate-400">Qualquer valor ajuda muito · A partir de R$ 10</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  Repasse Direto
                </span>
              </div>

              {/* Fast Value Selector (Starts at R$ 10!) */}
              <div className="mt-5">
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Escolha um valor:
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
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                        R$
                      </span>
                      <input
                        type="number"
                        min="10"
                        placeholder="Outro valor (mín. R$ 10)"
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
                  {isCustom && Number(customValue) > 0 && Number(customValue) < 10 && (
                    <p className="mt-1 text-[11px] text-amber-400">
                      O valor mínimo é de R$ 10,00 para cobrir taxas de processamento bancário.
                    </p>
                  )}
                </div>
              </div>

              {/* Real impact statement for chosen amount */}
              <div className="mt-4 rounded-lg bg-slate-950/80 p-3 border border-slate-800/80">
                <p className="text-xs text-slate-300">
                  <strong className="text-white font-mono">R$ {effectiveAmount.toFixed(2)}</strong>: {getImpactDescription(effectiveAmount)}
                </p>
              </div>

              {/* Instant PIX Key with Copy Button */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Chave PIX (E-mail oficial da campanha):
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 overflow-hidden rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 truncate">
                    {pixKey}
                  </div>
                  <button
                    onClick={handleCopyKey}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    <span>{copiedKey ? 'Copiada!' : 'Copiar Chave'}</span>
                  </button>
                </div>
              </div>

              {/* Big Action: Open QR Code Modal */}
              <div className="mt-5">
                <button
                  onClick={() => onOpenDonate(effectiveAmount >= 10 ? effectiveAmount : 10)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 px-4 text-sm font-bold text-white shadow-lg hover:bg-red-500 transition-colors cursor-pointer active:scale-[0.98]"
                >
                  <QrCode className="h-4 w-4" />
                  <span>Gerar QR Code PIX (R$ {effectiveAmount >= 10 ? effectiveAmount.toFixed(2) : '10.00'})</span>
                </button>
              </div>

              {/* Trust statement */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Auditoria pública diária · Notas fiscais abertas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
