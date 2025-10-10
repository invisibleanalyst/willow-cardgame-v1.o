'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const themeContext = useTheme();
  
  // Handle case where context might not be available
  if (!themeContext) {
    return (
      <div className="relative w-14 h-7 bg-black bg-opacity-40 backdrop-blur-md rounded-full p-1 border border-white border-opacity-10 shadow-lg">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-willow-dark to-willow-gray opacity-30"></div>
        <div className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="text-xs">🌙</div>
        </div>
      </div>
    );
  }
  
  const { theme, toggleTheme } = themeContext;

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-black bg-opacity-40 backdrop-blur-md rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-willow-green focus:ring-opacity-50 border border-white border-opacity-10 shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Track Background */}
      <div className="w-full h-full rounded-full bg-gradient-to-r from-willow-dark to-willow-gray opacity-30"></div>
      
      {/* Toggle Button */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 0 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        {/* Icon inside toggle */}
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
          }}
          transition={{
            duration: 0.3
          }}
          className="text-xs"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </motion.div>
      </motion.div>
      
      {/* Background gradient based on theme */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-10"
        animate={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #1A1A1A 0%, #00FFAA 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #00FFAA 100%)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
