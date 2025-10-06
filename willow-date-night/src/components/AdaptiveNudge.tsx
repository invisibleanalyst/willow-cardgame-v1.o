'use client';

import { motion } from 'framer-motion';

interface AdaptiveNudgeProps {
  currentTier: 'spark' | 'vibe' | 'lockin';
  isUnlocked: {
    spark: boolean;
    vibe: boolean;
    lockin: boolean;
  };
  onResponse: (accepted: boolean) => void;
}

export default function AdaptiveNudge({ currentTier, isUnlocked, onResponse }: AdaptiveNudgeProps) {
  const getNudgeContent = () => {
    if (currentTier === 'spark' && isUnlocked.vibe) {
      return {
        title: 'Ready to level up?',
        message: 'Your connection is growing! Ready to move from Spark to Vibe Check?',
        buttonText: 'Level Up to Vibe Check',
        icon: '💫',
        color: '#FF6B6B'
      };
    } else if (currentTier === 'vibe' && isUnlocked.lockin) {
      return {
        title: 'Deep dive time?',
        message: 'You\'re building something special! Ready for the Lock-In Level?',
        buttonText: 'Unlock Lock-In Level',
        icon: '💎',
        color: '#9B59B6'
      };
    } else {
      return {
        title: 'Deeper dive?',
        message: 'Want to explore more meaningful prompts? Keep building your intimacy!',
        buttonText: 'Keep Building',
        icon: '💖',
        color: '#00FFAA'
      };
    }
  };

  const nudge = getNudgeContent();

  return (
    <div className="w-full text-center">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-6xl mb-4"
      >
        {nudge.icon}
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-craftwork-heavy text-2xl mb-4 text-willow-dark"
      >
        {nudge.title}
      </motion.h3>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-craftwork text-willow-gray mb-8 leading-relaxed"
      >
        {nudge.message}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 justify-center"
      >
        <button
          onClick={() => onResponse(false)}
          className="btn-willow-outline"
        >
          Skip Nudge
        </button>
        <motion.button
          onClick={() => onResponse(true)}
          className="btn-willow"
          style={{ backgroundColor: nudge.color }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {nudge.buttonText}
        </motion.button>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex justify-center gap-2"
      >
        {['spark', 'vibe', 'lockin'].map((tier, index) => (
          <div
            key={tier}
            className={`w-3 h-3 rounded-full ${
              currentTier === tier
                ? 'bg-willow-green'
                : isUnlocked[tier as keyof typeof isUnlocked]
                ? 'bg-willow-gray'
                : 'bg-willow-gray bg-opacity-30'
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}

