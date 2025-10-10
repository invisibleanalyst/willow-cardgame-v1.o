'use client';

import { Suspense } from 'react';
import GamePage from '@/app/game/page';

export default function GamePageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-theme text-theme-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-willow-green rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-willow-dark font-bold text-lg sm:text-xl">W</span>
          </div>
          <p className="font-craftwork text-theme-secondary">Loading your game...</p>
        </div>
      </div>
    }>
      <GamePage />
    </Suspense>
  );
}
