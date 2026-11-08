import React from 'react';
import { Heart, ShieldAlert } from 'lucide-react';

interface TopBarProps {
  onOpenDonate: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenDonate }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <a
          href="#topo"
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
            <ShieldAlert className="h-4 w-4" />
          </span>
          <span className="font-extrabold tracking-tight">
            SC em <span className="text-red-500">Pé</span>
          </span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#crise"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            A Crise
          </a>
          <a
            href="#galeria"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Galeria Fotográfica
          </a>
          <a
            href="#impacto"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Calculadora de Impacto
          </a>
          <a
            href="#atualizacoes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Atualizações
          </a>
          <a
            href="#faq"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Transparência & FAQ
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDonate}
            className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-500 hover:shadow-red-500/30 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Heart className="h-4 w-4 fill-white/20 transition-transform group-hover:scale-110" />
            <span>Doar via PIX</span>
          </button>
        </div>
      </div>
    </header>
  );
};
