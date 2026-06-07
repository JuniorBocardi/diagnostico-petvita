import React, { useState } from 'react';
import { Button } from '../ui';
import { ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: Props) {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex flex-col h-full items-center pb-10 pt-16 -mx-6 px-6 bg-beige-50 welcome-container relative overflow-hidden">
      
      {/* Top content */}
      <div className="flex flex-col items-center w-full z-10 space-y-6 flex-1">
        
        {/* Logo at the top */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center items-center w-full mb-4"
        >
          {!logoError ? (
            <img 
              src="/img/logo.png" 
              alt="Instituto PetVita" 
              className="w-48 h-48 object-contain drop-shadow-sm"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex flex-col items-center text-olive-600 mb-4">
              <Leaf className="w-16 h-16 mb-2" />
              <span className="font-serif text-2xl uppercase tracking-widest">PetVita</span>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          <h1 className="font-serif text-5xl text-olive-800 text-center mb-6 leading-tight">
            Diagnóstico<br />
            <span className="text-olive-600 italic">PetVita</span>
          </h1>
          
          <p className="text-center text-olive-600 text-[17px] leading-relaxed max-w-[280px]">
            Avaliação de bem-estar e sintomas para uma rotina mais saudável.
          </p>
        </motion.div>
      </div>

      {/* Button */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="w-full z-20 relative mt-12 mb-8"
      >
        <Button onClick={onNext} className="flex items-center justify-center gap-2 h-14 text-base shadow-xl bg-olive-600 hover:bg-olive-700 w-full group">
          Iniciar Avaliação
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>

    </div>
  );
}
