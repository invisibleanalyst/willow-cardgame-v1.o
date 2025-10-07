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
      {children}
    </>
  );
}
