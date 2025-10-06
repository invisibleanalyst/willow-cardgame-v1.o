'use client';

import { ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';

interface PageWrapperProps {
  children: ReactNode;
  showThemeToggle?: boolean;
}

export default function PageWrapper({ children, showThemeToggle = true }: PageWrapperProps) {
  return (
    <>
      {showThemeToggle && (
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>
      )}
      {children}
    </>
  );
}
