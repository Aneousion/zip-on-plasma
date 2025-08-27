'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface TutorialStep {
  id: string;
  target: string; // CSS selector
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  page: 'dashboard' | 'profile';
  action?: () => void;
  disableBeacon?: boolean;
  showSkip?: boolean;
  showPrevious?: boolean;
}

interface TutorialState {
  isActive: boolean;
  currentStep: number;
  currentPage: 'dashboard' | 'profile';
  hasSeenTutorial: boolean;
  steps: TutorialStep[];
}

interface TutorialContextType {
  tutorialState: TutorialState;
  startTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
  closeTutorial: () => void;
  setCurrentPage: (page: 'dashboard' | 'profile') => void;
  getCurrentStep: () => TutorialStep | null;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

const TUTORIAL_STORAGE_KEY = 'zip-tutorial-seen';

// Define tutorial steps
const tutorialSteps: TutorialStep[] = [
  // Dashboard steps
  {
    id: 'welcome',
    target: 'body',
    title: 'Welcome to Zip!',
    content: 'Welcome to your Zip dashboard! Here you can track trending tips, discover popular content, and manage your account. Let\'s take a quick tour of the key features.',
    position: 'center',
    page: 'dashboard',
    disableBeacon: true,
    showSkip: true,
    showPrevious: false
  },
  {
    id: 'navigation',
    target: 'nav',
    title: 'Main Navigation',
    content: 'This is your main navigation bar. You can see the Zip logo, search for content, and access your profile here.',
    position: 'bottom',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'search',
    target: 'input[placeholder*="Search"]',
    title: 'Search Functionality',
    content: 'Use this search bar to find specific accounts or paste tweet links to see their tip activity and engagement metrics.',
    position: 'bottom',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'profile-section',
    target: 'a[href="/profile"]',
    title: 'Your Profile',
    content: 'This shows your connected account info. Click here to view your profile, earnings, and tip history.',
    position: 'bottom',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'tab-navigation',
    target: '[data-tutorial="tab-navigation"]',
    title: 'Trending Tabs',
    content: 'Switch between different views: Trending shows hot content, Most Zipped Tweets displays popular posts, and Most Zipped Accounts shows top-earning creators.',
    position: 'bottom',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'time-filters',
    target: '[data-tutorial="time-filters"]',
    title: 'Time Filters',
    content: 'Filter trending data by different time periods (1h, 4h, 24h, 7d) to see real-time activity or historical trends.',
    position: 'bottom',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'data-table',
    target: 'div[class*="space-y-4"]:last-child',
    title: 'Content Feed',
    content: 'This is your main content feed showing trending accounts and tweets. Click on any item to see detailed tip information and engagement metrics.',
    position: 'top',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'profile-transition',
    target: 'body',
    title: 'Let\'s Visit Your Profile',
    content: 'Now let\'s explore your profile page where you can track your earnings and manage your content. Click Continue to go to your profile.',
    position: 'center',
    page: 'dashboard',
    showSkip: true,
    showPrevious: true,
    action: () => {
      // This will be handled by the tutorial system
    }
  },
  // Profile steps
  {
    id: 'profile-overview',
    target: '[data-tutorial="profile-overview"]',
    title: 'Profile Overview',
    content: 'This is your profile section showing your account details, profile picture, and connection status.',
    position: 'bottom',
    page: 'profile',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'earnings-display',
    target: '[data-tutorial="earnings-display"]',
    title: 'Your Earnings',
    content: 'Track your total ZIP earnings here. Your tips accumulate from all your content and can be claimed anytime.',
    position: 'bottom',
    page: 'profile',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'claim-button',
    target: '[data-tutorial="claim-button"]',
    title: 'Claim Your Tips',
    content: 'Use this button to claim your accumulated tips to your connected wallet. Earnings update in real-time as people tip your content.',
    position: 'bottom',
    page: 'profile',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'top-zips',
    target: '[data-tutorial="top-zips"]',
    title: 'Top Performing Content',
    content: 'See which of your tweets received the most tips and engagement. This helps you understand what content resonates with your audience.',
    position: 'bottom',
    page: 'profile',
    showSkip: true,
    showPrevious: true
  },
  {
    id: 'latest-posts',
    target: '[data-tutorial="latest-posts"]',
    title: 'Recent Activity',
    content: 'Monitor your recent posts and their tip performance to track engagement and optimize your content strategy.',
    position: 'bottom',
    page: 'profile',
    showSkip: true,
    showPrevious: false
  }
];

export function TutorialProvider({ children }: { children: ReactNode }) {
  
  const [tutorialState, setTutorialState] = useState<TutorialState>({
    isActive: false,
    currentStep: 0,
    currentPage: 'dashboard',
    hasSeenTutorial: false,
    steps: tutorialSteps
  });

  // Check if user has seen tutorial before
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
    setTutorialState(prev => {
      if (prev.hasSeenTutorial !== hasSeenTutorial) {
        return {
          ...prev,
          hasSeenTutorial
        };
      }
      return prev;
    });
  }, []);

  const startTutorial = useCallback(() => {
    setTutorialState(prev => ({
      ...prev,
      isActive: true,
      currentStep: 0,
      currentPage: 'dashboard'
    }));
  }, []);

  const nextStep = useCallback(() => {
    setTutorialState(prev => {
      const nextStepIndex = prev.currentStep + 1;
      
      if (nextStepIndex >= prev.steps.length) {
        // Tutorial completed
        localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
        return {
          ...prev,
          isActive: false,
          hasSeenTutorial: true
        };
      }

      const nextStep = prev.steps[nextStepIndex];
      
      // Handle page navigation
      if (nextStep.id === 'profile-transition') {
        // Special case: navigate to profile
        setTimeout(() => {
          window.location.href = '/profile';
        }, 500);
        return {
          ...prev,
          currentStep: nextStepIndex,
          currentPage: 'profile'
        };
      }

      if (nextStep.page === 'profile' && prev.currentPage === 'dashboard') {
        // Navigate to profile if not already there
        window.location.href = '/profile';
        return {
          ...prev,
          currentStep: nextStepIndex,
          currentPage: 'profile'
        };
      }

      return {
        ...prev,
        currentStep: nextStepIndex,
        currentPage: nextStep.page
      };
    });
  }, []);

  const previousStep = useCallback(() => {
    setTutorialState(prev => {
      if (prev.currentStep <= 0) return prev;
      
      const prevStepIndex = prev.currentStep - 1;
      const prevStep = prev.steps[prevStepIndex];
      
      // Handle page navigation
      if (prevStep.page !== prev.currentPage) {
        if (prevStep.page === 'dashboard') {
          window.location.href = '/dashboard';
        } else if (prevStep.page === 'profile') {
          window.location.href = '/profile';
        }
      }
      
      return {
        ...prev,
        currentStep: prevStepIndex,
        currentPage: prevStep.page
      };
    });
  }, []);

  const skipTutorial = useCallback(() => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setTutorialState(prev => ({
      ...prev,
      isActive: false,
      hasSeenTutorial: true
    }));
  }, []);

  const closeTutorial = useCallback(() => {
    setTutorialState(prev => ({
      ...prev,
      isActive: false
    }));
  }, []);

  const setCurrentPage = useCallback((page: 'dashboard' | 'profile') => {
    setTutorialState(prev => ({
      ...prev,
      currentPage: page
    }));
  }, []);

  const getCurrentStep = useCallback((): TutorialStep | null => {
    if (!tutorialState.isActive || tutorialState.currentStep >= tutorialState.steps.length) {
      return null;
    }
    return tutorialState.steps[tutorialState.currentStep];
  }, [tutorialState.isActive, tutorialState.currentStep, tutorialState.steps]);

  return (
    <TutorialContext.Provider
      value={{
        tutorialState,
        startTutorial,
        nextStep,
        previousStep,
        skipTutorial,
        closeTutorial,
        setCurrentPage,
        getCurrentStep
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}