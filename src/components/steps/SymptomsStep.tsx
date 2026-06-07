import React from 'react';
import { Button, cn } from '../ui';
import { Check } from 'lucide-react';

const SYMPTOMS = [
  'Coceira frequente',
  'Lambedura das patas',
  'Vermelhidão na pele',
  'Pelagem opaca',
  'Queda de pelos',
  'Mau odor corporal',
  'Fezes irregulares',
  'Gases frequentes',
  'Sensibilidade alimentar',
  'Irritação nas orelhas',
];

interface Props {
  selected: string[];
  onChange: (symptoms: string[]) => void;
  onNext: () => void;
  petName: string;
  petGender: string;
}

export function SymptomsStep({ selected, onChange, onNext, petName, petGender }: Props) {
  const toggleSymptom = (s: string) => {
    if (selected.includes(s)) {
      onChange(selected.filter((item) => item !== s));
    } else {
      onChange([...selected, s]);
    }
  };

  const article = petGender === 'Fêmea' ? 'na' : 'no';
  const nameDisplay = petName ? ` ${article} ${petName}` : '';

  return (
    <div className="flex flex-col h-full py-4">
      <h2 className="font-serif text-2xl text-olive-800 mb-2">Sintomas</h2>
      <p className="text-olive-500 text-sm mb-6">Quais sinais você tem observado{nameDisplay} ultimamente?</p>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-6">
        <div className="grid gap-3">
          {SYMPTOMS.map((symptom) => {
            const isSelected = selected.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border text-left transition-all",
                  isSelected
                    ? "border-olive-500 bg-olive-50"
                    : "border-olive-100 bg-white hover:border-olive-300"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-md border shrink-0 transition-colors",
                    isSelected
                      ? "bg-olive-500 border-olive-500"
                      : "border-olive-300 bg-white"
                  )}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
                <span className={isSelected ? "text-olive-800 font-medium" : "text-olive-600"}>
                  {symptom}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-olive-100">
        <Button onClick={onNext} disabled={selected.length === 0}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
