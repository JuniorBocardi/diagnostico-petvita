import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Leaf, Loader2 } from 'lucide-react';
import { cn } from '../ui';

interface Props {
  onComplete: () => void;
  petName: string;
  petGender: string;
}

export function ProcessingStep({ onComplete, petName, petGender }: Props) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const totalDuration = 4000;
    const interval = 50;
    let current = 0;

    const timer = setInterval(() => {
      current += interval;
      const percent = Math.min((current / totalDuration) * 100, 100);
      setProgress(percent);

      if (current >= 1000 && current < 2000) setStep(1);
      else if (current >= 2000 && current < 3500) setStep(2);
      else if (current >= 3500) setStep(3);

      if (current >= totalDuration) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const article = petGender === 'Fêmea' ? 'da' : 'do';
  const nameDisplay = petName ? ` ${article} ${petName}` : '';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full py-10 px-6 items-center justify-center relative"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-32 h-32 mb-8 flex items-center justify-center"
      >
        {/* Outer rotating dashed circle */}
        <div className="absolute inset-0 border-4 border-dashed border-olive-200 rounded-full animate-[spin_10s_linear_infinite]" />
        
        {/* Inner static circle with icon */}
        <div className="w-24 h-24 bg-olive-50 rounded-full flex items-center justify-center shadow-inner relative z-10">
          <Leaf className="w-10 h-10 text-olive-500 animate-pulse" />
        </div>
      </motion.div>

      <h2 className="font-serif text-2xl text-olive-800 mb-2 font-medium text-center">Processando Dados</h2>
      <p className="text-olive-500 text-sm mb-10 text-center">Analisando o quadro de saúde{nameDisplay}...</p>
      
      {/* Progress Bar Container */}
      <div className="w-full max-w-sm bg-olive-100 h-2.5 rounded-full overflow-hidden mb-8">
        <motion.div 
          className="h-full bg-gold-400"
          initial={{ width: `0%` }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-4 w-full max-w-xs mx-auto text-sm text-left">
        <div className={cn("flex items-center gap-3 transition-colors duration-500", step >= 1 ? "text-olive-800 font-medium" : "text-olive-400")}>
          {step >= 1 ? (
            <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 animate-in zoom-in duration-300" />
          ) : (
            <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
          )}
          <span>Avaliando sintomas reportados</span>
        </div>

        <div className={cn("flex items-center gap-3 transition-colors duration-500", step >= 2 ? "text-olive-800 font-medium" : "text-olive-400 opacity-50")}>
           {step >= 2 ? (
            <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 animate-in zoom-in duration-300" />
          ) : (
            step >= 1 ? <Loader2 className="w-5 h-5 shrink-0 text-olive-400 animate-spin" /> : <div className="w-5 h-5 shrink-0 border-[2px] rounded-full border-olive-200" />
          )}
          <span>Cruzando dados e intensidade</span>
        </div>

        <div className={cn("flex items-center gap-3 transition-colors duration-500", step >= 3 ? "text-olive-800 font-medium" : "text-olive-400 opacity-50")}>
           {step >= 3 ? (
            <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 animate-in zoom-in duration-300" />
          ) : (
            step >= 2 ? <Loader2 className="w-5 h-5 shrink-0 text-olive-400 animate-spin" /> : <div className="w-5 h-5 shrink-0 border-[2px] rounded-full border-olive-200" />
          )}
          <span>Gerando Relatório PetVita</span>
        </div>
      </div>
    </motion.div>
  );
}
