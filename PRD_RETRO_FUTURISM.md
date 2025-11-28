# Product Requirements Document: Listy - Retro-Futurism UI Overhaul

## Overview
Transform "Listy Christmas" into "Listy" - a retro-futuristic, cyberpunk-inspired list-sharing application with maximum visual effects including neon glows, scan lines, glitch animations, and holographic elements while maintaining modern UX patterns.

## Goals
1. **Rebrand:** "Listy Christmas" → "Listy" (universal, year-round branding)
2. **Visual Identity:** Establish unique retro-futurism/cyberpunk aesthetic
3. **User Experience:** Maximum retro effects while maintaining usability
4. **Differentiation:** Stand out from typical modern minimalist apps

## Target Aesthetic: Retro-Futurism/Cyberpunk

**Visual References:**
- Blade Runner (1982) - Neon city, holographic interfaces
- Tron (1982) - Grid systems, glowing lines
- Cyberpunk 2077 - Neon UI, glitch effects
- Synthwave/Outrun aesthetic - Neon colors, grid horizons
- 80s sci-fi computer terminals

---

## Design System

### Color Palette

**Primary Colors:**
```css
--cyber-bg-dark: #0a0e27;        /* Deep space blue - main background */
--cyber-bg-medium: #1a1f3a;      /* Medium background - cards */
--cyber-bg-light: #2a3254;       /* Light background - hover states */

--neon-cyan: #00ffff;            /* Primary neon - buttons, borders */
--neon-magenta: #ff00ff;         /* Secondary neon - accents */
--neon-pink: #ff006e;            /* Tertiary - highlights */
--neon-blue: #00d9ff;            /* Links, info */
--neon-purple: #bd00ff;          /* Special states */

--hologram-1: #00fff2;           /* Holographic gradient start */
--hologram-2: #b721ff;           /* Holographic gradient middle */
--hologram-3: #ff006e;           /* Holographic gradient end */

--grid-line: rgba(0, 255, 255, 0.2);  /* Grid overlay */
--scan-line: rgba(0, 255, 255, 0.05); /* Scan line overlay */

--text-primary: #e0e0e0;         /* Main text */
--text-secondary: #00ffff;       /* Highlighted text */
--text-muted: #6b7280;           /* Muted/disabled text */

--danger: #ff0055;               /* Delete/error */
--success: #00ff88;              /* Success states */
--warning: #ffaa00;              /* Warning states */
```

### Typography

**Fonts:**
- **Headers:** [Orbitron](https://fonts.google.com/specimen/Orbitron) - Geometric, futuristic
- **Body:** [Rajdhani](https://fonts.google.com/specimen/Rajdhani) - Clean, readable, sci-fi
- **Monospace:** [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) - Terminal-style

**Scale:**
```css
--text-xs: 0.75rem;    /* 12px - Small labels */
--text-sm: 0.875rem;   /* 14px - Secondary text */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Large text */
--text-xl: 1.25rem;    /* 20px - Small headings */
--text-2xl: 1.5rem;    /* 24px - Section headings */
--text-3xl: 2rem;      /* 32px - Page headings */
--text-4xl: 2.5rem;    /* 40px - Hero text */
```

### Visual Effects (Maximum Level)

**1. Neon Glow**
```css
text-shadow:
  0 0 5px currentColor,
  0 0 10px currentColor,
  0 0 20px currentColor,
  0 0 40px currentColor;

box-shadow:
  0 0 5px var(--neon-cyan),
  0 0 10px var(--neon-cyan),
  0 0 20px var(--neon-cyan),
  inset 0 0 10px rgba(0, 255, 255, 0.2);
```

**2. Scan Lines Overlay**
- Repeating linear gradient
- Subtle animation scrolling down
- Low opacity (5-10%)

**3. CRT Screen Curvature**
- Slight barrel distortion on main content
- Border vignette effect

**4. Glitch Animation**
- Occasional RGB split effect
- Text displacement
- Static noise overlay
- Triggered on interactions or randomly

**5. Holographic Gradient**
```css
background: linear-gradient(
  135deg,
  var(--hologram-1) 0%,
  var(--hologram-2) 50%,
  var(--hologram-3) 100%
);
animation: hologram-shift 3s ease-in-out infinite;
```

**6. Grid Background**
- Perspective grid (Tron-style)
- Animated horizon line
- Optional parallax on scroll

**7. Particle System** (Optional)
- Floating particles in background
- Canvas-based or CSS animations
- Low performance impact

---

## Component Specifications

### Buttons

**Primary Button (Neon Cyan):**
```
Visual:
- Border: 2px solid neon-cyan with glow
- Background: Transparent → neon-cyan gradient on hover
- Text: neon-cyan → dark on hover
- Corner accents (small triangles or hexagons)
- Pulse animation on idle
- Glitch effect on click

States:
- Default: Outlined with glow
- Hover: Filled with gradient + increased glow
- Active: Compressed + glitch effect
- Disabled: Muted color, no glow
```

**Secondary Button (Neon Magenta):**
- Same structure, different color

**Danger Button (Neon Red/Pink):**
- Same structure, red/pink colors

### Cards

**List/Item Cards:**
```
Visual:
- Background: Semi-transparent dark with blur
- Border: 1px solid neon-cyan with glow
- Corner brackets ([ ]) for cyberpunk feel
- Holographic gradient on hover
- Subtle scan line overlay
- Data streams animation on sides (optional)

Layout:
┌─[LIST]────────────────────┐
│ ▸ Shopping List           │
│   12 items • 3 bought     │
│                            │
│ [VIEW] ──────────── [···] │
└────────────────────────────┘
```

### Inputs

**Text Fields:**
```
Visual:
- Border: 1px solid neon-cyan (bottom only or full)
- Background: Transparent or very dark
- Text: neon-cyan color
- Placeholder: Muted with cursor blink
- Focus: Increased glow, border animation
- Label: Floating above in smaller font

Animation:
- Typing: Slight glitch effect on characters
- Focus: Border glow intensifies
- Error: Red glow + shake animation
```

### Headers

**Page Headers:**
```
┌═══════════════════════════════┐
║  ▲ L I S T Y ▲              ║  ← Stylized logo
║  ─────────────────────────    ║
║  > Family Lists               ║  ← Breadcrumb/context
║                               ║
║  [NEW]  [FAMILY]  [LOGOUT]   ║  ← Action buttons
└═══════════════════════════════┘
```

**Features:**
- Animated scan line across header
- Pulsing glow on logo
- Corner brackets for frame
- Optional: Animated grid background

### Navigation

**Back Button:**
```
[◀ RETURN]  or  [← BACK TO LISTS]
```
- Neon outline
- Glow on hover
- Arrow animation

### Loading States

**Spinner:**
- Rotating hexagon or circuit pattern
- Neon cyan with trail
- Glitch effect during load

**Progress Bars:**
- Neon gradient fill
- Animated scan line
- Percentage in monospace font

### Modals/Dialogs

```
┌─[WARNING]──────────────────┐
│                             │
│  Delete this list?          │
│                             │
│  This cannot be undone.     │
│                             │
│  [CANCEL]    [◢ DELETE ◣]  │
└─────────────────────────────┘
```

- Dark background with blur
- Neon border with glow
- Corner accents
- Glitch animation on open

---

## Page-by-Page Requirements

### 1. Login Page

**Layout:**
```
┌─────────────────────────────────┐
│        ▲ L I S T Y ▲           │
│    YOUR FAMILY LIST SYSTEM      │
│                                 │
│  ┌──────────────────────────┐  │
│  │                          │  │
│  │  [Initialize System]     │  │
│  │                          │  │
│  │  🔐 SIGN IN WITH GOOGLE  │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  SYSTEM VERSION 2.0            │
└─────────────────────────────────┘
```

**Features:**
- Animated grid background
- Pulsing neon logo
- Button with holographic hover
- Scan lines overlay
- Optional: Matrix-style character rain in background

**Acceptance Criteria:**
- [ ] Retro-futuristic styling implemented
- [ ] Neon glow effects on logo and button
- [ ] Animated background (grid or particles)
- [ ] Scan lines overlay visible
- [ ] Google sign-in button styled with neon aesthetic
- [ ] Responsive on mobile (effects optimized)
- [ ] Glitch animation on button hover

---

### 2. Home Page (Dashboard)

**Layout:**
```
┌═══════════════════════════════════┐
║  ▲ LISTY ▲        [ID: xxx] [⚙] ║
║  ─────────────────────────────    ║
║  > FAMILY DASHBOARD               ║
╠═══════════════════════════════════╣
║                                   ║
║  ┌─[LISTS]────────┐ ┌─[LISTS]─┐ ║
║  │ Shopping       │ │ Gifts    │ ║
║  │ 8 items        │ │ 3 items  │ ║
║  │ [VIEW >]       │ │ [VIEW >] │ ║
║  └────────────────┘ └──────────┘ ║
║                                   ║
║  [+ NEW LIST]                     ║
║                                   ║
╚═══════════════════════════════════╝
```

**Features:**
- Grid layout for lists (responsive)
- Each list card has holographic hover effect
- Family ID displayed in header with copy button (glitch on copy)
- New List button with neon glow
- Corner brackets on cards
- Scan lines overlay

**Acceptance Criteria:**
- [ ] Header with logo and family ID
- [ ] Grid of list cards with neon borders
- [ ] Hover effects (holographic gradient)
- [ ] New List button with maximum effects
- [ ] Empty state with retro messaging
- [ ] Logout button styled
- [ ] Mobile responsive grid

---

### 3. List View Page

**Layout:**
```
┌═══════════════════════════════════┐
║  [◀ RETURN]                       ║
║  ─────────────────────────────    ║
║  > SHOPPING LIST                  ║
║    Owner: James                   ║
╠═══════════════════════════════════╣
║                                   ║
║  [+ ADD ITEM]                     ║
║                                   ║
║  ┌─[ITEM]─────────────────────┐  ║
║  │ ▸ Red Sweater              │  ║
║  │   $49.99 • Link            │  ║
║  │   Status: Available        │  ║
║  │   [MARK BOUGHT] [DELETE]   │  ║
║  └────────────────────────────┘  ║
║                                   ║
║  ┌─[ITEM]─────────────────────┐  ║
║  │ ▸ Blue Jeans               │  ║
║  │   $79.99                   │  ║
║  │   ✓ Bought by Sarah        │  ║
║  │   [UNMARK]                 │  ║
║  └────────────────────────────┘  ║
║                                   ║
╚═══════════════════════════════════╝
```

**Features:**
- Back button with arrow animation
- Add Item form with neon inputs
- Item cards with status indicators
- Bought items have different glow color (green)
- Delete button with danger styling
- Link icon with external indicator

**Acceptance Criteria:**
- [ ] Back button with neon styling
- [ ] List title with owner info
- [ ] Add Item form (owners only) with retro inputs
- [ ] Item cards with neon borders
- [ ] Status indicators (available vs bought)
- [ ] Action buttons (Mark Bought, Delete)
- [ ] Visibility logic maintained (owners can't see bought status)
- [ ] Glitch animations on interactions

---

### 4. Onboarding Flow

**Create Family:**
```
┌─────────────────────────────────┐
│  > INITIALIZE FAMILY SYSTEM     │
│  ─────────────────────────────  │
│                                 │
│  Enter family name:             │
│  ┌──────────────────────────┐  │
│  │ [_________________]      │  │
│  └──────────────────────────┘  │
│                                 │
│  [CREATE FAMILY UNIT]           │
│                                 │
│  ─── OR ───                     │
│                                 │
│  [JOIN EXISTING FAMILY]         │
└─────────────────────────────────┘
```

**Join Family:**
```
┌─────────────────────────────────┐
│  > JOIN FAMILY SYSTEM           │
│  ─────────────────────────────  │
│                                 │
│  Enter family ID:               │
│  ┌──────────────────────────┐  │
│  │ [_________________]      │  │
│  └──────────────────────────┘  │
│                                 │
│  [INITIATE CONNECTION]          │
│                                 │
│  [◀ BACK]                       │
└─────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Onboarding modal/page with retro styling
- [ ] Input fields with neon focus states
- [ ] Toggle between Create/Join modes
- [ ] Success animation with glitch effect
- [ ] Error states with red glow

---

## Effects Implementation Details

### Scan Lines
```css
.scan-lines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(10px); }
}
```

### Glitch Effect
```css
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 #ff00ff;
  animation: glitch-1 0.3s infinite;
}

.glitch-text::after {
  left: -2px;
  text-shadow: 2px 0 #00ffff;
  animation: glitch-2 0.3s infinite;
}
```

### Grid Background
```css
.grid-background {
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  perspective: 1000px;
}

.grid-background::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--cyber-bg-dark)
  );
  transform: rotateX(60deg);
}
```

### Neon Border Animation
```css
@keyframes neon-pulse {
  0%, 100% {
    box-shadow:
      0 0 5px var(--neon-cyan),
      0 0 10px var(--neon-cyan);
  }
  50% {
    box-shadow:
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan),
      0 0 30px var(--neon-cyan);
  }
}
```

---

## Rebranding Checklist

**Name Change: "Listy Christmas" → "Listy"**

- [ ] Update `index.html` title
- [ ] Update all page headers
- [ ] Update README.md
- [ ] Update CLAUDE.md
- [ ] Update Firebase project name (if desired)
- [ ] Update repository name (if desired)
- [ ] Update Vercel project name (if desired)
- [ ] Update any hardcoded strings in code
- [ ] Create new logo/icon (stylized "LISTY" in retro-futurism style)

---

## Performance Considerations

**Heavy effects may impact mobile performance:**

1. **Conditional Loading:**
   - Detect device capability
   - Reduce effects on low-end devices
   - Provide toggle in settings to disable effects

2. **Optimization Techniques:**
   - Use `will-change` for animated elements
   - Limit number of glows (expensive box-shadow)
   - Use CSS transforms (GPU-accelerated)
   - Debounce/throttle animations
   - Lazy load background effects

3. **Progressive Enhancement:**
   - Base: Colors + fonts (works everywhere)
   - Enhanced: Glows + borders
   - Maximum: Scan lines + glitch + particles

---

## Success Metrics

**User Experience:**
- App remains usable with all effects enabled
- Load time < 3 seconds on mobile
- No jank during interactions (60fps)
- Animations feel smooth, not distracting

**Visual Impact:**
- Unique, memorable aesthetic
- Consistent retro-futurism theme
- Professional, not amateurish
- Accessible (contrast ratios meet WCAG standards)

**Technical:**
- All effects work on modern browsers (Chrome, Safari, Firefox)
- Graceful degradation on older browsers
- Mobile responsive at all viewport sizes
- No layout shift during effect animations

---

## Browser Support

**Target Browsers:**
- Chrome 90+ ✅
- Safari 14+ ✅
- Firefox 88+ ✅
- Edge 90+ ✅
- Mobile Safari (iOS 14+) ✅
- Chrome Mobile (Android) ✅

**Effects that may need fallbacks:**
- Backdrop blur (not supported in older Firefox)
- CSS filters (may be slow on low-end devices)
- Advanced gradients (graceful degradation)

---

## Accessibility Considerations

**While maximizing effects:**
1. Maintain WCAG AA contrast ratios (4.5:1 for text)
2. Provide reduced motion preference
3. Ensure keyboard navigation works
4. Screen reader compatibility
5. Focus indicators visible with neon glow

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Out of Scope

- Backend/Firestore changes (data model stays the same)
- Authentication method changes (keeping Google only)
- New features (focus is on visual overhaul)
- Sound effects (could be added later)
- Mobile app (remains web-only)

---

## Next Steps

1. ✅ PRD Complete
2. Create TDD Implementation Plan
3. Design and build CSS design system
4. Build prototype (Login page)
5. Get user feedback
6. Iterate and roll out to remaining pages
7. Test performance and optimize
8. Launch rebrand!
