'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// Flame icon for Spark Stage
export const FlameIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1.5 4.5 3 6.5 1.5 2 2.5 4 2.5 6.5 0 1.5-1 2.5-2.5 2.5S8 22 8 20.5c0-1.5 1-3 2.5-4.5 1.5-1.5 2.5-3 2.5-5.5 0-2-1-3.5-2.5-3.5S8 6 8 8c0 1 0.5 2 1.5 2.5 1 0.5 2 0.5 2.5-0.5 0.5-1 0.5-2.5 0-4-0.5-1.5-1.5-2.5-3-2.5z" 
      fill="currentColor"
    />
  </svg>
);

// Swirl icon for Vibe Check
export const SwirlIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12s4.5-10 10-10zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0 2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" 
      fill="currentColor"
    />
  </svg>
);

// Diamond icon for Lock-In Level
export const DiamondIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2l8 8-8 8-8-8 8-8z" 
      fill="currentColor"
    />
  </svg>
);

// Lock icon
export const LockIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg 
    width={size || 16} 
    height={size || 16} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" 
      fill="currentColor"
    />
  </svg>
);

// Heart icon
export const HeartIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      fill="currentColor"
    />
  </svg>
);

// Microphone icon
export const MicrophoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" 
      fill="currentColor"
    />
  </svg>
);

// Star icon
export const StarIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
      fill="currentColor"
    />
  </svg>
);

// Arrow right icon
export const ArrowRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" 
      fill="currentColor"
    />
  </svg>
);

// Arrow left icon
export const ArrowLeftIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6 1.41 1.41z" 
      fill="currentColor"
    />
  </svg>
);

// Play icon
export const PlayIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M8 5v14l11-7z" 
      fill="currentColor"
    />
  </svg>
);

// Users icon
export const UsersIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26A6.003 6.003 0 0 0 10 16v6h10zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm-5 0C8.33 11.5 9 10.83 9 10s-.67-1.5-1.5-1.5S6 9.17 6 10s.67 1.5 1.5 1.5zM2 20v-6h2.5l2.54-7.63A1.5 1.5 0 0 1 8.46 8H10c.8 0 1.54.37 2.01 1l1.7 2.26A6.003 6.003 0 0 1 16 16v6H2z" 
      fill="currentColor"
    />
  </svg>
);

// Check icon
export const CheckIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" 
      fill="currentColor"
    />
  </svg>
);

// Close/X icon
export const CloseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" 
      fill="currentColor"
    />
  </svg>
);

// Arrow up right icon (for progress/launch)
export const ArrowUpRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M7 7h10v10l-2-2V9H9l-2-2z" 
      fill="currentColor"
    />
  </svg>
);

// Circle with dots icon (for interaction/connection)
export const ConnectionIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <circle cx="6" cy="12" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="18" cy="12" r="2" fill="currentColor" opacity="0.6"/>
    <path d="M8 12h8" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </svg>
);

// Abstract growth/progress icon
export const GrowthIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M3 17l6-6 4 4 8-8" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M14 7l7 0 0 7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Abstract spark/energy icon
export const SparkIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" 
      fill="currentColor"
    />
  </svg>
);

// Abstract wave/flow icon
export const FlowIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path 
      d="M3 12c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3zM15 12c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3z" 
      fill="currentColor"
    />
    <path 
      d="M6 12h6M12 12h6" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);
