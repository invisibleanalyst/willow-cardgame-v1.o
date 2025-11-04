'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon, SwirlIcon, FlameIcon, ArrowRightIcon, StarIcon, PlayIcon, UsersIcon, CheckIcon, ArrowUpRightIcon, ConnectionIcon, GrowthIcon, SparkIcon, FlowIcon, MessageIcon, BrainIcon, TargetIcon, XIcon, InstagramIcon, TikTokIcon, SecretsIcon, ConnectionIconNew } from '@/components/Icons';
import ThemeToggle from '@/components/ThemeToggle';
import VIPFormModal from '@/components/payments/VIPFormModal';
import dynamic from 'next/dynamic';

const PaymentModal = dynamic(() => import('@/components/payments/PaymentModal'), {
  ssr: false
});

export default function Home() {
  // Temporary flag to hide complex landing page sections
  const HIDE_COMPLEX_SECTIONS = true;
  // Temporary flag to hide dark mode toggle
  const HIDE_DARK_MODE = true;
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showVIPModal, setShowVIPModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPackType, setPaymentPackType] = useState<'romantic-escape' | 'premium' | 'beta-pass' | ''>('');

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

  const handlePaymentClick = (packType: 'romantic-escape' | 'premium' | 'beta-pass') => {
    setPaymentPackType(packType);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (packType: string) => {
    console.log(`Payment successful for ${packType}`);
    setShowPaymentModal(false);
    // You can add success notification here
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
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-6">
            <div className="text-willow-dark text-center sm:text-left flex-1">
              <h3 className="font-craftwork-heavy text-base sm:text-lg">Install Willow</h3>
              <p className="text-xs sm:text-sm">Get the full experience on your device</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="btn-willow text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 min-h-[40px] sm:min-h-[44px] whitespace-nowrap"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="text-willow-gray hover:text-willow-dark p-2 min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-willow-green rounded-full flex items-center justify-center">
            <span className="text-willow-dark font-bold text-sm sm:text-lg">W</span>
          </div>
          <h1 className="font-craftwork-heavy text-xl sm:text-2xl text-willow-green">Willow</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {!HIDE_DARK_MODE && <ThemeToggle />}
          <Link href="/category-selection" className="btn-willow-outline text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3 min-h-[40px] sm:min-h-[44px]">
            <span className="hidden sm:inline">What's Next? ↗</span>
            <span className="sm:hidden">Start ↗</span>
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
            <h1 className="font-craftwork-heavy text-3xl sm:text-5xl md:text-7xl mb-6 leading-tight text-high-contrast px-4">
              Stop the scroll.
              <br />
              <span className="text-willow-green-contrast relative">
                Start the spark.
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-willow-green opacity-30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="font-craftwork text-lg sm:text-xl md:text-2xl text-theme-secondary mb-6 max-w-3xl mx-auto leading-relaxed px-4">
              Rediscover what real connection feels like — one prompt at a time.
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <HeartIcon className="w-6 h-6 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">Voice & text input</span>
              </div>
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <ConnectionIcon className="w-6 h-6 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">150+ unique prompts</span>
              </div>
              <div className="flex items-center gap-2 bg-theme bg-opacity-40 backdrop-blur-md border border-theme px-4 py-2 rounded-full">
                <GrowthIcon className="w-6 h-6 text-willow-green" />
                <span className="font-craftwork text-sm text-theme-primary">3 progressive tiers</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons - Optimized for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 lg:mb-16 px-4 sm:px-6"
          >
            <Link href="/category-selection" className="btn-willow text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-4 font-craftwork font-medium w-full sm:w-auto max-w-sm sm:max-w-none min-h-[48px] sm:min-h-[52px] flex items-center justify-center gap-2">
              <span>Start Playing Now</span>
              <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </Link>
            <button className="btn-willow-outline text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-4 w-full sm:w-auto max-w-sm sm:max-w-none min-h-[48px] sm:min-h-[52px] flex items-center justify-center gap-2">
              <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Creative Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center py-8"
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -top-10 -left-10 w-20 h-20 bg-willow-green opacity-10 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -bottom-10 -right-10 w-16 h-16 bg-purple-500 opacity-10 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    x: [-5, 5, -5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute top-1/2 left-1/4 w-8 h-8 bg-pink-500 opacity-15 rounded-full blur-lg"
                />
              </div>
              
              {/* Main content */}
              <div className="relative bg-gradient-to-br from-willow-green/10 via-purple-500/5 to-pink-500/10 backdrop-blur-xl border border-willow-green/20 rounded-3xl p-8 sm:p-12 overflow-hidden">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-willow-green rounded-full"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full"></div>
                  <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-willow-green rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.4 }}
                    className="w-16 h-16 bg-gradient-to-br from-willow-green to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <SparkIcon className="w-8 h-8 text-willow-dark" />
                  </motion.div>
                  
                  {/* Title with gradient text */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="font-craftwork-heavy text-2xl sm:text-3xl mb-4 bg-gradient-to-r from-willow-green via-emerald-400 to-willow-green bg-clip-text text-transparent"
                  >
                    ✨ The Magic Behind Every Question
                  </motion.h3>
                  
                  {/* Description with animated elements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="space-y-4"
                  >
                    <p className="font-craftwork text-theme-secondary text-base sm:text-lg leading-relaxed">
                      Every prompt is crafted to spark honesty, laughter, and real connection — all free, because connection shouldn’t cost a thing.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 bg-willow-green/20 px-4 py-2 rounded-full border border-willow-green/30"
                      >
                        <TargetIcon className="w-4 h-4 text-willow-green" />
                        <span className="font-craftwork text-theme-primary">No generic questions</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30"
                      >
                        <CheckIcon className="w-4 h-4 text-purple-400" />
                        <span className="font-craftwork text-theme-primary">No awkward moments</span>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 bg-pink-500/20 px-4 py-2 rounded-full border border-pink-500/30"
                      >
                        <HeartIcon className="w-4 h-4 text-pink-400" />
                        <span className="font-craftwork text-theme-primary">Just real connection</span>
                      </motion.div>
                    </div>
                  </motion.div>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      {!HIDE_COMPLEX_SECTIONS && (
      <section className="py-24 px-6 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h3 className="font-craftwork-heavy text-4xl mb-8 text-high-contrast">
              Let's Master the <span className="text-willow-green-contrast">Art</span> of Better Conversations
            </h3>
            <p className="font-craftwork text-theme-secondary text-xl max-w-3xl mx-auto leading-relaxed pb-4">
              Every prompt is designed to unlock deeper connection, one meaningful conversation at a time
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-willow-dark font-bold text-2xl">1</span>
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">Let's Choose & Answer</h4>
              <p className="font-craftwork text-theme-secondary leading-relaxed">
                Each prompt unlocks conversations you've never had before
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-willow-dark font-bold text-2xl">2</span>
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">Let's Build Intimacy</h4>
              <p className="font-craftwork text-theme-secondary leading-relaxed">
                Watch your connection deepen as you unlock conversations you never knew were possible
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-willow-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-willow-dark font-bold text-2xl">3</span>
              </div>
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">Let's Lock In Love</h4>
              <p className="font-craftwork text-theme-secondary leading-relaxed">
                Reach the deepest level where every conversation becomes pure connection
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      )}


      {/* Early Access Section */}
      {!HIDE_COMPLEX_SECTIONS && (
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
              The <span className="text-willow-green-contrast">Conversation</span> Revolution Starts Here
            </h3>
            <p className="font-craftwork text-theme-secondary text-xl max-w-3xl mx-auto leading-relaxed">
              Stop settling for small talk. Start having conversations that matter, moments that stick, and connections that last.
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
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">150+ Prompts</h4>
              <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                Each prompt is a key that unlocks a conversation you've never had before
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
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">Voice Magic</h4>
              <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                Your voice tells the whole story - capture every laugh, pause, and moment of connection
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
              <h4 className="font-craftwork-heavy text-xl mb-4 text-theme-primary">Smart Progression</h4>
              <p className="font-craftwork text-theme-secondary text-sm leading-relaxed">
                Watch your connection deepen in real-time as you unlock conversations you never knew were possible
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
                  Ready to never have another awkward silence?
                </h4>
                <p className="font-craftwork text-theme-secondary mb-8 text-lg leading-relaxed">
                  Start playing Willow today and discover what it feels like to have conversations that actually matter.
                </p>
                <Link
                  href="/category-selection" 
                  className="group inline-flex items-center gap-3 bg-willow-bright text-willow-dark px-8 py-4 rounded-2xl font-craftwork font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-willow-bright opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300"></div>
                  <span className="relative z-10">Start Playing Now</span>
                  <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      {/* Free Sample Section */}
      {!HIDE_COMPLEX_SECTIONS && (
      <section className="py-20 px-6 bg-black bg-opacity-30">
        <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-4 bg-gradient-to-r from-willow-green/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"
              />
              <h3 className="relative font-craftwork-heavy text-3xl md:text-4xl mb-6 text-high-contrast">
                Let's Try These <span className="text-willow-green-contrast">Right Now</span>
              </h3>
            </div>
            <p className="font-craftwork text-theme-secondary text-lg max-w-2xl mx-auto">
              Let's explore 3 <span className="text-willow-green font-medium">powerful prompts</span> from Willow. Share them with someone special today and <span className="text-willow-green font-medium">experience the magic</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/20 backdrop-blur-md p-6 rounded-2xl border border-blue-400/30 overflow-hidden group cursor-pointer"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <ConnectionIconNew className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="font-craftwork-heavy text-lg mb-3 text-theme-primary text-center">Squad Vibes</h4>
                <div className="bg-theme/20 backdrop-blur-sm p-4 rounded-xl border border-theme/20">
                  <p className="font-craftwork text-theme-secondary text-sm leading-relaxed text-center italic">
                    "What's the most unexpected thing you did at a hangout that surprised everyone?"
                  </p>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs text-blue-400 font-craftwork-medium">Perfect for friends & groups</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-gradient-to-br from-red-500/20 via-pink-500/10 to-orange-500/20 backdrop-blur-md p-6 rounded-2xl border border-red-400/30 overflow-hidden group cursor-pointer"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <HeartIcon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="font-craftwork-heavy text-lg mb-3 text-theme-primary text-center">Ride or Die</h4>
                <div className="bg-theme/20 backdrop-blur-sm p-4 rounded-xl border border-theme/20">
                  <p className="font-craftwork text-theme-secondary text-sm leading-relaxed text-center italic">
                    "What's a small moment in our relationship that still makes you smile?"
                  </p>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs text-red-400 font-craftwork-medium">Perfect for couples</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-blue-500/20 backdrop-blur-md p-6 rounded-2xl border border-purple-400/30 overflow-hidden group cursor-pointer"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <SecretsIcon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="font-craftwork-heavy text-lg mb-3 text-theme-primary text-center">Deep Dive</h4>
                <div className="bg-theme/20 backdrop-blur-sm p-4 rounded-xl border border-theme/20">
                  <p className="font-craftwork text-theme-secondary text-sm leading-relaxed text-center italic">
                    "What's something about yourself that you think I don't know yet?"
                  </p>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs text-purple-400 font-craftwork-medium">Unlock hidden depths</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <div className="relative inline-block mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-2 bg-gradient-to-r from-willow-green/30 via-purple-500/30 to-pink-500/30 rounded-xl blur-lg"
              />
              <p className="relative font-craftwork text-theme-secondary text-sm bg-theme/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-theme/20">
                <span className="text-willow-green font-medium">Let's see how these feel!</span> Now imagine <span className="text-purple-400 font-medium">147 more</span> like them, perfectly crafted for your relationship
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/category-selection"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-willow-green to-emerald-400 hover:from-willow-green-dark hover:to-emerald-500 text-willow-dark px-8 py-4 rounded-2xl font-craftwork font-medium transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-willow-green to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                <span className="relative z-10">Let's Get All 150 Prompts</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowUpRightIcon className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
        </motion.div>
        </div>
      </section>
      )}

      {/* Pricing Section */}
      {!HIDE_COMPLEX_SECTIONS && (
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
                  <span className="font-craftwork text-sm">Full Spark Stage (25 prompts per category)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Voice & text input</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Intimacy meter tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Answer review screen</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Both Squad & Ride or Die</span>
                </li>
              </ul>
              <Link href="/category-selection" className="w-full btn-willow-outline text-center block py-3 min-h-[48px] flex items-center justify-center">
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
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-willow-green text-willow-dark px-3 py-0.5 rounded-full text-xs font-craftwork">
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
                  <span className="font-craftwork text-sm">All 3 tiers unlocked (75 prompts per category)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Full Vibe Check (25 prompts per tier)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Full Lock-In Level (25 prompts per tier)</span>
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
                  <span className="font-craftwork text-sm">Premium adaptive nudging</span>
                </li>
              </ul>
              <button 
                onClick={() => handlePaymentClick('romantic-escape')}
                className="w-full bg-black text-white border-2 border-black hover:bg-gray-800 hover:border-gray-800 transition-all duration-300 py-3 px-6 rounded-xl font-craftwork font-medium text-sm text-center block shadow-lg hover:shadow-xl min-h-[48px] flex items-center justify-center"
              >
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
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-0.5 rounded-full text-xs font-craftwork">
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
                  <span className="font-craftwork text-sm">Advanced voice features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-willow-green">✓</span>
                  <span className="font-craftwork text-sm">Relationship insights</span>
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
              <button 
                onClick={() => setShowVIPModal(true)}
                className="w-full btn-willow-outline text-center block py-3 min-h-[48px] flex items-center justify-center"
              >
                Request VIP Access
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Beta Sign-up - Redesigned */}
      <section className="py-20 px-6 bg-black bg-opacity-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-craftwork-heavy text-4xl mb-6 text-high-contrast">
              The world's tired of small talk. Let's bring back real connection.
            </h3>
            <p className="font-craftwork text-theme-secondary text-xl mb-8 max-w-2xl mx-auto">
              I'm building a space where real connection thrives — one honest prompt at a time. Join our beta and be part of something truly human.
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
                  className="w-full btn-willow py-3 disabled:opacity-50 min-h-[48px] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Joining Beta...' : (
                    <>
                      <span>Join Beta List</span>
                      <ArrowUpRightIcon className="w-5 h-5 flex-shrink-0" />
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
                {/* <li><a href="#" className="font-craftwork text-willow-gray hover:text-willow-green">Feedback</a></li> */}
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

      {/* VIP Form Modal */}
      <VIPFormModal
        isOpen={showVIPModal}
        onClose={() => setShowVIPModal(false)}
      />

      {/* Payment Modal */}
      {paymentPackType && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          packType={paymentPackType as 'romantic-escape' | 'premium' | 'beta-pass'}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}