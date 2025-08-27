'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTutorial, TutorialStep } from './TutorialContext';

interface TutorialOverlayProps {
  step: TutorialStep;
}

function TutorialOverlay({ step }: TutorialOverlayProps) {
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const { nextStep, previousStep, skipTutorial, closeTutorial, tutorialState } = useTutorial();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find target element with proper cleanup
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    
    const findTarget = () => {
      if (step.target === 'body') {
        setTargetElement(document.body);
        return;
      }

      let element = document.querySelector(step.target);
      
      // Fallback selectors for specific cases
      if (!element) {
        if (step.id === 'tab-navigation') {
          element = document.querySelector('[data-tutorial="tab-navigation"]') ||
                   document.querySelector('button[class*="text-[#5fb574]"]') ||
                   document.querySelector('main button:first-of-type');
        } else if (step.id === 'time-filters') {
          element = document.querySelector('[data-tutorial="time-filters"]') ||
                   document.querySelector('button[class*="bg-[#5fb574]"]') ||
                   document.querySelector('div[class*="flex gap-2"] button');
        } else if (step.id === 'data-table') {
          element = document.querySelector('main > div:last-child div[class*="space-y-4"]:last-child') ||
                   document.querySelector('[class*="space-y-4"] > div:first-child');
        }
      }
      
      setTargetElement(element);
    };

    // Try immediately
    findTarget();

    // Also try after a short delay for dynamic content
    const timeout = setTimeout(findTarget, 300);
    timeoutId = timeout;

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [step.target, step.id]); // Only depend on step properties

  // Calculate tooltip position
  const updateTooltipPosition = useCallback(() => {
    if (!targetElement || !tooltipRef.current) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let x = 0;
    let y = 0;

    if (step.position === 'center') {
      x = (windowWidth - tooltipRect.width) / 2;
      y = (windowHeight - tooltipRect.height) / 2;
    } else {
      const offset = 16;

      switch (step.position) {
        case 'top':
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.top - tooltipRect.height - offset;
          break;
        case 'bottom':
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.bottom + offset;
          break;
        case 'left':
          x = targetRect.left - tooltipRect.width - offset;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
        case 'right':
          x = targetRect.right + offset;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
      }

      // Keep tooltip within viewport
      x = Math.max(16, Math.min(x, windowWidth - tooltipRect.width - 16));
      y = Math.max(16, Math.min(y, windowHeight - tooltipRect.height - 16));
    }

    setTooltipPosition({ x, y });
  }, [targetElement, step.position]);

  // Update position when element or step changes
  useEffect(() => {
    if (!targetElement || !tooltipRef.current) return;

    const updatePosition = () => updateTooltipPosition();
    
    // Update immediately
    updatePosition();
    
    // Update on resize and scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [updateTooltipPosition, targetElement]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeTutorial();
          break;
        case 'ArrowRight':
        case 'Enter':
          e.preventDefault();
          nextStep();
          break;
        case 'ArrowLeft':
          if (step.showPrevious !== false && tutorialState.currentStep > 0) {
            e.preventDefault();
            previousStep();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, previousStep, closeTutorial, step.showPrevious, tutorialState.currentStep]);

  if (!mounted) return null;

  // Create spotlight clipping path
  const getSpotlightStyle = () => {
    if (!targetElement || step.position === 'center') {
      return {};
    }

    const rect = targetElement.getBoundingClientRect();
    const padding = 8;
    
    const x = rect.left - padding;
    const y = rect.top - padding;
    const width = rect.width + (padding * 2);
    const height = rect.height + (padding * 2);

    // Create a hole in the overlay
    return {
      clipPath: `polygon(0% 0%, 0% 100%, ${x}px 100%, ${x}px ${y}px, ${x + width}px ${y}px, ${x + width}px ${y + height}px, ${x}px ${y + height}px, ${x}px 100%, 100% 100%, 100% 0%)`
    };
  };

  const renderArrow = () => {
    if (step.position === 'center') return null;

    const arrowClasses = "absolute w-0 h-0";
    
    switch (step.position) {
      case 'top':
        return (
          <div className={`${arrowClasses} border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#0f0f0f] -bottom-2 left-1/2 transform -translate-x-1/2`} />
        );
      case 'bottom':
        return (
          <div className={`${arrowClasses} border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#0f0f0f] -top-2 left-1/2 transform -translate-x-1/2`} />
        );
      case 'left':
        return (
          <div className={`${arrowClasses} border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-[#0f0f0f] -right-2 top-1/2 transform -translate-y-1/2`} />
        );
      case 'right':
        return (
          <div className={`${arrowClasses} border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#0f0f0f] -left-2 top-1/2 transform -translate-y-1/2`} />
        );
      default:
        return null;
    }
  };

  const currentStepNumber = tutorialState.currentStep + 1;
  const totalSteps = tutorialState.steps.length;
  
  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Dark overlay with spotlight */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300 pointer-events-auto"
        style={getSpotlightStyle()}
        onClick={step.position === 'center' ? undefined : closeTutorial}
      />
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bg-[#0f0f0f] border-2 border-[#4a9b5f]/50 rounded-xl shadow-2xl pointer-events-auto max-w-[90vw] sm:max-w-md transition-all duration-300"
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y
        }}
      >
        {renderArrow()}
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#e7e9ea] mb-2">{step.title}</h3>
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
            {step.content}
          </p>
          
          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {step.showSkip && (
                <button
                  onClick={skipTutorial}
                  className="px-4 py-2 text-sm text-[#71767b] hover:text-[#e7e9ea] transition-colors duration-200"
                >
                  Skip tour
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              {step.showPrevious !== false && tutorialState.currentStep > 0 && (
                <button
                  onClick={previousStep}
                  className="px-4 py-2 bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 rounded-lg text-[#5fb574] hover:bg-[#4a9b5f]/30 hover:border-[#5fb574] transition-colors duration-200 text-sm font-semibold"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={() => {
                  if (step.action) {
                    step.action();
                  }
                  nextStep();
                }}
                className="px-4 py-2 bg-[#5fb574] text-white rounded-lg hover:bg-[#4a9b5f] transition-colors duration-200 text-sm font-semibold"
              >
                {currentStepNumber === totalSteps ? 'Finish' : 
                 step.id === 'profile-transition' ? 'Continue' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function FixedTutorialSystem() {
  const { tutorialState, getCurrentStep, setCurrentPage } = useTutorial();

  // Update current page based on URL - with proper check to prevent infinite loops
  useEffect(() => {
    const path = window.location.pathname;
    const newPage = path.includes('/profile') ? 'profile' : 'dashboard';
    
    // Only update if it's actually different
    if (tutorialState.currentPage !== newPage) {
      setCurrentPage(newPage as 'dashboard' | 'profile');
    }
  }, []); // Empty dependency array, only run once on mount

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const newPage = path.includes('/profile') ? 'profile' : 'dashboard';
      if (tutorialState.currentPage !== newPage) {
        setCurrentPage(newPage as 'dashboard' | 'profile');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [tutorialState.currentPage, setCurrentPage]);

  if (!tutorialState.isActive) {
    return null;
  }

  const currentStep = getCurrentStep();
  
  if (!currentStep) {
    return null;
  }

  // Only show step if it matches current page
  if (currentStep.page !== tutorialState.currentPage) {
    return null;
  }

  return <TutorialOverlay step={currentStep} />;
}