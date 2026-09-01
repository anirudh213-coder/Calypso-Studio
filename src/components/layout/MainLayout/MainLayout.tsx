import React from 'react';

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main page layout wrapper
 * Handles base structure for the entire page
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen bg-black/10 ${className}`}>
      {children}
    </div>
  );
};

export default MainLayout;
