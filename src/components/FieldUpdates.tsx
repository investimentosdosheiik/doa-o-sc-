import React from 'react';
import { Clock, FileText, CheckCircle2, MapPin, Truck, HeartHandshake } from 'lucide-react';

const UPDATES = [
  {
    time: 'Hoje às 15:10',
    title: 'Entrega de 140 Lonas e Cordas em Taió',
    location: 'Comunidades Ribeirinhas / Taió',
    content: 'Com as doações arrecadadas nas últimas 12 horas, compramos e distribuímos 140 lonas impermeáveis de 8x6 metros diretamente aos moradores com casas destelhadas.',
    badge: 'Socorro Imediato',
    invoice: 'NF-e 048.912 · Fornecedor Local de Lonas',
  },
  {
    time: 'Hoje às 10:45',
    title: 'Carregamento de 200 Cestas Básicas e Água Mineral',
    location: 'Centro de Distribuição / Chapecó',
    content: 'Todas as cestas foram montadas com produtos alimentícios de primeira necessidade comprados no comércio atacadista da própria região atingida, sem custos de intermediação.',
    badge: 'Alimentação & Água',
    invoice: 'NF-e 048.905 · Atacadão Regional',
  },
  {
    time: 'Ontem às 20:30',
    title: 'Acolhimento de 28 Famílias em Abrigo Temporário',
    location: 'Ginásio Municipal / Rio do Sul',
    content: 'Distribuição de colchonetes impermeáveis, cobertores térmicos e kits de higiene pessoal (fraldas, sabonetes e escovas de dente) para crianças e idosos desalojados.',
    badge: 'Abrigo & Conforto',
    invoice: 'NF-e 048.891 · Distribuidora Hospitalar SC',
  },
  {
    time: 'Ontem às 14:00',
    title: 'Triagem e Priorização em Parceria com a Defesa Civil',
    location: 'Posto de Comando Avançado / Blumenau',
    content: 'Mapeamento georreferenciado das residências com risco crítico de desmoronamento e envio de barcos para levar medicamentos a famílias isoladas.',
    badge: 'Logística & Resgate',
    invoice: 'Relatório Oficial de Triagem #04',
  },
];

export const FieldUpdates: React.FC = () => {
  return (
    <section id="atualizacoes" className="py-16 sm:py-24 bg-[#070b14] border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
              <Clock className="h-4 w-4" />
              <span>Diário de Campo & Prestação de Contas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Atualizações em Tempo Real das Equipes
            </h2>
            <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
              Acompanhe cada etapa do trabalho dos voluntários nas ruas. Todas as compras possuem notas fiscais públicas e são fiscalizadas por lideranças comunitárias.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-xs text-slate-300">
            <HeartHandshake className="h-5 w-5 text-red-500 shrink-0" />
            <span>Voluntários em ação em 14 municípios simultaneamente</span>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-4">
          {UPDATES.map((item, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-900"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-2.5 py-1 rounded-md">
                    {item.time}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    {item.location}
                  </span>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>{item.invoice}</span>
                </div>
              </div>

              <h3 className="mt-3 text-lg font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
