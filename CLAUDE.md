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

This is a React + Firebase Christmas wishlist app with a family-sharing system. The key architectural concept is **surprise-preserving visibility**: list owners cannot see which items have been marked as "bought" by family members, but family members can see each other's purchases to avoid duplicates.

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

Located in `src/pages/ListView.jsx:88-89`:
```javascript
const isOwner = currentUser.uid === list.ownerId;
```

**If owner:** Can add/delete items, but CANNOT see `item.isBought` status or who bought items
**If not owner:** Can mark items as bought/unbought, sees "Bought by X" label

This is enforced purely client-side - line 174-179 conditionally renders purchase info only for non-owners. There are no Firestore security rules in development (must be added for production per README).

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
5. Implement production Firestore security rules (see README lines 93-121)

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

### Styling

- Uses plain CSS in `src/styles/index.css` and inline styles
- Mobile-first responsive design
- CSS variables: `--primary-color` (#165b33 green), `--secondary-color` (#d42426 red)
- Christmas theme with Lato font (lines in index.css)

## Current Work

### Active Planning Documents
- `PRD.md` - Product Requirements Document for app improvements (branding ✅, icons ✅, mobile UX 🚧)
- `IMPLEMENTATION_PLAN.md` - Detailed TDD implementation plan with task breakdown

### Branding ✅ COMPLETED (Commit: f25d576)
- App name: "Listy Christmas"
- Browser title: "Listy Christmas"
- Visual identity: Christmas tree icon/emoji 🎄 (SVG data URI favicon)
- All headers updated across Login, Home, and Onboarding pages
- Color scheme: Green (#165b33) and Red (#d42426) festive theme

### Remaining Work
- Mobile UI/UX optimization audit and implementation
