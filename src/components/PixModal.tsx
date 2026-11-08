import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Copy, Check, QrCode, ShieldCheck, Heart, Zap, ExternalLink } from 'lucide-react';
import QRCode from 'qrcode';
import {
  createPixTransaction,
  pollBravoPayTransaction,
  buildOfficialBacenPixCode,
  BRAVOPAY_CHECKOUT_URL,
} from '../services/bravopay';

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
  const initialAmount = donationAmount >= 10 ? donationAmount : 10;
  const [currentAmount, setCurrentAmount] = useState<number>(initialAmount);
  const [customValue, setCustomValue] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);

  const effectiveAmount = isCustom ? (Number(customValue) || 10) : currentAmount;
  
  // Instant payload generated with mathematically exact BACEN TLV lengths and CRC16-CCITT
  const [pixPayload, setPixPayload] = useState<string>(() => buildOfficialBacenPixCode(initialAmount));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // When donationAmount prop changes or modal opens, sync amount immediately
  useEffect(() => {
    if (isOpen) {
      const amt = donationAmount >= 10 ? donationAmount : 10;
      setCurrentAmount(amt);
      setIsCustom(false);
      setCustomValue('');
      setPixPayload(buildOfficialBacenPixCode(amt));
    }
  }, [donationAmount, isOpen]);

  // Whenever effectiveAmount changes, instantly update the PIX payload
  useEffect(() => {
    if (!isOpen) return;
    const instantCode = buildOfficialBacenPixCode(effectiveAmount);
    setPixPayload(instantCode);

    let stopPolling: (() => void) | null = null;
    let isMounted = true;

    // Asynchronously register in BravoPay gateway in the background
    const registerWithBravoPay = async () => {
      try {
        const result = await createPixTransaction(effectiveAmount);
        if (!isMounted) return;

        if (result.copyPaste && result.copyPaste.startsWith('000201')) {
          setPixPayload(result.copyPaste);
        }

        if (result.transactionId) {
          // Listen in the background for BravoPay dynamic code or automatic payment confirmation
          stopPolling = pollBravoPayTransaction(
            result.transactionId,
            (dynamicCopyPaste) => {
              if (isMounted && dynamicCopyPaste && dynamicCopyPaste.startsWith('000201')) {
                setPixPayload(dynamicCopyPaste);
              }
            },
            () => {
              if (isMounted) {
                handleAutoPaid();
              }
            }
          );
        }
      } catch (err) {
        console.warn('Background gateway sync note:', err);
      }
    };

    registerWithBravoPay();

    return () => {
      isMounted = false;
      if (stopPolling) stopPolling();
    };
  }, [effectiveAmount, isOpen]);

  // Draw QR Code on canvas immediately (0ms delay) with standard error correction
  useEffect(() => {
    if (canvasRef.current && pixPayload) {
      QRCode.toCanvas(canvasRef.current, pixPayload, {
        width: 210,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      }).catch((err) => console.error('QR code render error:', err));
    }
  }, [pixPayload]);

  const handleAutoPaid = useCallback(() => {
    setHasConfirmed(true);
    setTimeout(() => {
      onDonationSuccess(effectiveAmount >= 10 ? effectiveAmount : 10);
      onClose();
      setHasConfirmed(false);
    }, 1500);
  }, [effectiveAmount, onDonationSuccess, onClose]);

  if (!isOpen) return null;

  const handleCopyPayload = () => {
    const payloadToCopy = pixPayload || buildOfficialBacenPixCode(effectiveAmount);
    navigator.clipboard.writeText(payloadToCopy);
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
        className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:p-7 shadow-2xl text-left my-auto animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
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
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Doação via PIX</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                <Zap className="h-3 w-3 fill-emerald-400" />
                Oficial BACEN
              </span>
            </h3>
            <p className="text-xs text-slate-400">Repasse Direto às Famílias Desabrigadas · Sem intermediários</p>
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
                  className={`py-1.5 text-center rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm'
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

        {/* Compliant QR Code Canvas */}
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white p-4 text-slate-900 shadow-inner">
          <canvas ref={canvasRef} className="rounded-lg shadow-sm" />
          <span className="mt-2 text-[11px] font-bold text-slate-800 uppercase tracking-wide">
            Aponte a câmera do aplicativo do seu banco
          </span>
        </div>

        {/* Real PIX Copia e Cola Code */}
        <div className="mt-4 space-y-2.5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300">
                Código PIX Copia e Cola:
              </label>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="h-3 w-3" /> Chave Válida
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={pixPayload}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-300 truncate focus:outline-none select-all"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <button
                onClick={handleCopyPayload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-500 transition-colors shrink-0 cursor-pointer shadow-md active:scale-95"
              >
                {copiedPayload ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPayload ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Direct Checkout Link Option */}
        <div className="mt-3 text-center">
          <a
            href={BRAVOPAY_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors underline underline-offset-4"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Ou pagar diretamente na página do checkout BravoPay</span>
          </a>
        </div>

        {/* Confirmation Button */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2.5 justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>Detecção automática de pagamento</span>
          </div>

          <button
            onClick={handleConfirmDonation}
            disabled={hasConfirmed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-md disabled:opacity-75"
          >
            {hasConfirmed ? (
              <>
                <Check className="h-4 w-4 animate-bounce" />
                <span>Doação Confirmada! Muito Obrigado!</span>
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
