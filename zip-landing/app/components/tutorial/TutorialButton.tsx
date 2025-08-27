'use client';

import React from 'react';
import { useTutorial } from './TutorialContext';

interface TutorialButtonProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'minimal';
}

export default function TutorialButton({ 
  className = '', 
  children,
  variant = 'minimal'
}: TutorialButtonProps) {
  const { startTutorial, tutorialState } = useTutorial();

  if (tutorialState.isActive) {
    return null; // Don't show if tutorial is already active
  }

  const baseClasses = "inline-flex items-center gap-2 font-semibold transition-colors duration-200";
  
  const variantClasses = {
    primary: "px-4 py-2 bg-[#5fb574] text-white rounded-lg hover:bg-[#4a9b5f]",
    secondary: "px-4 py-2 bg-[#4a9b5f]/20 border border-[#4a9b5f]/30 rounded-lg text-[#5fb574] hover:bg-[#4a9b5f]/30 hover:border-[#5fb574]",
    minimal: "text-[#5fb574] hover:text-[#4a9b5f] text-sm"
  };

  return (
    <button
      onClick={startTutorial}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label="Start tutorial"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {children || "Show Tutorial"}
    </button>
  );
}