# 🎄 Listy Christmas

A mobile-first web application for managing family Christmas wishlists. Create lists, add items, and shop for loved ones—with a surprise-preserving visibility system that hides "bought" status from the list owner!

## ✨ Features

- 🔐 **Google Authentication** - Secure sign-in with Firebase Auth
- 👨‍👩‍👧‍👦 **Family Groups** - Create or join families to share lists
- 📝 **Multiple Lists** - Create wishlists for yourself or your kids
- 🎁 **Surprise Mode** - List owners can't see what's been bought for them
- ✅ **Collaborative Shopping** - Family members can mark items as "bought"
- 📱 **Mobile First** - Optimized for shopping on-the-go
- 🎨 **Festive UI** - Christmas-themed design with custom fonts

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
    
    // Family members can read/write items, but not see bought status if they're the owner
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
- **Styling**: CSS (Mobile-first responsive design)

## 📂 Project Structure

```
src/
├── components/         # Reusable components
│   ├── Onboarding.jsx # Family creation/join flow
│   └── PrivateRoute.jsx
├── contexts/          # React Context providers
│   └── AuthContext.jsx
├── lib/               # Utilities and config
│   ├── firebase.js    # Firebase initialization
│   └── db.js          # Firestore operations
├── pages/             # Route pages
│   ├── Home.jsx       # Dashboard with family lists
│   ├── ListView.jsx   # Individual list with items
│   └── Login.jsx      # Google sign-in page
└── styles/
    └── index.css      # Global styles
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT License - feel free to use this for your own family!

---

Built with ❤️ for family holiday shopping
