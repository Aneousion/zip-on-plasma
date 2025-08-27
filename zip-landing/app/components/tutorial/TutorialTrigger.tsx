'use client';

import React, { useEffect } from 'react';
import { useTutorial } from './TutorialContext';
import { useRouter } from 'next/navigation';

interface TutorialTriggerProps {
  /** Automatically start tutorial for new users */
  autoStart?: boolean;
  /** Page where tutorial should start */
  triggerPage?: 'dashboard' | 'profile';
}

export default function TutorialTrigger({ 
  autoStart = true, 
  triggerPage = 'dashboard' 
}: TutorialTriggerProps) {
  const { tutorialState, startTutorial } = useTutorial();

  useEffect(() => {
    // Only auto-start if user hasn't seen tutorial and we're on the trigger page
    if (autoStart && 
        !tutorialState.hasSeenTutorial && 
        !tutorialState.isActive &&
        window.location.pathname.includes(triggerPage)) {
      
      // Small delay to let page load completely
      const timer = setTimeout(() => {
        startTutorial();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoStart, tutorialState.hasSeenTutorial, tutorialState.isActive, triggerPage, startTutorial]);

  return null;
}

// Hook for manually triggering tutorial from landing page
export function useTutorialTrigger() {
  const { startTutorial, tutorialState } = useTutorial();
  const router = useRouter();

  const triggerTutorialFromLanding = React.useCallback(async () => {
    try {
      // Navigate to dashboard first
      await router.push('/dashboard');
      
      // Small delay to ensure navigation completes
      setTimeout(() => {
        startTutorial();
      }, 500);
    } catch (error) {
      console.error('Navigation failed:', error);
      // Fallback to direct navigation
      window.location.href = '/dashboard';
    }
  }, [router, startTutorial]);

  return {
    triggerTutorialFromLanding,
    canStartTutorial: !tutorialState.hasSeenTutorial
  };
}