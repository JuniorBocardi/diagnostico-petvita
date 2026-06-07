import React from 'react';
import { Button, Label, TextArea, cn } from '../ui';
import { HistoryData } from '../../types';

const DURATIONS = [
  'Menos de 30 dias',
  '1 a 3 meses',
  '3 a 6 meses',
  'Mais de 6 meses'
];

interface Props {
  data: HistoryData;
  onChange: (data: HistoryData) => void;
  onNext: () => void;
  petName: string;
  petGender: string;
}

export function HistoryStep({ data, onChange, onNext, petName, petGender }: Props) {
  const isComplete = data.duration !== '';

  const article = petGender === 'Fêmea' ? 'na' : 'no';
  const nameDisplay = petName ? ` ${article} ${petName}` : '';

  return (
    <div className="flex flex-col h-full py-4">
      <h2 className="font-serif text-2xl text-olive-800 mb-2">Histórico</h2>
      <p className="text-olive-500 text-sm mb-6">Quando você começou a observar essas mudanças{nameDisplay}?</p>

      <div className="flex-1 space-y-8">
        <div>
          <Label className="mb-3">Há quanto tempo os sinais acontecem?</Label>
          <div className="grid gap-3">
            {DURATIONS.map((dur) => (
              <button
                key={dur}
                onClick={() => onChange({ ...data, duration: dur })}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all text-sm font-medium",
                  data.duration === dur
                    ? "border-olive-500 bg-olive-50 text-olive-800"
                    : "border-olive-200 bg-white text-olive-600 hover:border-olive-300"
                )}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="solutions" className="mb-2">Já tentou alguma solução ou mudança na rotina?</Label>
          <TextArea
            id="solutions"
            placeholder="Ex: Troquei a ração, usei shampoo específico..."
            rows={4}
            value={data.previousSolutions}
            onChange={(e) => onChange({ ...data, previousSolutions: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-olive-100">
        <Button onClick={onNext} disabled={!isComplete}>
          Analisar Dados
        </Button>
      </div>
    </div>
  );
}
