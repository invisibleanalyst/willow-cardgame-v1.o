# 🌙 Willow Date Night Edition

A romantic couple's game app built with Next.js, designed to spark love and joy on date nights. Transform modern connections with interactive prompts, progressive intimacy levels, and beautiful dark/light mode themes.

![Willow Date Night](https://img.shields.io/badge/Willow-Date%20Night%20Edition-00FFAA?style=for-the-badge&logo=heart&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Ready-4285F4?style=for-the-badge&logo=pwa)

## ✨ Features

### 🎮 **Interactive Gameplay**
- **335+ Romantic Prompts** across 3 tiers (Spark, Vibe Check, Lock-In Level)
- **Swipe Mechanics** - Left to skip, right to answer
- **Progressive Intimacy System** - Unlock deeper tiers as you connect
- **Real-time 2-Player Sync** - Play together with your partner
- **Voice & Text Input** - Answer prompts your way

### 🎨 **Beautiful Design**
- **Dark/Light Mode Toggle** - Choose your preferred theme
- **Mobile-First Responsive** - Perfect on all devices
- **PWA Ready** - Install as a native app
- **Smooth Animations** - Framer Motion powered interactions
- **Craftwork Grotesque Font** - Professional typography

### 🤖 **AI-Powered Features**
- **Sentiment Analysis** - AI analyzes answer depth and emotion
- **Adaptive Nudging** - Encourages deeper, more meaningful responses
- **Personalized Feedback** - Tailored suggestions based on your answers
- **Smart Progression** - AI helps guide your relationship journey

### 💳 **Monetization Ready**
- **Free Tier** - Full Spark mode (35 prompts), limited Vibe Check/Lock-In
- **Romantic Escape Pack** - All tiers unlocked (KES 650)
- **Premium Experience** - Advanced features & exclusive content (KES 3,000)
- **Beta Pass** - Early access & lifetime features (KES 1,300)
- **Paystack Integration** - Optimized for Kenya (M-PESA support)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/willow-date-night.git
   cd willow-date-night
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env.local
   ```
   
   Fill in your API keys:
   ```env
   # Optional - for AI features
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Optional - for payments
   PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   
   # Optional - for authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Optional - for real-time sync
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile Experience

Willow is designed mobile-first with:
- **Touch-optimized gestures** for smooth swiping
- **PWA capabilities** for app-like experience
- **Offline support** for basic functionality
- **Install prompts** to add to home screen
- **Responsive design** for all screen sizes

## 🎯 Game Tiers

### 🌟 **Spark Stage** (35 prompts)
- Light icebreakers and fun questions
- Perfect for new couples or casual dates
- Free to play

### 💫 **Vibe Check** (100 prompts)
- Deeper connection building
- Unlocked at 50% intimacy level
- Requires progression or purchase

### 💎 **Lock-In Level** (200 prompts)
- Intimate and meaningful prompts
- Unlocked at 75% intimacy level
- Deep relationship exploration

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Willow theme
- **Animations:** Framer Motion
- **State Management:** React Context + Hooks
- **PWA:** next-pwa with Workbox
- **Payments:** Paystack (Kenya-optimized)
- **AI:** OpenAI GPT-4o mini
- **Authentication:** Clerk (optional)
- **Database:** Supabase (optional)
- **Fonts:** Craftwork Grotesque (local files)

## 🎨 Design System

### Colors
- **Willow Green:** `#00FFAA` (Primary accent)
- **Dark Background:** `#1A1A1A` (Dark mode)
- **Light Background:** `#F8F9FA` (Light mode)
- **Card White:** `#FFFFFF` (Cards)
- **Text Gray:** `#A0A0A0` (Secondary text)

### Typography
- **Primary Font:** Craftwork Grotesque
- **Fallback:** Space Grotesk, sans-serif
- **Weights:** Regular (400), Heavy (800)

## 📦 Project Structure

```
willow-date-night/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── game/           # Game page
│   │   ├── offline/        # PWA offline page
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   │   ├── GameCard.tsx    # Swipeable game cards
│   │   ├── IntimacyMeter.tsx # Progress indicator
│   │   ├── TierSelector.tsx # Tier selection
│   │   ├── ThemeToggle.tsx # Dark/light mode
│   │   └── Icons.tsx       # SVG icons
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx # Theme management
│   └── data/               # Static data
│       └── prompts.ts      # Game prompts
├── public/                 # Static assets
│   ├── fonts/             # Craftwork Grotesque fonts
│   ├── icons/             # PWA icons
│   └── manifest.json      # PWA manifest
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
└── package.json          # Dependencies
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify:** Works with Next.js
- **Railway:** Great for full-stack apps
- **DigitalOcean:** App Platform support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] **Real-time multiplayer** with Supabase
- [ ] **Push notifications** for daily prompts
- [ ] **Relationship analytics** and insights
- [ ] **Custom prompt creation** for couples
- [ ] **Social features** and sharing
- [ ] **Multi-language support**
- [ ] **Advanced AI coaching**

## 📞 Support

- **Email:** support@willow-games.com
- **Website:** [willow-games.com](https://willow-games.com)
- **Issues:** [GitHub Issues](https://github.com/yourusername/willow-date-night/issues)

## 🙏 Acknowledgments

- **Craftwork Grotesque** font by Craftwork Design
- **Framer Motion** for smooth animations
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first approach

---

**Made with 💚 for couples everywhere**

*Willow Date Night Edition - Transforming modern connections, one swipe at a time.*