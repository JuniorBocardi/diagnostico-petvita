import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ChevronLeft } from 'lucide-react';
import { cn } from './ui';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  stepId: string;
  showProgress?: boolean;
  onBack?: () => void;
  showBack?: boolean;
  hideHeader?: boolean;
}

export function Layout({ children, currentStep, totalSteps, stepId, showProgress = true, onBack, showBack = false, hideHeader = false }: LayoutProps) {
  const progress = (currentStep / totalSteps) * 100;
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen bg-beige-100 font-sans text-olive-900 selection:bg-olive-200">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-white sm:shadow-2xl sm:shadow-olive-900/5">
        
        {/* Header */}
        {!hideHeader && (
        <header className="pt-8 pb-4 px-6 flex flex-col items-center justify-center relative z-10 no-print transition-all">
          {showBack && onBack && (
            <button 
              onClick={onBack} 
              className="absolute left-6 top-1/2 -translate-y-1/2 p-2 -ml-2 text-olive-400 hover:text-olive-700 transition-colors bg-white/50 backdrop-blur-sm rounded-full"
              aria-label="Voltar"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {!logoError ? (
            <img 
              src="/img/logo.png" 
              alt="Instituto PetVita" 
              className="h-16 object-contain mb-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-olive-600 mb-1">
                <Leaf className="w-5 h-5" />
                <span className="font-serif font-medium tracking-wide text-sm uppercase">Instituto PetVita</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-medium">Educação e Rotina para Tutores</span>
            </div>
          )}
        </header>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full px-6 py-2 no-print">
            <div className="h-1.5 w-full bg-beige-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-olive-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="mt-2 text-right text-xs text-olive-400">
              Passo {currentStep} de {totalSteps}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 px-6 pb-12 flex flex-col relative z-0 hide-scrollbar overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, type: "spring", bounce: 0, ease: "easeOut" }}
              className="flex-1 flex flex-col h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
