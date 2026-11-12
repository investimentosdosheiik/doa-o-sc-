import React from 'react';
import { Target, Heart, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoalTrackerProps {
  currentAmount: number;
  targetAmount: number;
  donorCount: number;
  onOpenDonate: (amount?: number) => void;
}

const RECENT_DONATIONS = [
  { name: 'Doador Anônimo', city: 'Florianópolis / SC', value: 15, time: 'há 1 minuto' },
  { name: 'Ana Paula M.', city: 'Joinville / SC', value: 25, time: 'há 3 minutos' },
  { name: 'Família Silveira', city: 'Chapecó / SC', value: 50, time: 'há 7 minutos' },
  { name: 'Lucas R.', city: 'Blumenau / SC', value: 10, time: 'há 12 minutos' },
  { name: 'Morador Solidário', city: 'Curitiba / PR', value: 100, time: 'há 18 minutos' },
];

export const GoalTracker: React.FC<GoalTrackerProps> = ({
  currentAmount,
  targetAmount,
  donorCount,
  onOpenDonate,
}) => {
  const percentage = Math.min(100, Math.round((currentAmount / targetAmount) * 100));

  return (
    <section className="bg-[#0b101c] border-b border-slate-800 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 sm:p-7 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-1">
                <Target className="h-4 w-4" />
                <span>META COLETIVA DE SOCORRO IMEDIATO</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                R$ {currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}{' '}
                <span className="text-sm sm:text-base font-normal text-slate-400">
                  arrecadados da meta de R$ {targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-left sm:text-right">
                <p className="text-2xl font-black text-amber-400 font-mono tabular-nums">{percentage}%</p>
                <p className="text-xs text-slate-400">{donorCount.toLocaleString('pt-BR')} doações registradas</p>
              </div>
              <button
                onClick={() => onOpenDonate(10)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-red-500 transition-colors cursor-pointer shadow-md active:scale-[0.98]"
              >
                <Heart className="h-4 w-4 fill-white/20" />
                <span>Doar a partir de R$ 10</span>
              </button>
            </div>
          </div>

          {/* Simple, clean Progress Bar (No AI glow) */}
          <div className="mt-5">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-red-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>R$ {currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              <span className="text-red-400 font-semibold">{percentage}% da meta alcançada</span>
              <span>R$ {targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Live Recent Donors Ticker */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2.5">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>DOAÇÕES RECENTES RECEBIDAS VIA PIX</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {RECENT_DONATIONS.map((donor, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5 text-xs"
                >
                  <p className="font-semibold text-slate-200 truncate">{donor.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{donor.city}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-400">
                      R$ {donor.value.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500">{donor.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Prestação de contas diária com notas fiscais das compras locais.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
