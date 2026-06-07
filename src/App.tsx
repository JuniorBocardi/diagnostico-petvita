import React, { useState } from 'react';
import { initialDiagnosticState, DiagnosticState, Step } from './types';
import { Layout } from './components/Layout';
import { WelcomeStep } from './components/steps/WelcomeStep';
import { PetDataStep } from './components/steps/PetDataStep';
import { SymptomsStep } from './components/steps/SymptomsStep';
import { IntensityStep } from './components/steps/IntensityStep';
import { HistoryStep } from './components/steps/HistoryStep';
import { ProcessingStep } from './components/steps/ProcessingStep';
import { ResultStep } from './components/steps/ResultStep';

const STEPS_ORDER: Step[] = [
  'welcome',
  'pet_data',
  'symptoms',
  'intensity',
  'history',
  'processing',
  'result',
];

export default function App() {
  const [state, setState] = useState<DiagnosticState>(initialDiagnosticState);

  const currentStepIndex = STEPS_ORDER.indexOf(state.step);
  // Do not show progress bar for Welcome, Processing, Result
  const showProgress = state.step !== 'welcome' && state.step !== 'processing' && state.step !== 'result';
  // Logical total steps for progress (Data, Symp, Int, Hist = 4 steps)
  const logicalSteps = ['pet_data', 'symptoms', 'intensity', 'history'];
  const logicalStepNumber = logicalSteps.indexOf(state.step) + 1;

  const nextStep = () => {
    if (currentStepIndex < STEPS_ORDER.length - 1) {
      setState((prev) => ({ ...prev, step: STEPS_ORDER[currentStepIndex + 1] }));
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setState((prev) => ({ ...prev, step: STEPS_ORDER[currentStepIndex - 1] }));
    }
  };

  const updateState = (updates: Partial<DiagnosticState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Layout 
      currentStep={logicalStepNumber} 
      totalSteps={logicalSteps.length}
      stepId={state.step}
      showProgress={showProgress}
      onBack={prevStep}
      showBack={state.step !== 'welcome' && state.step !== 'processing' && state.step !== 'result'}
      hideHeader={state.step === 'welcome'}
    >
      {state.step === 'welcome' && <WelcomeStep onNext={nextStep} />}
      
      {state.step === 'pet_data' && (
        <PetDataStep 
          data={state.petData} 
          updateData={(d) => updateState({ petData: { ...state.petData, ...d } })} 
          onNext={nextStep} 
        />
      )}
      
      {state.step === 'symptoms' && (
        <SymptomsStep 
          selected={state.symptoms} 
          onChange={(s) => updateState({ symptoms: s })} 
          onNext={nextStep} 
          petName={state.petData.name}
          petGender={state.petData.gender}
        />
      )}
      
      {state.step === 'intensity' && (
        <IntensityStep 
          data={state.intensity} 
          onChange={(d) => updateState({ intensity: d })} 
          onNext={nextStep} 
          petName={state.petData.name}
          petGender={state.petData.gender}
        />
      )}
      
      {state.step === 'history' && (
        <HistoryStep 
          data={state.history} 
          onChange={(d) => updateState({ history: d })} 
          onNext={nextStep} 
          petName={state.petData.name}
          petGender={state.petData.gender}
        />
      )}
      
      {state.step === 'processing' && (
        <ProcessingStep 
          onComplete={nextStep} 
          petName={state.petData.name}
          petGender={state.petData.gender}
        />
      )}
      
      {state.step === 'result' && (
        <ResultStep state={state} />
      )}
    </Layout>
  );
}

