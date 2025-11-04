# Willow Talk Edition

> Premium relationship connection platform that transforms conversations into deeper connections

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/willow-talk-edition)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

### Core Functionality
- **335+ Conversation Prompts** across 3 intimacy tiers
- **AI-Powered Adaptive Nudging** for deeper conversations
- **Mobile-First PWA** with offline support
- **Real-time Sentiment Analysis** using OpenAI
- **Premium Payment Integration** with Paystack (M-Pesa support)

### Categories
- **Squad Vibes** - For friends to deepen connections
- **Ride or Die** - For couples to explore deeper intimacy

### Pricing Tiers
- **Free** - Basic prompts and features
- **Premium (KES 650)** - 650+ additional prompts + AI nudging
- **VIP (KES 3000)** - Personalized relationship coaching

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git

### Installation

   ```bash
# Clone the repository
git clone https://github.com/yourusername/willow-talk-edition.git
cd willow-talk-edition

# Install dependencies
   npm install

# Copy environment variables
   cp env.template .env.local

# Fill in your environment variables
# See env.production.example for production values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **PWA** - Progressive Web App capabilities

### Backend & Services
- **Supabase** - Database and real-time features
- **Clerk** - Authentication and user management
- **OpenAI** - AI-powered sentiment analysis
- **Paystack** - Payment processing (M-Pesa, cards)
- **Vercel** - Hosting and deployment

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Workbox** - Service worker management

## 📱 Mobile Optimization

- **Responsive Design** - Optimized for 320px to desktop
- **Touch Gestures** - Swipe interactions for cards
- **PWA Installation** - Add to home screen functionality
- **Offline Support** - Works without internet connection
- **Fast Loading** - Optimized bundle size and caching

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key

# OpenAI
OPENAI_API_KEY=your_key

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_key
PAYSTACK_SECRET_KEY=your_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://willowtalk.live
NEXT_PUBLIC_APP_NAME=Willow Talk Edition
```

See `env.production.example` for complete production configuration.

### Database Setup

Run the SQL schema in your Supabase SQL editor:

```sql
-- Copy contents of supabase-schema.sql
-- Creates all necessary tables and indexes
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import project from GitHub
   - Add environment variables
   - Deploy automatically

3. **Custom Domain**
   - Add `willowtalk.live` in Vercel dashboard
   - Configure DNS records
   - Enable SSL

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: < 100KB gzipped
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🧪 Testing

### Manual Testing
- [ ] Payment flow (KES 650 & VIP)
- [ ] Mobile responsiveness (iPhone SE, Galaxy S20)
- [ ] PWA installation
- [ ] Offline functionality
- [ ] Authentication flows

### Performance Testing
```bash
# Build and analyze bundle
npm run analyze

# Test production build
npm run test:build
```

## 📈 Analytics & Monitoring

- **Vercel Analytics** - Built-in performance monitoring
- **Error Tracking** - Automatic error logging
- **User Analytics** - Optional Google Analytics integration
- **Payment Monitoring** - Paystack webhook logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test on mobile devices
- Ensure accessibility compliance
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/yourusername/willow-talk-edition/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/willow-talk-edition/discussions)
- **Email**: support@willowtalk.live

### Third-Party Support
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Paystack Documentation](https://paystack.com/docs)

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Core conversation prompts
- [x] Payment integration
- [x] Mobile PWA
- [x] AI sentiment analysis

### Phase 2 (Next)
- [ ] Advanced AI coaching
- [ ] Video call integration
- [ ] Relationship analytics dashboard
- [ ] Multi-language support

### Phase 3 (Future)
- [ ] Couples therapy integration
- [ ] Professional counselor network
- [ ] Advanced relationship insights
- [ ] Community features

---

**Built with ❤️ for deeper human connections**

[Visit Willow Talk Edition](https://willowtalk.live) | [Report Bug](https://github.com/yourusername/willow-talk-edition/issues) | [Request Feature](https://github.com/yourusername/willow-talk-edition/discussions)