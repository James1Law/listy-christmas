# ▲ Listy ▲

A retro-futurism styled family list sharing application. Create wishlists, share with family members, and shop collaboratively—with a surprise-preserving visibility system that keeps purchases secret from list owners!

## ✨ Features

- 🔐 **Google Authentication** - Secure sign-in with Firebase Auth
- 👨‍👩‍👧‍👦 **Family Groups** - Create or join families to share lists
- 📝 **Multiple Lists** - Create wishlists for yourself or family members
- 🎁 **Surprise Mode** - List owners can't see what's been bought for them
- ✅ **Collaborative Shopping** - Family members can mark items as "bought"
- 📱 **Mobile First** - Optimized for on-the-go list management
- 🎨 **Retro-Futurism UI** - Cyberpunk-inspired design with neon glows, scan lines, and maximum visual effects
- ⚡ **Maximum Effects** - Glitch animations, holographic gradients, and animated grids

## 🎨 Design System

**Aesthetic**: Retro-Futurism / Cyberpunk

**Color Palette**:
- Dark backgrounds: Deep space blue (#0a0e27)
- Primary accent: Neon cyan (#00ffff)
- Secondary accent: Neon magenta (#ff00ff)
- Highlights: Neon pink (#ff006e)

**Typography**:
- Headers: [Orbitron](https://fonts.google.com/specimen/Orbitron) - Geometric, futuristic
- Body: [Rajdhani](https://fonts.google.com/specimen/Rajdhani) - Clean, sci-fi inspired
- Monospace: [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono) - Terminal-style

**Visual Effects**:
- ✨ Neon glows with multi-layer shadows
- 📺 Animated scan lines overlay
- ⚡ Glitch effects (RGB split on text)
- 🌈 Holographic gradients
- 🔲 Tron-style animated grid backgrounds
- 💫 Pulse animations on interactive elements
- 🔺 Corner brackets for cyberpunk aesthetic

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- A Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/James1Law/listy-christmas.git
cd listy-christmas
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or use existing)
   - Enable **Authentication** → **Google** sign-in method
   - Enable **Firestore Database** (start in test mode for development)
   - Register a web app and copy the config

4. Update Firebase configuration in `src/lib/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. Run locally:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Post-Deployment: Update Firebase

After deploying, you need to authorize your Vercel domain in Firebase:

1. Go to **Firebase Console** → **Authentication** → **Settings**
2. Under **Authorized domains**, add your Vercel URL (e.g., `your-app.vercel.app`)

## 🔒 Production Security

> [!CAUTION]
> Before going live, set up Firestore Security Rules!

Replace the default rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Family members can read family data
    match /families/{familyId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Family members can read all lists in their family
    match /lists/{listId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }

    // Family members can read/write items
    match /items/{itemId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📖 How It Works

### The "Surprise" Visibility Logic

1. **List Owner** adds items to their wishlist
2. **Family Members** can view the list and mark items as "bought"
3. **List Owner** cannot see which items have been marked as bought (preserves the surprise!)
4. **Other Family Members** can see who bought what (prevents duplicate purchases)

This visibility logic is implemented in `src/pages/ListView.jsx:88-89`:
```javascript
const isOwner = currentUser.uid === list.ownerId;
// Owners cannot see purchase status, others can
```

### Sharing Your Family

1. After creating a family, you'll see a **Family ID** on the dashboard
2. Click the **Copy** button next to the ID
3. Share it with family members (text, email, etc.)
4. They can join by pasting the ID on the onboarding screen

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite 7
- **Routing**: React Router v7
- **Authentication**: Firebase Auth (Google Sign-In)
- **Database**: Firestore
- **Icons**: Lucide React
- **Hosting**: Vercel
- **Styling**: Custom CSS with retro-futurism design system

## 📂 Project Structure

```
src/
├── components/           # Reusable components
│   ├── Onboarding.jsx   # Family creation/join flow
│   ├── Onboarding.css   # Onboarding retro styling
│   └── PrivateRoute.jsx # Auth route protection
├── contexts/            # React Context providers
│   └── AuthContext.jsx  # Global auth state
├── lib/                 # Utilities and config
│   ├── firebase.js      # Firebase initialization
│   └── db.js            # Firestore CRUD operations
├── pages/               # Route pages
│   ├── Home.jsx         # Dashboard with family lists
│   ├── Home.css         # Home page retro styling
│   ├── ListView.jsx     # Individual list with items
│   ├── ListView.css     # List view retro styling
│   ├── Login.jsx        # Google sign-in page
│   └── Login.css        # Login page retro styling
└── styles/              # Global design system
    ├── retro-tokens.css # Color palette & design tokens
    ├── retro-fonts.css  # Typography system
    ├── retro-effects.css# Visual effects (glows, glitch, scan lines)
    └── index.css        # Global styles & base components
```

## 🎯 Design Philosophy

**Listy** embraces a retro-futurism aesthetic inspired by:
- Blade Runner (1982) - Neon city interfaces
- Tron (1982) - Grid systems and glowing lines
- Cyberpunk 2077 - Neon UI and glitch effects
- Synthwave/Outrun - Neon colors and grid horizons
- 80s sci-fi computer terminals

The design combines nostalgic retro computing aesthetics with modern UX patterns, creating a unique and memorable visual identity while maintaining excellent usability and accessibility.

## ♿ Accessibility

- WCAG AA compliant color contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Focus indicators visible with neon glow
- Reduced motion support via `prefers-reduced-motion`
- Screen reader compatible
- Mobile-friendly touch targets (minimum 44px)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT License - feel free to use this for your own family lists!

---

Built with ⚡ using retro-futurism aesthetics • **▲ Listy ▲** - Your family list system
