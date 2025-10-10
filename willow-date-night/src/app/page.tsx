'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon, SwirlIcon, FlameIcon, ArrowRightIcon, StarIcon, PlayIcon, UsersIcon, CheckIcon, ArrowUpRightIcon, ConnectionIcon, GrowthIcon, SparkIcon, FlowIcon, MessageIcon, BrainIcon, TargetIcon, XIcon, InstagramIcon, TikTokIcon } from '@/components/Icons';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // PWA Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleBetaSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Thanks for joining our beta list! We\'ll notify you when Willow is ready.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-theme text-theme-primary">

      {/* Install Prompt */}
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="install-prompt"
        >
          <div className="flex items-center gap-4">
            <div className="text-willow-dark">
              <h3 className="font-craftwork-heavy text-lg">Install Willow</h3>
              <p className="text-sm">Get the full experience on your device</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="btn-willow"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-willow-gray hover:text-willow-dark"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
          <div className="w-8 h-8 bg-willow-green rounded-full flex items-center justify-center">
            <span className="text-willow-dark font-bold text-lg">W</span>
          </div>
          <h1 className="font-craftwork-heavy text-2xl text-willow-green">Willow</h1>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/category-selection" className="btn-willow-outline">
            What's Next? ↗
          </Link>
        </div>
      </header>

      {/* Hero Section - Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-willow-green opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-willow-green opacity-8 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-willow-green opacity-3 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="font-craftwork-heavy text-5xl md:text-7xl mb-6 leading-tight text-high-contrast">
              Turn your{' '}
              <span className="text-willow-green-contrast relative">
                date night
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-willow-green opacity-30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
              <br />
              into something{' '}
              <span className="text-willow-green-contrast">magical</span>
            </h1>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="font-craftwork text-xl md:text-2xl text-theme-secondary mb-6 max-w-3xl mx-auto leading-relaxed">
              The only app that transforms awkward silences into{' '}
              <span className="text-accent-high-contrast font-medium">deep connections</span>{' '}
              through playful prompts designed for couples
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <HeartIcon className="w-6 h-6 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">Deepen your bond</span>
              </div>
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <ConnectionIcon className="w-6 h-6 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">Fun & interactive</span>
              </div>
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <GrowthIcon className="w-6 h-6 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">Progressive intimacy</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 lg:mb-16"
          >
            <Link href="/category-selection" className="btn-willow text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-craftwork-heavy w-full sm:w-auto">
              Start Your Journey <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5 inline ml-1" />
            </Link>
            <button className="btn-willow-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
              Watch Demo <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 inline ml-1" />
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <p className="font-craftwork text-theme-secondary text-sm mb-2">
              Join 1,000+ couples already deepening their connection
            </p>
            <div className="flex justify-center items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-willow-green rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    {i}
                  </div>
                ))}
              </div>
              <span className="font-craftwork text-theme-secondary text-sm ml-2">
                + 995 more couples
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-craftwork-heavy text-4xl mb-6 text-high-contrast">
              How <span className="text-willow-green-contrast">Willow</span> Works
            </h3>
            <p className="font-craftwork text-theme-secondary text-xl max-w-3xl mx-auto">
              Three progressive tiers that take you from first-date butterflies to deep, meaningful connections
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-willow-dark font-bold text-2xl">1</span>
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-2 text-theme-primary">Swipe & Connect</h4>
              <p className="font-craftwork text-theme-secondary">
                Swipe through prompts designed to spark conversation and break the ice
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-willow-dark font-bold text-2xl">2</span>
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-2 text-theme-primary">Build Intimacy</h4>
              <p className="font-craftwork text-theme-secondary">
                Watch your connection deepen as you unlock more meaningful prompts
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-willow-dark font-bold text-2xl">3</span>
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-2 text-theme-primary">Lock In Love</h4>
              <p className="font-craftwork text-theme-secondary">
                Reach the deepest level of connection with prompts for committed couples
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Card Demo Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-craftwork-heavy text-4xl mb-6">
              Experience the <span className="text-willow-green">Magic</span>
            </h3>
            <p className="font-craftwork text-willow-gray text-xl">
              Try it yourself - swipe the card to see how Willow transforms your conversations
            </p>
          </motion.div>

        {/* Interactive Card Demo */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="relative">
            {/* Card Stack Container */}
            <div className="willow-card-stack">
              {/* Card 3 - Back (Lock-In Level) */}
              <div className="willow-card p-6 lg:p-8 text-willow-dark absolute transform translate-x-4 lg:translate-x-6 translate-y-4 lg:translate-y-6 opacity-50 scale-90 z-10">
                  {/* Header with flame icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-willow-green rounded-full flex items-center justify-center">
                      <FlameIcon className="w-6 h-6 text-willow-dark" />
                    </div>
                    <div>
                      <h4 className="font-craftwork-heavy text-lg">Lock-In Level</h4>
                      <p className="font-craftwork text-xs text-willow-gray">Deep Dreams</p>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-1 flex items-center justify-center mb-6">
                    <p className="font-craftwork text-lg text-center leading-relaxed">
                      What's our biggest shared dream for the future?
                    </p>
                  </div>
                  
                  {/* Swipe indicators */}
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 text-sm">← Skip</span>
                    <span className="text-green-500 text-sm">Answer →</span>
                  </div>
                </div>

              {/* Card 2 - Middle (Vibe Check) */}
              <div className="willow-card p-6 lg:p-8 text-willow-dark absolute transform translate-x-2 lg:translate-x-3 translate-y-2 lg:translate-y-3 opacity-70 scale-95 z-20">
                  {/* Header with flame icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-willow-green rounded-full flex items-center justify-center">
                      <SwirlIcon className="w-6 h-6 text-willow-dark" />
                    </div>
                    <div>
                      <h4 className="font-craftwork-heavy text-lg">Vibe Check</h4>
                      <p className="font-craftwork text-xs text-willow-gray">Building Bonds</p>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-1 flex items-center justify-center mb-6">
                    <p className="font-craftwork text-lg text-center leading-relaxed">
                      What's a small habit of mine that makes you smile?
                    </p>
                  </div>
                  
                  {/* Swipe indicators */}
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 text-sm">← Skip</span>
                    <span className="text-green-500 text-sm">Answer →</span>
                  </div>
                </div>

              {/* Card 1 - Front (Spark Stage) - Swipeable */}
              <motion.div
                drag
                dragConstraints={{ left: -150, right: 150, top: -75, bottom: 75 }}
                dragElastic={0.2}
                className="willow-card p-6 lg:p-8 text-willow-dark cursor-grab active:cursor-grabbing relative z-30"
                whileHover={{ scale: 1.02 }}
                whileDrag={{ 
                  scale: 1.05, 
                  rotate: 3, 
                  zIndex: 50,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
                }}
                onDragStart={() => {
                  console.log('Started dragging Spark Stage card');
                }}
                onDrag={(event, info) => {
                  const rotation = info.offset.x * 0.1;
                  return { rotate: rotation };
                }}
                onDragEnd={(event, info) => {
                  const threshold = 80;
                  if (info.offset.x > threshold) {
                    console.log('Swiped right - Answer!');
                  } else if (info.offset.x < -threshold) {
                    console.log('Swiped left - Skip!');
                  }
                }}
              >
                  {/* Header with flame icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-willow-green rounded-full flex items-center justify-center">
                      <FlameIcon className="w-6 h-6 text-willow-dark" />
                    </div>
                    <div>
                      <h4 className="font-craftwork-heavy text-lg">Spark Stage</h4>
                      <p className="font-craftwork text-xs text-willow-gray">Light Icebreakers</p>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-1 flex items-center justify-center mb-6">
                    <p className="font-craftwork text-lg text-center leading-relaxed">
                      What's your wildest group chat secret?
                    </p>
                  </div>
                  
                  {/* Swipe indicators */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-red-500 text-sm">← Skip</span>
                    <span className="text-green-500 text-sm">Answer →</span>
                  </div>
                  
                  {/* Interactive hint */}
                  <div className="text-center">
                    <motion.div
                      animate={{ x: [-8, 8, -8] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-willow-green text-2xl mb-2"
                    >
                      <ArrowRightIcon className="w-6 h-6" />
                    </motion.div>
                    <p className="font-craftwork text-xs text-willow-gray">
                      Drag me to try Willow!
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Instructions */}
              <div className="text-center mt-8">
                <p className="font-craftwork text-willow-gray text-sm mb-4">
                  Swipe the top card to experience Willow's magic
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-willow-green rounded-full"></div>
                  <div className="w-3 h-3 bg-willow-gray bg-opacity-50 rounded-full"></div>
                  <div className="w-3 h-3 bg-willow-gray bg-opacity-30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Early Access Section */}
      <section className="py-20 px-6 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-willow-green opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 opacity-3 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-craftwork-heavy text-4xl md:text-5xl mb-6 text-high-contrast">
              Be Among the <span className="text-willow-green-contrast">First</span> to Experience Willow
            </h3>
            <p className="font-craftwork text-theme-secondary text-xl max-w-3xl mx-auto leading-relaxed">
              Join our growing community of couples who are rediscovering connection, one prompt at a time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-theme bg-opacity-50 backdrop-blur-md p-8 rounded-3xl border border-willow-green border-opacity-20 text-center hover:border-willow-green hover:border-opacity-40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-willow-green hover:shadow-opacity-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-willow-green to-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <SparkIcon className="w-8 h-8 text-willow-dark" />
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">335+ Prompts</h4>
              <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                Carefully crafted questions designed by relationship experts to spark meaningful conversations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-theme bg-opacity-50 backdrop-blur-md p-8 rounded-3xl border border-purple-500 border-opacity-20 text-center hover:border-purple-500 hover:border-opacity-40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500 hover:shadow-opacity-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GrowthIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">AI-Powered</h4>
              <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                Smart sentiment analysis and adaptive nudging to help you go deeper with each conversation
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-theme bg-opacity-50 backdrop-blur-md p-8 rounded-3xl border border-pink-500 border-opacity-20 text-center hover:border-pink-500 hover:border-opacity-40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500 hover:shadow-opacity-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FlowIcon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">Progressive Tiers</h4>
              <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                From light icebreakers to deep intimacy building - unlock levels as your connection grows
              </p>
            </motion.div>
          </div>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-willow-green to-emerald-400 bg-opacity-15 border border-willow-green border-opacity-40 rounded-3xl p-10 max-w-4xl mx-auto backdrop-blur-md relative overflow-hidden shadow-2xl shadow-willow-green shadow-opacity-10">
              {/* Enhanced background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 left-6 w-3 h-3 bg-willow-green rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-12 w-2 h-2 bg-emerald-300 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-8 left-12 w-2.5 h-2.5 bg-willow-green rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-6 right-6 w-3 h-3 bg-emerald-300 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-willow-green rounded-full animate-pulse delay-1500"></div>
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-3000"></div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-willow-green to-emerald-400 opacity-5 rounded-3xl blur-xl"></div>
              
              <div className="relative z-10">
                <h4 className="font-craftwork-heavy text-2xl md:text-3xl mb-4 text-theme-primary">
                  Ready to transform your date nights?
                </h4>
                <p className="font-craftwork text-theme-secondary mb-8 text-lg leading-relaxed">
                  Start your journey with Willow today and discover what meaningful connection feels like.
                </p>
                <Link 
                  href="/category-selection" 
                  className="group inline-flex items-center gap-3 bg-willow-bright text-willow-dark px-8 py-4 rounded-2xl font-craftwork-heavy text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-willow-bright opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300"></div>
                  <span className="relative z-10">Start Playing Now</span>
                  <ArrowUpRightIcon className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video CTA */}
      <section className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://loom.com/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-craftwork text-willow-gray underline hover:text-willow-green transition-colors"
          >
            Watch the magic →
          </a>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-craftwork-heavy text-4xl mb-6">
              Choose Your <span className="text-willow-green">Adventure</span>
            </h3>
            <p className="font-craftwork text-willow-gray text-xl">
              Start free, upgrade when you're ready to go deeper
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white bg-opacity-10 p-8 rounded-2xl border border-white border-opacity-20"
            >
              <div className="text-center mb-6">
                <h4 className="font-craftwork-heavy text-2xl mb-2">Free Forever</h4>
                <div className="text-4xl font-craftwork-heavy text-willow-green mb-2">KES 0</div>
                <p className="font-craftwork text-willow-gray">Perfect for trying Willow</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Full Spark Stage (35 prompts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Limited Vibe Check (5 prompts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Basic intimacy meter</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">1 session per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">AI sentiment analysis</span>
                </li>
              </ul>
              <Link href="/category-selection" className="w-full btn-willow-outline text-center block">
                Start Free
              </Link>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-willow-green bg-opacity-20 p-8 rounded-2xl border-2 border-willow-green relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-willow-green text-willow-dark px-4 py-1 rounded-full text-sm font-craftwork-heavy">
                  Most Popular
                </div>
              </div>
              <div className="text-center mb-6">
                <h4 className="font-craftwork-heavy text-2xl mb-2">Romantic Escape</h4>
                <div className="text-4xl font-craftwork-heavy text-willow-dark mb-2">KES 650</div>
                <p className="font-craftwork text-willow-dark opacity-75">One-time payment</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">All 3 tiers unlocked (335+ prompts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Full Vibe Check (100 prompts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Full Lock-In Level (200 prompts)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Unlimited sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Advanced intimacy tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">AI adaptive nudging</span>
                </li>
              </ul>
              <button className="w-full bg-white text-willow-dark border-2 border-white hover:bg-gray-100 hover:scale-105 transition-all duration-300 py-4 px-6 rounded-xl font-craftwork-heavy text-center block shadow-lg hover:shadow-xl">
                Get Romantic Escape
              </button>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 bg-opacity-20 p-8 rounded-2xl border-2 border-purple-500 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-craftwork-heavy">
                  Premium
                </div>
              </div>
              <div className="text-center mb-6">
                <h4 className="font-craftwork-heavy text-2xl mb-2">Premium Experience</h4>
                <div className="text-4xl font-craftwork-heavy text-willow-green mb-2">KES 3,000</div>
                <p className="font-craftwork text-willow-gray">One-time payment</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Everything in Romantic Escape</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Exclusive premium prompts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">AI voice responses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Advanced relationship analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Founder badge & recognition</span>
                </li>
              </ul>
              <button className="w-full bg-white text-purple-600 border-2 border-white hover:bg-gray-100 hover:scale-105 transition-all duration-300 py-4 px-6 rounded-xl font-craftwork-heavy shadow-lg hover:shadow-xl">
                Get Premium
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beta Sign-up - Redesigned */}
      <section className="py-20 px-6 bg-black bg-opacity-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-craftwork-heavy text-4xl mb-6 text-high-contrast">
              Be the First to <span className="text-willow-green-contrast">Experience</span> Willow
            </h3>
            <p className="font-craftwork text-theme-secondary text-xl mb-8 max-w-2xl mx-auto">
              Join our exclusive beta and get early access to all features. 
              Help us shape the future of couple's gaming!
            </p>
            
            <div className="bg-theme bg-opacity-40 backdrop-blur-md p-8 rounded-2xl border border-theme max-w-md mx-auto">
              <form onSubmit={handleBetaSignup} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-theme bg-opacity-60 border border-theme text-theme-primary placeholder-theme-muted focus:outline-none focus:border-willow-green focus:ring-2 focus:ring-willow-green focus:ring-opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-willow py-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining Beta...' : (
                    <>
                      Join Beta List <ArrowUpRightIcon className="w-5 h-5 inline ml-1" />
                    </>
                  )}
                </button>
              </form>
              <p className="font-craftwork text-xs text-willow-gray mt-4">
                No spam, just updates on our launch progress
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-willow-gray border-opacity-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity duration-200">
                <div className="w-8 h-8 bg-willow-green rounded-full flex items-center justify-center">
                  <span className="text-willow-dark font-bold text-lg">W</span>
                </div>
                <h4 className="font-craftwork-heavy text-xl text-willow-green">Willow</h4>
              </Link>
              <p className="font-craftwork text-willow-gray">
                Useful rewards, easy gaming, designed for you. Willow.
              </p>
            </div>
            
            <div>
              <h5 className="font-craftwork-heavy text-lg mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="font-craftwork text-willow-gray hover:text-willow-green">Updates</a></li>
                <li><a href="#" className="font-craftwork text-willow-gray hover:text-willow-green">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-craftwork-heavy text-lg mb-4">Contacts</h5>
              <ul className="space-y-2 mb-4">
                <li><a href="mailto:thukuduane@gmail.com" className="font-craftwork text-willow-gray hover:text-willow-green">thukuduane@gmail.com</a></li>
                <li><a href="tel:0796460911" className="font-craftwork text-willow-gray hover:text-willow-green">0796460911</a></li>
              </ul>
               <div className="flex gap-3">
                 <a href="#" className="text-willow-gray hover:text-willow-green transition-colors duration-200">
                   <XIcon className="w-5 h-5" />
                 </a>
                 <a href="#" className="text-willow-gray hover:text-willow-green transition-colors duration-200">
                   <InstagramIcon className="w-5 h-5" />
                 </a>
                 <a href="#" className="text-willow-gray hover:text-willow-green transition-colors duration-200">
                   <TikTokIcon className="w-5 h-5" />
                 </a>
               </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-willow-gray border-opacity-20">
            <p className="font-craftwork text-willow-gray text-sm text-center">
              2025, Willow
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}