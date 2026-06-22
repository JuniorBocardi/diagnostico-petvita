import React, { useRef } from 'react';
import { Button, Card, cn } from '../ui';
import { DiagnosticState } from '../../types';
import { Download, MessageCircle, AlertCircle, CheckCircle2, ChevronRight, Leaf } from 'lucide-react';

interface Props {
  state: DiagnosticState;
}

const CircularProgress = ({ value, label }: { value: number; label: string }) => {
  const percentage = (value / 5) * 100;
  const strokeDasharray = `${(percentage * 125.6) / 100} 125.6`; // 2 * pi * r (r=20) = 125.6
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14 mb-2">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" className="stroke-olive-100" strokeWidth="4" fill="none" />
          <circle 
            cx="25" cy="25" r="20" 
            className="stroke-gold-400 transition-all duration-1000 ease-out" 
            strokeWidth="4" fill="none" 
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-olive-800">{value}</span>
        </div>
      </div>
      <span className="text-[10px] text-olive-600 font-medium text-center leading-tight uppercase max-w-[60px]">{label}</span>
    </div>
  );
};

export function ResultStep({ state }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  
  const { petData, intensity } = state;
  const totalScore = intensity.coceira + intensity.lambedura + intensity.pele + intensity.fezes + intensity.energia;
  
  const article = petData.gender === 'Fêmea' ? 'da' : 'do';
  const shortArticle = petData.gender === 'Fêmea' ? 'a' : 'o';
  const nameDisplay = petData.name ? ` ${article} ${petData.name}` : ' do seu pet';
  const targetName = petData.name ? `${shortArticle} ${petData.name}` : 'o seu pet';

  let scoreClass = "Crítico";
  if (totalScore >= 6) scoreClass = "Crítico";
  if (totalScore >= 11) scoreClass = "Severo";
  if (totalScore >= 16) scoreClass = "Extremo";
  if (totalScore >= 21) scoreClass = "Péssimo";

  const analysisText = `Os sinais informados indicam que a saúde${nameDisplay} exige intervenção imediata. O desconforto relatado reflete um desequilíbrio crítico. Os próximos passos são fundamentais: siga rigorosamente o plano personalizado.`;

  const handleDownloadPDF = () => {
    window.print();
  };

  const whatsappText = `Acabei de finalizar o diagnóstico${nameDisplay}! O score deu: *${scoreClass}* (${totalScore}).`;
  const whatsappUrl = `https://wa.me/5512982423509?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="flex flex-col min-h-0 bg-beige-100 -mx-6 px-6 pt-2 pb-10">
      
      {/* Scrollable Document Area */}
      <div 
        ref={printRef} 
        className="bg-white rounded-2xl sm:shadow-lg sm:border sm:border-olive-100 p-6 sm:p-8 mb-6 mt-2 relative overflow-hidden print-bg-white"
        style={{ minHeight: '800px' }}
      >
        {/* Decorative corner */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-olive-50 rounded-bl-full -z-0 opacity-50" />

        <div className="relative z-10">
          {/* Document Header */}
          <div className="text-center mb-6 border-b border-olive-100 pb-6 flex flex-col items-center">
            <img 
              src="/img/logo.png" 
              alt="Instituto PetVita" 
              className="h-16 object-contain mb-4"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <h1 className="font-serif text-3xl text-olive-800 mb-1">Resultado da Avaliação</h1>
            <p className="text-sm font-medium tracking-widest text-gold-500 uppercase">Instituto PetVita</p>
          </div>

          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-4 shadow-sm">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-bold mb-1 uppercase tracking-wider text-sm">Atenção: Situação Crítica</h3>
              <p className="text-sm text-red-700 leading-relaxed text-balance">
                O quadro atual exige ação imediata para reverter o desconforto e dor{nameDisplay}.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-olive-700 bg-beige-50 p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-olive-400">Pet</span>
              <span className="font-medium text-[15px]">{petData.name} ({petData.gender})</span>
            </div>
            <div className="flex flex-col border-l pl-5 border-olive-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-olive-400">Raça</span>
              <span className="font-medium text-[15px]">{petData.breed}</span>
            </div>
            <div className="flex flex-col border-l pl-5 border-olive-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-olive-400">Idade / Peso</span>
              <span className="font-medium text-[15px]">{petData.age} {petData.weight ? `- ${petData.weight}` : ''}</span>
            </div>
          </div>

          {/* Section 1: Score */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl text-olive-800">Score PetVita</h2>
              <div className="bg-olive-50 text-olive-700 px-3 py-1 rounded-full text-sm font-medium border border-olive-200">
                Total: {totalScore} <span className="text-olive-400 mx-1">|</span> {scoreClass}
              </div>
            </div>
            
            <div className="flex justify-between items-start gap-2">
              <CircularProgress value={intensity.coceira} label="Coceira" />
              <CircularProgress value={intensity.lambedura} label="Lambedura" />
              <CircularProgress value={intensity.pele} label="Pele" />
              <CircularProgress value={intensity.fezes} label="Intestino" />
              <CircularProgress value={intensity.energia} label="Energia" />
            </div>
          </div>

          {/* Section 2: Análise Inicial */}
          <div className="mb-8">
            <h2 className="font-serif text-xl text-olive-800 mb-3 flex items-center gap-2">
               Análise Inicial
            </h2>
            <p className="text-olive-600 leading-relaxed text-sm bg-olive-50/50 p-4 rounded-xl border border-olive-100">
              {analysisText}
            </p>
          </div>

          {/* Section 3 Grid */}
          <div className="mb-8">
            <h2 className="font-serif text-lg text-olive-800 mb-4">Próximos Passos Obrigatórios</h2>
            <ul className="space-y-3">
              {['Seguir fielmente o plano personalizado', 'Ajuste imediato de hábitos nocivos', 'Monitoramento rigoroso da rotina', 'Remoção de gatilhos ambientais'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-olive-700 bg-beige-50 p-3 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Mensagem de Encerramento */}
          <div className="text-xs text-olive-500 leading-relaxed border-t border-olive-100 pt-6">
            <p className="mb-2">
              <strong className="text-olive-700">Aviso:</strong> Este diagnóstico oferece uma visão inicial baseada nas informações fornecidas e não substitui avaliação veterinária profissional.
            </p>
            <p>
              A boa notícia é que muitos tutores conseguem identificar hábitos e rotinas que merecem atenção após uma observação estruturada.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons Area (Hidden in print) */}
      <div className="space-y-3 no-print">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg w-full rounded-xl py-4 px-6 text-sm font-medium transition-all duration-300 ease-in-out active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5" />
          {petData.name ? `Começar a curar ${shortArticle} ${petData.name}` : 'Começar Tratamento'}
        </a>
        <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center justify-center gap-2 bg-white">
          <Download className="w-4 h-4" />
          Salvar Relatório em PDF
        </Button>
      </div>

    </div>
  );
}
