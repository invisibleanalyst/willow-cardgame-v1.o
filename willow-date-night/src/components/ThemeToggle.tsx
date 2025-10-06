'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const themeContext = useTheme();
  
  // Handle case where context might not be available
  if (!themeContext) {
    return (
      <div className="relative w-12 h-6 bg-willow-gray bg-opacity-30 rounded-full p-1">
        <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="text-xs">🌙</div>
        </div>
      </div>
    );
  }
  
  const { theme, toggleTheme } = themeContext;

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-willow-gray bg-opacity-30 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-willow-green focus:ring-opacity-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Track */}
      <div className="w-full h-full rounded-full bg-gradient-to-r from-willow-dark to-willow-gray opacity-20"></div>
      
      {/* Toggle Button */}
      <motion.div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 0 : 24,
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
        className="absolute inset-0 rounded-full opacity-20"
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
