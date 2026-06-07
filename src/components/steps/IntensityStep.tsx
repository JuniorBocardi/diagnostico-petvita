import React from 'react';
import { Button, cn } from '../ui';
import { IntensityData } from '../../types';

const CATEGORIES = [
  { key: 'coceira', label: 'Coceira Corporal' },
  { key: 'lambedura', label: 'Lambedura (patas)' },
  { key: 'pele', label: 'Irritação na Pele' },
  { key: 'fezes', label: 'Alteração nas Fezes/Gases' },
  { key: 'energia', label: 'Falta de Energia' },
] as const;

const SCALE_LABELS = [
  'Nunca',
  'Raramente',
  'Algumas vezes',
  'Frequentemente',
  'Quase todos os dias',
  'Todos os dias'
];

interface Props {
  data: IntensityData;
  onChange: (data: IntensityData) => void;
  onNext: () => void;
  petName: string;
  petGender: string;
}

export function IntensityStep({ data, onChange, onNext, petName, petGender }: Props) {
  // Check if at least one choice has been made (default is 0 for all, we assume they actively choose or leave 0)
  // Actually, we'll let them pass if they leave at 0, or we can make them touch each.
  // We can just add a state to track untouched if we want, but let's keep it simple.

  const article = petGender === 'Fêmea' ? 'com a' : 'com o';
  const nameDisplay = petName ? ` ${article} ${petName}` : '';

  return (
    <div className="flex flex-col h-full py-4 max-h-[85vh]">
      <h2 className="font-serif text-2xl text-olive-800 mb-2">Frequência</h2>
      <p className="text-olive-500 text-sm mb-6">Com que frequência estes sinais acontecem{nameDisplay}?</p>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-6 space-y-8">
        {CATEGORIES.map(({ key, label }) => (
          <div key={key} className="space-y-3">
            <h3 className="font-medium text-olive-700">{label}</h3>
            <div className="bg-white p-4 rounded-xl border border-olive-100 shadow-sm">
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={data[key as keyof IntensityData]}
                onChange={(e) => onChange({ ...data, [key]: parseInt(e.target.value) })}
                className="w-full accent-olive-500 h-2 bg-olive-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-3 px-1">
                <span className="text-xs text-olive-400 font-medium">{SCALE_LABELS[0]}</span>
                <span className="text-xs text-olive-600 font-medium">{SCALE_LABELS[data[key as keyof IntensityData]]}</span>
                <span className="text-xs text-olive-400 font-medium">{SCALE_LABELS[5]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-olive-100 z-10 bg-white">
        <Button onClick={onNext}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
