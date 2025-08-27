'use client';

import React, { useEffect, useState } from 'react';
import { useTutorial } from './TutorialContext';

export default function SimpleTutorial() {
  const { tutorialState, getCurrentStep, nextStep, previousStep, closeTutorial, skipTutorial } = useTutorial();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !tutorialState.isActive) {
    return null;
  }

  const currentStep = getCurrentStep();
  
  if (!currentStep) {
    return null;
  }

  const currentStepNumber = tutorialState.currentStep + 1;
  const totalSteps = tutorialState.steps.length;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeTutorial} />
      
      {/* Tutorial modal */}
      <div className="relative bg-[#0f0f0f] border-2 border-[#4a9b5f]/50 rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#e7e9ea] mb-2">{currentStep.title}</h3>
              <div className="flex items-center gap-2 text-xs text-[#71767b]">
                <span>{currentStepNumber} of {totalSteps}</span>
                <div className="flex gap-1">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                        i <= tutorialState.currentStep ? 'bg-[#5fb574]' : 'bg-[#4a9b5f]/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={closeTutorial}
              className="w-8 h-8 rounded-full hover:bg-[#4a9b5f]/20 transition-colors duration-200 flex items-center justify-center text-[#71767b] hover:text-[#e7e9ea]"
              aria-label="Close tutorial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <p className="text-[#e7e9ea] text-sm leading-relaxed mb-6">
            {currentStep.content}
          </p>
          
          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {currentStep.showSkip && (
                <button
                  onClick={skipTutorial}
                  className="px-4 py-2 text-sm text-[#71767b] hover:text-[#e7e9ea] transition-colors duration-200"
                >
                  Skip tour
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              {currentStep.showPrevious !== false && tutorialState.currentStep > 0 && (
                <button
                  onClick={previousStep}
                  className="px-4 py-2 bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 rounded-lg text-[#5fb574] hover:bg-[#4a9b5f]/30 hover:border-[#5fb574] transition-colors duration-200 text-sm font-semibold"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={() => {
                  if (currentStep.action) {
                    currentStep.action();
                  }
                  nextStep();
                }}
                className="px-4 py-2 bg-[#5fb574] text-white rounded-lg hover:bg-[#4a9b5f] transition-colors duration-200 text-sm font-semibold"
              >
                {currentStepNumber === totalSteps ? 'Finish' : 
                 currentStep.id === 'profile-transition' ? 'Continue' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}