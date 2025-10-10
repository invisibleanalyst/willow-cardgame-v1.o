'use client';

import { useState } from 'react';
import MobileProgressSection from '@/components/MobileProgressSection';

export default function MobileProgressPage() {
  const [level, setLevel] = useState(15); // Starting level
  const [currentTier, setCurrentTier] = useState<'spark' | 'vibe' | 'lockin'>('spark');
  const [isUnlocked, setIsUnlocked] = useState({
    spark: true,
    vibe: false,
    lockin: false
  });

  const handleTierChange = (tier: 'spark' | 'vibe' | 'lockin') => {
    if (isUnlocked[tier]) {
      setCurrentTier(tier);
    }
  };

  const handleLevelIncrease = () => {
    const newLevel = Math.min(level + 10, 100);
    setLevel(newLevel);
    
    // Unlock tiers based on level
    if (newLevel >= 50 && !isUnlocked.vibe) {
      setIsUnlocked(prev => ({ ...prev, vibe: true }));
    }
    if (newLevel >= 75 && !isUnlocked.lockin) {
      setIsUnlocked(prev => ({ ...prev, lockin: true }));
    }
  };

  return (
    <div className="min-h-screen bg-willow-dark">
      <MobileProgressSection
        level={level}
        currentTier={currentTier}
        isUnlocked={isUnlocked}
        onTierChange={handleTierChange}
      />
      
      {/* Debug button for testing (remove in production) */}
      <button
        onClick={handleLevelIncrease}
        className="fixed top-4 right-4 bg-willow-green text-willow-dark px-4 py-2 rounded-lg font-craftwork-heavy text-sm"
      >
        +10% (Test)
      </button>
    </div>
  );
}
