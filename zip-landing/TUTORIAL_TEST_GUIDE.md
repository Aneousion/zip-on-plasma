# Tutorial System Test Guide

## ✅ **Testing the Component Highlighting Tutorial**

The tutorial now properly highlights components with a dark overlay and spotlight effect. Here's how to test it:

### **Start Tutorial Test**
1. Open http://localhost:3001 
2. Click "Continue with X" or "Continue with Wallet" button
3. Tutorial should start automatically on dashboard

### **Expected Behavior - Component Highlighting**

#### **Step 1: Welcome** 
- ✅ Center modal overlay (no highlighting)
- Shows welcome message

#### **Step 2: Navigation**
- ✅ **Dark overlay** covers entire screen
- ✅ **Spotlight** highlights the navigation bar at top
- ✅ **Tooltip** appears below navigation with arrow pointing up

#### **Step 3: Search**
- ✅ **Spotlight** highlights the search input field  
- ✅ **Tooltip** positioned below search bar

#### **Step 4: Profile**
- ✅ **Spotlight** highlights user profile area (top right)
- ✅ **Tooltip** appears with arrow pointing to profile

#### **Step 5: Trending Tabs** 
- ✅ **Spotlight** highlights the tab navigation area
- ✅ Targets `[data-tutorial="tab-navigation"]` element

#### **Step 6: Time Filters**
- ✅ **Spotlight** highlights time filter buttons (1h, 4h, 24h, 7d)
- ✅ Targets `[data-tutorial="time-filters"]` element

#### **Step 7: Data Table**
- ✅ **Spotlight** highlights the main content feed area
- ✅ Shows trending accounts/tweets list

#### **Step 8: Profile Transition**
- ✅ Center modal asking to continue to profile
- ✅ Clicking "Continue" navigates to profile page

#### **Steps 9-13: Profile Page**
- ✅ Tutorial continues on profile page
- ✅ Highlights profile picture, earnings, claim button, etc.
- ✅ Uses data attributes: `[data-tutorial="profile-overview"]`, etc.

### **Visual Elements to Verify**

#### **Spotlight Effect**
- Dark semi-transparent overlay covers entire screen
- Highlighted element has a "cut-out" bright area
- 8px padding around highlighted element
- Smooth transitions between steps

#### **Tooltip Design**
- Dark background `#0f0f0f` 
- Green border `#4a9b5f`
- Arrow pointing to highlighted element
- Progress dots showing current step
- Next/Previous/Skip buttons

#### **Responsive Behavior**
- Tooltip stays within viewport bounds
- Works on mobile, tablet, desktop
- Touch-friendly button sizes

### **Interactive Features**

#### **Navigation**
- ✅ **Next Button**: Advances to next step
- ✅ **Previous Button**: Goes back (when available)
- ✅ **Skip Button**: Exits tutorial completely  
- ✅ **Close (X)**: Exits tutorial

#### **Keyboard Support**
- ✅ **Arrow Right/Enter**: Next step
- ✅ **Arrow Left**: Previous step  
- ✅ **Escape**: Close tutorial

#### **State Persistence**
- ✅ First visit: Tutorial auto-starts
- ✅ Return visits: No auto-start (stored in localStorage)
- ✅ Manual replay: "Show Tutorial" button available

### **Cross-Page Navigation Test**
1. Start tutorial on dashboard
2. Progress through steps 1-7
3. On step 8 click "Continue" 
4. ✅ Should navigate to `/profile`
5. ✅ Tutorial continues with profile steps
6. ✅ Back button should work to return to dashboard steps

### **Error Scenarios**

#### **Missing Elements**
- ✅ If target element not found, gracefully degrades
- ✅ Fallback selectors attempt to find alternative targets
- ✅ Tutorial doesn't break or cause infinite loops

#### **Page Navigation**
- ✅ Direct navigation to /profile during tutorial works
- ✅ Browser back/forward buttons don't break tutorial
- ✅ Page refresh preserves tutorial state appropriately

### **Performance Check**
- ✅ No "Maximum update depth exceeded" errors
- ✅ Smooth animations without lag
- ✅ No memory leaks from event listeners
- ✅ Fast load times

### **Browser Compatibility**
Test in:
- ✅ Chrome
- ✅ Firefox  
- ✅ Safari
- ✅ Edge

### **Debug Tips**

If highlighting doesn't work:
1. Check browser console for errors
2. Verify data attributes exist on target elements
3. Ensure tutorial step targets match actual DOM structure
4. Check if CSS classes are being applied correctly

If infinite loops occur:
1. Check useEffect dependencies
2. Verify state updates aren't causing re-renders
3. Look for circular state updates in tutorial context

---

## **Expected Result** ✅

A smooth, professional tutorial experience that:
- Highlights specific UI components with spotlight effect
- Guides users through all key platform features  
- Works seamlessly across desktop and mobile
- Provides intuitive navigation and exit options
- Preserves user preferences and state