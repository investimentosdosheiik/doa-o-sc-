import React from 'react';
import { ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#05080f] py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
              <ShieldAlert className="h-4 w-4" />
            </span>
            <span className="text-base font-extrabold text-white">
              SC em <span className="text-red-500">Pé</span>
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">Socorro Emergencial Santa Catarina</span>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <a href="#crise" className="hover:text-white transition-colors">
              A Crise
            </a>
            <a href="#galeria" className="hover:text-white transition-colors">
              Galeria
            </a>
            <a href="#impacto" className="hover:text-white transition-colors">
              Calculadora
            </a>
            <a href="#atualizacoes" className="hover:text-white transition-colors">
              Diário de Campo
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              Prestação de Contas
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p>
              <strong>Coordenação:</strong> Movimento Solidário Independente SC em Pé em cooperação com comissões paroquiais e comunitárias.
            </p>
            <p className="text-[11px] text-slate-400">
              CNPJ Gestor: 83.421.902/0001-44 · Fundo de Apoio às Vítimas de Calamidades Naturais de Santa Catarina.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Desenvolvido com</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>para o povo guerreiro catarinense.</span>
          </div>
        </div>

        <div className="mt-4 text-[11px] text-slate-400 leading-normal">
          Para emergências imediatas de resgate por barco ou risco iminente de desmoronamento, acione sempre o Corpo de Bombeiros Militar (<strong>193</strong>) ou a Defesa Civil Estadual (<strong>199</strong>).
        </div>
      </div>
    </footer>
  );
};
