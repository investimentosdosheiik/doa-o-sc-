import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Mail, Phone } from 'lucide-react';

const FAQS = [
  {
    question: 'Por que a campanha prioriza doações em dinheiro via PIX?',
    answer: 'Porque a malha rodoviária do Alto Vale e trechos da BR-470 estão danificados e os centros de triagem de roupas estão saturados de doações inadequadas. O recurso em dinheiro permite comprar exatamente o que falta (como lonas de medidas específicas, medicamentos de uso contínuo, água e comida) no comércio da própria região afetada, sem custo de frete interestadual e injetando recursos vitais na combalida economia local.',
  },
  {
    question: 'Como posso auditar e verificar as notas fiscais das compras?',
    answer: 'Todas as notas fiscais emitidas pelos estabelecimentos parceiros são digitalizadas e arquivadas em nosso relatório público semanal de transparência. Qualquer cidadão ou empresa doadora pode solicitar os comprovantes fiscais e borderôs bancários pelo nosso e-mail ou WhatsApp de prestação de contas.',
  },
  {
    question: 'Quem coordena e executa a entrega para as famílias?',
    answer: 'As entregas são organizadas por uma comissão conjunta de lideranças comunitárias de bairros atingidos, igrejas locais e equipes da Defesa Civil dos municípios. As famílias cadastradas são visitadas presencialmente por assistentes sociais voluntários para certificar a gravidade da perda habitacional.',
  },
  {
    question: 'Consigo recibo de doação para minha empresa (Pessoa Jurídica)?',
    answer: 'Sim! Para doações corporativas ou emissão de termo de doação filantrópica com recibo nominal ao CNPJ, basta enviar o comprovante de transferência PIX para nosso canal administrativo oficial com os dados cadastrais da empresa.',
  },
  {
    question: 'Quero atuar como voluntário no terreno ou na triagem. O que fazer?',
    answer: 'Temos bases de acolhimento ativas em Blumenau, Rio do Sul, Chapecó e Tubarão. Entre em contato pelo canal de voluntariado para saber os turnos necessários para distribuição de marmitas quentes e colocação de lonas.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#0a0f1d] border-b border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes & Transparência
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Respostas claras sobre a gestão das doações, logística no estado e comprovação fiscal.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-red-400 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support contacts */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Canal Direto de Transparência</p>
              <p className="text-slate-400">Atendimento a doadores, voluntários e imprensa</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:transparencia@scempe.org.br"
              className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 hover:underline"
            >
              <Mail className="h-4 w-4" />
              <span>transparencia@scempe.org.br</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
