import React, { useState } from 'react';
import { Heart, HeartHandshake, Share2, Check } from 'lucide-react';

interface TopBarProps {
  onOpenDonate: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenDonate }) => {
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'SOS Santa Catarina - Ajuda Urgente e Reconstrução',
      text: 'Famílias inteiras estão desabrigadas pelas enchentes e tornados em Santa Catarina. Veja as fotos e ajude com qualquer valor a partir de R$ 10 via PIX direto:',
      url: window.location.href,
    };

    // 1. Try native Web Share API (mobile devices, WhatsApp, Telegram, etc.)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return; // User closed share sheet
      }
    }

    // 2. Fallback to direct WhatsApp Web / App share
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareData.text}\n${shareData.url}`
    )}`;

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // 3. Fallback: Copy link to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url);
        setHasCopiedLink(true);
        setTimeout(() => setHasCopiedLink(false), 2500);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-8 sm:px-6 lg:px-8">
        {/* Compact brand keeps the header from overflowing on narrow screens. */}
        <a
          href="#topo"
          className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap text-base font-bold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/30 bg-red-600/20 text-red-500">
            <HeartHandshake className="h-4.5 w-4.5" />
          </span>
          <span className="font-extrabold tracking-tight">
            SOS <span className="text-red-500">SC</span>
            <span className="hidden text-red-500 sm:inline">Santa Catarina</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <a href="#crise" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">A Crise</a>
          <a href="#galeria" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">Galeria Fotográfica</a>
          <a href="#impacto" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">Calculadora de Impacto</a>
          <a href="#atualizacoes" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">Atualizações</a>
          <a href="#faq" className="shrink-0 whitespace-nowrap transition-colors hover:text-white">Transparência &amp; FAQ</a>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={handleShare}
            aria-label={hasCopiedLink ? 'Link copiado' : 'Compartilhar no WhatsApp ou com amigos'}
            className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:border-emerald-500/50 hover:bg-slate-700 sm:px-3 sm:text-sm"
            title="Compartilhar no WhatsApp ou com amigos"
          >
            {hasCopiedLink ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="hidden sm:inline">Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-emerald-400 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Compartilhar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenDonate}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-500 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Heart className="h-4 w-4 shrink-0 fill-white/20 transition-transform group-hover:scale-110" />
            <span>Doar via PIX</span>
          </button>
        </div>
      </div>
    </header>
  );
};
