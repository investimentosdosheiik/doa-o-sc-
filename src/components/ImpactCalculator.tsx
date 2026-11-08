import React, { useState } from 'react';
import { ShieldCheck, Heart, Package, Droplets, Home, ChevronRight, AlertCircle } from 'lucide-react';

interface ImpactCalculatorProps {
  onDonate: (amount: number) => void;
}

const PRESET_TIERS = [
  {
    amount: 10,
    title: 'Água Potável Emergencial (10 Litros)',
    description: 'Dois fardos de água mineral tratada para famílias que tiveram a rede pública cortada.',
    items: ['2 Galões / Fardos de água mineral', 'Entrega direta em abrigos comunitários'],
    popular: false,
  },
  {
    amount: 25,
    title: 'Marmita Quente & Kit Higiene',
    description: 'Uma refeição completa balanceada e produtos de higiene (sabonete, pasta e escova).',
    items: ['1 Marmita reforçada para jantar ou almoço', 'Kit com itens básicos de asseio pessoal'],
    popular: false,
  },
  {
    amount: 50,
    title: '1 Lona Impermeável Grossa (8x6m)',
    description: 'Item de emergência absoluta para cobrir casas sem telhado e proteger o interior das chuvas.',
    items: ['1 Lona de alta resistência 8x6m', 'Cordas para fixação nas vigas'],
    popular: true,
  },
  {
    amount: 100,
    title: '1 Cesta Básica Completa (14kg)',
    description: 'Alimento de qualidade para sustentar uma família de 4 pessoas durante uma semana.',
    items: ['Arroz, feijão, óleo, macarrão, leite', 'Enlatados nutritivos e café'],
    popular: false,
  },
  {
    amount: 200,
    title: 'Kit Dormitório & Cobertor Térmico',
    description: 'Colchonete impermeável lavável e cobertores para quem perdeu a cama com a lama.',
    items: ['1 Colchonete hospitalar higienizável', '2 Cobertores térmicos de microfibra'],
    popular: false,
  },
];

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({ onDonate }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const parsedCustom = Number(customInput) || 0;
  const activeAmount = isCustom ? parsedCustom : selectedAmount;
  const isBelowMinimum = isCustom && parsedCustom > 0 && parsedCustom < 10;

  const calculatedWater = Math.max(1, Math.floor(activeAmount / 5));
  const calculatedMeals = Math.floor(activeAmount / 25);
  const calculatedTarps = Math.floor(activeAmount / 50);
  const calculatedBaskets = Math.floor(activeAmount / 100);

  const handleSelectPreset = (val: number) => {
    setSelectedAmount(val);
    setIsCustom(false);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomInput(val);
    setIsCustom(true);
  };

  const handleConfirm = () => {
    const finalAmount = activeAmount >= 10 ? activeAmount : 10;
    onDonate(finalAmount);
  };

  return (
    <section id="impacto" className="py-16 sm:py-20 bg-[#0c121e] border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Prestação de Contas & Destino dos Valores</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Veja exatamente o que sua doação compra
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            Nenhuma doação é pequena demais. Com valores a partir de R$ 10, compramos no atacado das cidades atingidas e entregamos nos bairros isolados.
          </p>
        </div>

        {/* Preset Cards Grid (Starting at R$ 10!) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRESET_TIERS.map((tier) => {
            const isSelected = !isCustom && selectedAmount === tier.amount;
            return (
              <div
                key={tier.amount}
                onClick={() => handleSelectPreset(tier.amount)}
                className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-red-500 bg-slate-900 shadow-lg ring-1 ring-red-500'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Mais Necessário
                  </div>
                )}

                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-white font-mono">
                      R$ {tier.amount}
                    </span>
                    <span className="text-[11px] text-slate-400">cota solidária</span>
                  </div>

                  <h3 className="mt-2.5 text-sm font-bold text-slate-200 leading-snug">
                    {tier.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="mt-3.5 space-y-1 border-t border-slate-800/80 pt-3 text-[11px] text-slate-300">
                    {tier.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPreset(tier.amount);
                    onDonate(tier.amount);
                  }}
                  className={`mt-4 w-full rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white hover:bg-red-500'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Doar R$ {tier.amount}
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Amount Selector Box (Starting at R$ 10) */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/90 p-5 sm:p-7 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <label className="block text-sm font-bold text-white mb-1.5">
                Você prefere escolher outro valor?
              </label>
              <p className="text-xs text-slate-400 mb-3">
                Digite qualquer quantia a partir de R$ 10:
              </p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-slate-400">
                  R$
                </span>
                <input
                  type="text"
                  placeholder="Ex: 15, 30, 75, 150..."
                  value={customInput}
                  onChange={handleCustomChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-11 pr-4 text-sm font-mono font-bold text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              {isBelowMinimum && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>O valor mínimo para doação é R$ 10,00.</span>
                </div>
              )}
            </div>

            {/* Dynamic Items Counter */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-center">
                <div className="flex items-center justify-center text-blue-400 mb-1">
                  <Droplets className="h-4 w-4" />
                </div>
                <p className="text-lg font-black text-white font-mono tabular-nums">
                  {calculatedWater > 0 ? `${calculatedWater * 5}L` : '—'}
                </p>
                <p className="text-[11px] text-slate-400">Água Potável</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-center">
                <div className="flex items-center justify-center text-amber-400 mb-1">
                  <Package className="h-4 w-4" />
                </div>
                <p className="text-lg font-black text-white font-mono tabular-nums">
                  {calculatedMeals > 0 ? `${calculatedMeals}x` : '—'}
                </p>
                <p className="text-[11px] text-slate-400">Marmitas Quentes</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-center">
                <div className="flex items-center justify-center text-red-400 mb-1">
                  <Home className="h-4 w-4" />
                </div>
                <p className="text-lg font-black text-white font-mono tabular-nums">
                  {calculatedTarps > 0 ? `${calculatedTarps}x` : '—'}
                </p>
                <p className="text-[11px] text-slate-400">Lonas Impermeáveis</p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-center">
                <div className="flex items-center justify-center text-emerald-400 mb-1">
                  <Package className="h-4 w-4" />
                </div>
                <p className="text-lg font-black text-white font-mono tabular-nums">
                  {calculatedBaskets > 0 ? `${calculatedBaskets}x` : '—'}
                </p>
                <p className="text-[11px] text-slate-400">Cestas Básicas</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400">
              Valor selecionado:{' '}
              <strong className="text-white font-mono font-bold">
                R$ {(activeAmount >= 10 ? activeAmount : 10).toFixed(2)}
              </strong>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-red-500 transition-colors cursor-pointer active:scale-[0.98]"
            >
              <Heart className="h-4 w-4 fill-white/20" />
              <span>
                Doar R$ {(activeAmount >= 10 ? activeAmount : 10).toFixed(2)} via PIX Agora
              </span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
