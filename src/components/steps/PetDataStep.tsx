import React from 'react';
import { Button, Input, Label, cn } from '../ui';
import { PetData } from '../../types';

interface Props {
  data: PetData;
  updateData: (data: Partial<PetData>) => void;
  onNext: () => void;
}

export function PetDataStep({ data, updateData, onNext }: Props) {
  const isComplete = data.name.trim() !== '' && data.breed.trim() !== '' && data.age.trim() !== '' && data.size !== '' && data.gender !== '';

  return (
    <div className="flex flex-col h-full py-4">
      <h2 className="font-serif text-2xl text-olive-800 mb-2">Sobre o seu pet</h2>
      <p className="text-olive-500 text-sm mb-8">Conhecendo seu companheiro.</p>

      <div className="space-y-6 flex-1 overflow-y-auto hide-scrollbar pb-6 px-1">
        <div>
          <Label htmlFor="name">Nome do pet</Label>
          <Input 
            id="name"
            placeholder="Ex: Thor, Bella..."
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="breed">Raça</Label>
          <Input 
            id="breed"
            placeholder="Ex: Golden Retriever, SRD..."
            value={data.breed}
            onChange={(e) => updateData({ breed: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Idade</Label>
            <Input 
              id="age"
              placeholder="Ex: 3 anos"
              value={data.age}
              onChange={(e) => updateData({ age: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="weight">Peso (opcional)</Label>
            <Input 
              id="weight"
              placeholder="Ex: 15kg"
              value={data.weight}
              onChange={(e) => updateData({ weight: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label>Porte</Label>
          <div className="grid grid-cols-3 gap-3">
            {['Pequeno', 'Médio', 'Grande'].map((size) => (
              <button
                key={size}
                onClick={() => updateData({ size: size as any })}
                className={cn(
                  "py-3 rounded-xl border text-sm font-medium transition-all",
                  data.size === size 
                    ? "border-olive-500 bg-olive-50 text-olive-700" 
                    : "border-olive-200 bg-white text-olive-600 hover:border-olive-300"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Sexo</Label>
          <div className="grid grid-cols-2 gap-3">
            {['Macho', 'Fêmea'].map((gender) => (
              <button
                key={gender}
                onClick={() => updateData({ gender: gender as any })}
                className={cn(
                  "py-3 rounded-xl border text-sm font-medium transition-all",
                  data.gender === gender 
                    ? "border-olive-500 bg-olive-50 text-olive-700" 
                    : "border-olive-200 bg-white text-olive-600 hover:border-olive-300"
                )}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-olive-100">
        <Button onClick={onNext} disabled={!isComplete}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
