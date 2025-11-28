# Product Requirements Document: Listy Christmas App Improvements

## Overview
Refinement of the Christmas gift list app to improve branding consistency, visual identity, and mobile user experience.

## Goals
1. Establish consistent branding with "Listy Christmas" naming
2. Improve visual identity with festive iconography
3. Optimize mobile UI/UX for primary use case (shopping on-the-go)

## Requirements

### 1. App Title Update ✅ COMPLETED
**Priority:** High
**Effort:** Low
**Status:** ✅ Shipped (Commit: f25d576)

**Current State:**
- Browser tab shows default Vite title
- Potentially inconsistent naming across the app

**Desired State:**
- Browser tab title: "Listy Christmas"
- All meta tags updated
- Consistent naming throughout

**Acceptance Criteria:**
- [x] Browser tab displays "Listy Christmas"
- [x] Document title in `index.html` updated
- [x] Favicon updated to Christmas tree emoji 🎄

---

### 2. Header Branding Update ✅ COMPLETED
**Priority:** High
**Effort:** Low
**Status:** ✅ Shipped (Commit: f25d576)

**Current State:**
- Header displays "Christmas List App" (generic)
- Located in `src/pages/Home.jsx` and `src/pages/Login.jsx`

**Desired State:**
- Header displays "Listy Christmas" (branded)
- Consistent across all pages

**Acceptance Criteria:**
- [x] Home page header shows "Listy Christmas"
- [x] Login page header shows "Listy Christmas" (with 🎄 emojis)
- [x] Onboarding flow shows "Listy Christmas"
- [x] Visual consistency maintained

---

### 3. Christmas Tree Favicon ✅ COMPLETED (Basic)
**Priority:** Medium
**Effort:** Medium
**Status:** ✅ Shipped (Commit: f25d576) - Basic emoji SVG implemented

**Current State:**
- Default Vite/React favicon (likely)
- No festive branding in browser tab

**Desired State:**
- Christmas tree emoji or SVG icon as favicon
- Visible in browser tabs, bookmarks, PWA

**Acceptance Criteria:**
- [x] Favicon displays Christmas tree icon 🎄
- [x] Icon visible in browser tab
- [ ] Multiple sizes provided (16x16, 32x32, 192x192, 512x512) - *Future enhancement if needed*
- [ ] Apple touch icon included for iOS - *Future enhancement if needed*
- [ ] Manifest icons updated - *Future enhancement if needed*

**Technical Approach:**
- ✅ **Option A: Use 🎄 emoji as SVG favicon** - Implemented via data URI

---

### 4. Mobile UI/UX Optimization
**Priority:** High
**Effort:** Medium-High

**Current State:**
- Mobile-first design exists
- Some inline styles may not be optimized
- Touch targets may need review
- Spacing/padding may need refinement

**Areas to Audit:**
1. **Touch Targets** - Ensure 44x44px minimum for buttons
2. **Spacing** - Review padding/margins on small screens
3. **Typography** - Font sizes for readability on mobile
4. **Forms** - Input field sizing and keyboard handling
5. **Navigation** - Back button prominence
6. **Visual Hierarchy** - Information density on small screens
7. **Lists/Cards** - Item layout optimization
8. **Sticky Elements** - Header behavior on scroll (if applicable)

**Desired State:**
- All interactive elements meet touch target minimums
- Comfortable spacing for thumb-friendly navigation
- Optimized information density
- Smooth, native-like mobile experience

**Acceptance Criteria:**
- [ ] All buttons/links minimum 44x44px touch target
- [ ] Comfortable padding on card edges (16-20px)
- [ ] Form inputs easy to tap and fill on mobile
- [ ] Lists scroll smoothly without layout shift
- [ ] No horizontal scroll on any screen width
- [ ] Text remains readable at all viewport sizes
- [ ] Common actions easily accessible with one thumb

---

## Implementation Plan

### Phase 1: Branding Updates (Quick Wins)
**Effort:** ~30 minutes
**Tasks:**
1. Update `index.html` title tag
2. Update header text in `Home.jsx`
3. Check and update any other instances

### Phase 2: Icon/Favicon Update
**Effort:** ~1 hour
**Tasks:**
1. Generate/create Christmas tree favicon
2. Generate multiple sizes (16, 32, 192, 512)
3. Update `index.html` favicon references
4. Add apple-touch-icon
5. Update manifest.json (if exists)

### Phase 3: Mobile UI Audit
**Effort:** ~1 hour
**Tasks:**
1. Review app on mobile viewport (Chrome DevTools)
2. Document touch target issues
3. Document spacing/layout issues
4. Create prioritized improvement list

### Phase 4: Mobile UI Implementation
**Effort:** ~2-3 hours
**Tasks:**
1. Fix critical touch target issues
2. Optimize spacing and padding
3. Refine form layouts
4. Improve list/card layouts
5. Test on actual mobile device

---

## TDD Approach

Since this is primarily UI/UX work without complex logic, testing will focus on:

1. **Visual Regression Testing** (manual)
   - Screenshot comparison before/after
   - Test on multiple viewport sizes

2. **Accessibility Testing**
   - Touch target sizes (can verify with browser inspector)
   - Color contrast ratios
   - Semantic HTML

3. **Functional Testing** (manual)
   - Test all interactions on mobile viewport
   - Verify no broken layouts
   - Test form submissions

4. **Cross-browser Testing**
   - Chrome Mobile
   - Safari iOS
   - Chrome Android

**Test Checklist Template:**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768px)
- [ ] Mobile (375px - iPhone SE)
- [ ] Mobile (390px - iPhone 12/13/14)
- [ ] Mobile (430px - iPhone 14 Pro Max)
- [ ] All interactive elements accessible
- [ ] No layout overflow
- [ ] Forms functional
- [ ] Navigation works

---

## Success Metrics

1. **Branding Consistency:** 100% of UI shows "Listy Christmas"
2. **Visual Identity:** Christmas tree icon visible in all contexts
3. **Mobile Usability:** All touch targets ≥ 44px, comfortable spacing
4. **User Feedback:** Improved mobile experience (qualitative)

---

## Out of Scope

- Backend/Firestore changes
- Authentication flow changes
- Data model changes
- Desktop-specific optimizations
- Performance optimizations (unless mobile-specific)

---

## Risk & Considerations

1. **Favicon Complexity:** May need to generate multiple sizes/formats
2. **Mobile Testing:** Limited to browser DevTools unless tested on real device
3. **Breaking Changes:** CSS changes could affect desktop layout (need regression testing)
4. **Browser Compatibility:** SVG favicons not supported in all browsers (fallback needed)
