import React, { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, ShieldCheck, Heart, AlertCircle } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationAmount: number;
  onDonationSuccess: (amount: number) => void;
}

const MODAL_AMOUNTS = [10, 25, 50, 100];

export const PixModal: React.FC<PixModalProps> = ({
  isOpen,
  onClose,
  donationAmount,
  onDonationSuccess,
}) => {
  const [currentAmount, setCurrentAmount] = useState<number>(donationAmount);
  const [customValue, setCustomValue] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentAmount(donationAmount >= 10 ? donationAmount : 10);
    setIsCustom(false);
    setCustomValue('');
  }, [donationAmount, isOpen]);

  if (!isOpen) return null;

  const pixKey = 'socorro.sc@scempe.org.br';
  const effectiveAmount = isCustom ? (Number(customValue) || 10) : currentAmount;
  const pixPayload = `00020126580014br.gov.bcb.pix0136socorro.sc@scempe.org.br520400005303986540${effectiveAmount.toFixed(2)}5802BR5916SC EM PE AJUDA6012FLORIANOPOLI62070503***6304`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const handleConfirmDonation = () => {
    setHasConfirmed(true);
    setTimeout(() => {
      onDonationSuccess(effectiveAmount >= 10 ? effectiveAmount : 10);
      onClose();
      setHasConfirmed(false);
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-7 shadow-2xl text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Doação via PIX</h3>
            <p className="text-xs text-slate-400">Qualquer valor a partir de R$ 10 é repassado sem taxas</p>
          </div>
        </div>

        {/* Value selector chips */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Alterar valor da doação:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {MODAL_AMOUNTS.map((amt) => {
              const isSelected = !isCustom && currentAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setCurrentAmount(amt);
                    setIsCustom(false);
                  }}
                  className={`py-1.5 text-center rounded-lg text-xs font-bold font-mono transition-colors ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  R$ {amt}
                </button>
              );
            })}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-slate-400">Ou digite:</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                R$
              </span>
              <input
                type="number"
                min="10"
                placeholder="Ex: 15, 30, 80 (mín. R$ 10)"
                value={customValue}
                onChange={(e) => {
                  setCustomValue(e.target.value);
                  setIsCustom(true);
                }}
                className={`w-full rounded-md border py-1 pl-8 pr-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none ${
                  isCustom ? 'border-red-500 bg-slate-950' : 'border-slate-800 bg-slate-950/60'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Selected Amount Card */}
        <div className="mt-3.5 rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-center">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Valor a Transferir</p>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono mt-0.5">
            R$ {effectiveAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* QR Code */}
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-4 text-slate-900 shadow-inner">
          <svg
            className="h-36 w-36 sm:h-40 sm:w-40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Corners */}
            <rect x="5" y="5" width="26" height="26" rx="3" fill="#0f172a" />
            <rect x="9" y="9" width="18" height="18" rx="1.5" fill="white" />
            <rect x="13" y="13" width="10" height="10" rx="1" fill="#0f172a" />

            <rect x="69" y="5" width="26" height="26" rx="3" fill="#0f172a" />
            <rect x="73" y="9" width="18" height="18" rx="1.5" fill="white" />
            <rect x="77" y="13" width="10" height="10" rx="1" fill="#0f172a" />

            <rect x="5" y="69" width="26" height="26" rx="3" fill="#0f172a" />
            <rect x="9" y="73" width="18" height="18" rx="1.5" fill="white" />
            <rect x="13" y="77" width="10" height="10" rx="1" fill="#0f172a" />

            {/* Matrix Data Points */}
            <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="14" width="6" height="6" fill="#0f172a" />
            <rect x="56" y="8" width="6" height="6" fill="#0f172a" />
            <rect x="36" y="24" width="6" height="6" fill="#0f172a" />
            <rect x="48" y="26" width="6" height="6" fill="#0f172a" />

            <rect x="8" y="38" width="6" height="6" fill="#0f172a" />
            <rect x="18" y="44" width="6" height="6" fill="#0f172a" />
            <rect x="28" y="38" width="6" height="6" fill="#0f172a" />

            {/* PIX Center Emblem */}
            <rect x="40" y="40" width="20" height="20" rx="4" fill="#dc2626" />
            <path
              d="M46 50L49 53L54 47"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <rect x="68" y="38" width="6" height="6" fill="#0f172a" />
            <rect x="78" y="44" width="6" height="6" fill="#0f172a" />
            <rect x="86" y="52" width="6" height="6" fill="#0f172a" />

            <rect x="38" y="68" width="6" height="6" fill="#0f172a" />
            <rect x="48" y="74" width="6" height="6" fill="#0f172a" />
            <rect x="68" y="68" width="6" height="6" fill="#0f172a" />
            <rect x="78" y="78" width="6" height="6" fill="#0f172a" />
            <rect x="86" y="86" width="6" height="6" fill="#0f172a" />
            <rect x="58" y="86" width="6" height="6" fill="#0f172a" />
          </svg>
          <span className="mt-1.5 text-[11px] font-bold text-slate-800 uppercase tracking-wide">
            Aponte a câmera do aplicativo do seu banco
          </span>
        </div>

        {/* Copy Key & Payload Options */}
        <div className="mt-4 space-y-2.5">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Chave PIX (E-mail):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={pixKey}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none"
              />
              <button
                onClick={handleCopyKey}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
              >
                {copiedKey ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedKey ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Código PIX Copia e Cola:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={pixPayload}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-400 truncate focus:outline-none"
              />
              <button
                onClick={handleCopyPayload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-500 transition-colors shrink-0 cursor-pointer"
              >
                {copiedPayload ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPayload ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bank & Audit Details */}
        <div className="mt-3.5 rounded-lg bg-slate-950/60 p-2.5 border border-slate-800 text-[11px] text-slate-400">
          <p><strong className="text-slate-300">Favorecido:</strong> Fundo Comunitário SC em Pé de Apoio Emergencial</p>
          <p><strong className="text-slate-300">Banco:</strong> Banco do Brasil · CNPJ: 83.421.902/0001-44</p>
        </div>

        {/* Confirmation Button */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2.5 justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>Sem taxas · 100% repassado</span>
          </div>

          <button
            onClick={handleConfirmDonation}
            disabled={hasConfirmed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-md disabled:opacity-75"
          >
            {hasConfirmed ? (
              <>
                <Check className="h-4 w-4 animate-bounce" />
                <span>Registrando... Muito Obrigado!</span>
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 fill-white/20" />
                <span>Já Fiz a Transferência</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
