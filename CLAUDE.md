# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start Vite dev server (default: http://localhost:5173)
npm run build        # Build production bundle
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Architecture Overview

This is a React + Firebase family list sharing app with a **retro-futurism/cyberpunk aesthetic**. The key architectural concept is **surprise-preserving visibility**: list owners cannot see which items have been marked as "bought" by family members, but family members can see each other's purchases to avoid duplicates.

### Core Data Model

The app uses **four Firestore collections** with relationships:

1. **users** - User profiles with `familyId` reference
2. **families** - Family groups with `members[]` array
3. **lists** - Wishlists belonging to users within a family (`ownerId`, `familyId`)
4. **items** - Individual wishlist items with purchase tracking (`listId`, `isBought`, `boughtBy`)

### Authentication Flow

- Uses Firebase Auth with Google Sign-In popup
- On first login, creates user profile in Firestore (`src/lib/db.js:createUserProfile`)
- User must create/join a family before accessing main app (handled by `Onboarding.jsx`)
- `AuthContext.jsx` provides global auth state via `useAuth()` hook
- `PrivateRoute.jsx` redirects unauthenticated users to `/login`

### Visibility Logic (Critical Business Rule)

Located in `src/pages/ListView.jsx:109`:
```javascript
const isOwner = currentUser.uid === list.ownerId;
```

**If owner:** Can add/delete items, but CANNOT see `item.isBought` status or who bought items
**If not owner:** Can mark items as bought/unbought, sees "Bought by X" label

This is enforced purely client-side - conditionally renders purchase info only for non-owners. There are no Firestore security rules in development (must be added for production per README).

### State Management

- Global auth state: `AuthContext.jsx` (currentUser, loginWithGoogle, logout)
- Page-level state: Local useState hooks (no Redux/Zustand)
- Data fetching: Direct Firestore calls via `src/lib/db.js` utility functions
- No real-time listeners - uses manual `loadData()` refetches after mutations

### Firebase Configuration

Firebase config is **hardcoded** in `src/lib/firebase.js:6-14`. For deployment to a new Firebase project:
1. Update the config object with new project credentials
2. Enable Google Auth in Firebase Console
3. Enable Firestore Database
4. Add Vercel domain to Firebase authorized domains
5. Implement production Firestore security rules (see README)

### Routing Structure

- `/` - Home page (family dashboard with all lists)
- `/list/:listId` - Individual list view with items
- `/login` - Google sign-in page

All routes except `/login` are wrapped in `PrivateRoute` which redirects to login if not authenticated.

### Key Files

- `src/lib/db.js` - All Firestore CRUD operations (users, families, lists, items)
- `src/lib/firebase.js` - Firebase initialization and exports (auth, db)
- `src/pages/ListView.jsx` - Item management and visibility logic
- `src/pages/Home.jsx` - Family onboarding and list dashboard
- `src/contexts/AuthContext.jsx` - Global authentication state

### Styling - Retro-Futurism Design System

**Aesthetic:** Cyberpunk/Retro-Futurism (inspired by Blade Runner, Tron, Cyberpunk 2077)

**Architecture:**
- Modular CSS design system in `src/styles/`
- Component-specific CSS files co-located with components
- Mobile-first responsive design
- Dark theme with neon accents

**Design System Files:**
- `src/styles/retro-tokens.css` - Color palette, spacing, typography scale, shadows
- `src/styles/retro-fonts.css` - Font imports (Orbitron, Rajdhani, Share Tech Mono) and utilities
- `src/styles/retro-effects.css` - Visual effects (neon glows, scan lines, glitch, grids, holograms)
- `src/styles/index.css` - Global styles, base components (buttons, inputs), utilities

**Component Styles:**
- `src/pages/Login.css` - Login page styling
- `src/pages/Home.css` - Home dashboard styling
- `src/pages/ListView.css` - List view and item cards
- `src/components/Onboarding.css` - Onboarding panels

**Color Palette:**
```css
--cyber-bg-dark: #0a0e27;       /* Main background */
--cyber-bg-medium: #1a1f3a;     /* Cards */
--neon-cyan: #00ffff;           /* Primary accent */
--neon-magenta: #ff00ff;        /* Secondary accent */
--neon-pink: #ff006e;           /* Highlights */
--text-primary: #e0e0e0;        /* Light text */
--text-secondary: #00ffff;      /* Interactive text */
```

**Typography:**
- Headers: Orbitron (geometric, futuristic)
- Body: Rajdhani (clean, sci-fi)
- Monospace: Share Tech Mono (terminal-style)

**Visual Effects:**
- ✨ Neon glows with multi-layer text-shadow and box-shadow
- 📺 Scan lines overlay (fixed position, animated)
- ⚡ Glitch animations (RGB split with pseudo-elements)
- 🌈 Holographic gradients (cyan-magenta-pink)
- 🔲 Animated grid backgrounds (Tron-style)
- 💫 Pulse animations on interactive elements
- 🔺 Corner brackets for cyberpunk aesthetic

**Component Patterns:**
- Dark transparent cards with neon borders: `.retro-card`
- Neon outlined buttons with sweep effects: `.retro-btn`
- Form inputs with neon focus states: `input`, `textarea`
- Loading spinners with rotating borders: `.retro-spinner`
- Empty states with terminal-style prompts

## Current Status

### Branding ✅ COMPLETED
- App name: **"Listy"** (rebranded from "Listy Christmas")
- Browser title: "Listy"
- Favicon: Custom retro-futurism SVG with neon triangle and "L"
- Logo: **▲ LISTY ▲** with neon cyan glow and pulse animation
- Theme: Full retro-futurism/cyberpunk aesthetic

### UI Overhaul ✅ COMPLETED
- Complete CSS design system implemented
- All pages converted to dark theme with neon accents
- Improved text contrast and readability
- Mobile-responsive retro styling
- Accessibility features (reduced motion, WCAG AA contrast)

### Active Planning Documents
- `PRD_RETRO_FUTURISM.md` - Product requirements for retro-futurism overhaul
- `IMPLEMENTATION_PLAN_RETRO.md` - 8-phase TDD implementation plan
- `RETRO_UI_RESEARCH.md` - Research on retro aesthetic options

### Implementation Notes
When making changes to the UI:
1. Follow the retro-futurism design patterns in existing components
2. Use design tokens from `retro-tokens.css` (never hardcode colors)
3. Apply neon glow effects to interactive elements
4. Include corner brackets on panels and cards
5. Ensure WCAG AA contrast ratios (light text on dark backgrounds)
6. Support `prefers-reduced-motion` for accessibility
7. Maintain mobile-first responsive design
