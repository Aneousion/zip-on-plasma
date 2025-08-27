# ZIP Tutorial System Documentation

## Overview

The ZIP tutorial system provides an interactive onboarding experience for new users, guiding them through the key features of the dashboard and profile pages. The tutorial automatically starts for new users and can be replayed at any time.

## Features

✅ **Auto-trigger Tutorial**: Starts automatically when users click "Continue with X" or "Continue with Wallet"  
✅ **Cross-page Navigation**: Seamlessly transitions between dashboard and profile pages  
✅ **Responsive Design**: Works perfectly on mobile, tablet, and desktop  
✅ **Keyboard Navigation**: Support for arrow keys, Enter, and Escape  
✅ **State Persistence**: Remembers if user has seen tutorial (localStorage)  
✅ **Manual Replay**: Users can restart tutorial anytime via "Show Tutorial" button  
✅ **Spotlight Effect**: Dark overlay with highlighted UI elements  
✅ **Progress Tracking**: Visual progress indicator and step counter  
✅ **Skip/Close Options**: Users can exit tutorial at any point  

## Tutorial Flow

### Dashboard Tutorial (Steps 1-8)
1. **Welcome & Overview** - Center overlay introduction
2. **Navigation Header** - Highlights main navigation bar
3. **Search Functionality** - Shows search bar usage
4. **Profile Section** - Points to user profile area
5. **Trending Tabs** - Explains tab navigation
6. **Time Filters** - Shows time period filtering
7. **Data Table** - Highlights main content feed
8. **Profile Transition** - Navigates to profile page

### Profile Tutorial (Steps 9-13)
9. **Profile Overview** - Shows profile picture and info
10. **Earnings Display** - Highlights total earnings section
11. **Claim Button** - Shows how to claim earnings
12. **Top Zips** - Explains top performing content
13. **Latest Posts** - Shows recent activity tracking

## Component Architecture

```
app/
├── components/
│   └── tutorial/
│       ├── TutorialContext.tsx    # State management & navigation
│       ├── TutorialOverlay.tsx    # Main tutorial UI component
│       ├── TutorialTrigger.tsx    # Auto-start trigger
│       ├── TutorialButton.tsx     # Manual replay button
│       └── index.ts               # Exports
├── layout.tsx                     # Tutorial provider integration
├── page.tsx                       # Landing page with CTA triggers
├── dashboard/page.tsx             # Dashboard integration
└── profile/page.tsx               # Profile integration
```

## Usage

### For New Users
1. Visit the landing page
2. Click "Continue with X" or "Continue with Wallet"
3. Tutorial starts automatically on dashboard
4. Follow the guided tour through all features

### For Returning Users
- Click "Show Tutorial" button in navigation to replay
- Tutorial state is preserved in localStorage
- Can skip or close tutorial at any time

### Manual Integration

```tsx
import { TutorialProvider, TutorialButton, useTutorial } from './components/tutorial';

// Wrap your app with the provider
<TutorialProvider>
  <YourApp />
</TutorialProvider>

// Add manual trigger button
<TutorialButton variant="primary">Start Tour</TutorialButton>

// Use tutorial hook for custom controls
const { startTutorial, skipTutorial, tutorialState } = useTutorial();
```

## Configuration

### Tutorial Steps
Steps are defined in `TutorialContext.tsx` with the following structure:

```typescript
interface TutorialStep {
  id: string;              // Unique identifier
  target: string;          // CSS selector for highlighting
  title: string;           // Step title
  content: string;         // Step description
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  page: 'dashboard' | 'profile';
  action?: () => void;     // Optional custom action
  disableBeacon?: boolean; // Hide pulsing beacon
  showSkip?: boolean;      // Show skip button
  showPrevious?: boolean;  // Show previous button
}
```

### Customization Options

#### Tutorial Button Variants
- `primary`: Blue button with white text
- `secondary`: Outlined button with green text
- `minimal`: Text-only button (default)

#### Position Options
- `top`: Tooltip appears above target
- `bottom`: Tooltip appears below target
- `left`: Tooltip appears to the left
- `right`: Tooltip appears to the right
- `center`: Full-screen overlay (for welcome screens)

## Styling

The tutorial uses Tailwind CSS classes consistent with the existing design system:

- **Colors**: `#5fb574` (primary green), `#4a9b5f` (secondary green), `#0f0f0f` (dark background)
- **Overlay**: Semi-transparent black with backdrop blur
- **Animations**: Smooth 300ms transitions
- **Typography**: Matches existing font hierarchy

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling during tutorial
- **High Contrast**: Clear visual separation between elements

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

- **Lazy Loading**: Tutorial components only load when needed
- **State Optimization**: Minimal re-renders with proper state management
- **Memory Efficient**: Cleans up event listeners and timers
- **Bundle Size**: ~15KB gzipped (including all tutorial components)

## Development

### Adding New Tutorial Steps

1. Add step definition to `tutorialSteps` array in `TutorialContext.tsx`
2. Ensure target element has proper CSS selector or class
3. Test positioning and responsiveness
4. Update step count in progress indicator

### Debugging

- Use browser dev tools to inspect tutorial state
- Check localStorage for `zip-tutorial-seen` key
- Verify target elements exist in DOM when tutorial runs
- Test keyboard navigation and mobile responsiveness

### Common Issues

**Tutorial not starting automatically:**
- Check if `hasSeenTutorial` is false in localStorage
- Verify `TutorialTrigger` is properly mounted
- Ensure correct page routing

**Element not highlighting properly:**
- Verify CSS selector matches target element
- Check if element exists when tutorial step runs
- Try alternative selectors or add specific classes

**Mobile responsiveness issues:**
- Test tooltip positioning on different screen sizes
- Verify touch interactions work properly
- Check z-index stacking context

## Future Enhancements

- [ ] Analytics integration for tutorial completion rates
- [ ] A/B testing for different tutorial flows
- [ ] Contextual tips that appear based on user behavior
- [ ] Video tutorials embedded in tooltip content
- [ ] Multi-language support for international users
- [ ] Tutorial customization based on user role or preferences