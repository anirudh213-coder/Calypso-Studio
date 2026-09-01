import React from 'react';

export type IconName = 
  | 'arrow'
  | 'mail'
  | 'phone'
  | 'location'
  | 'instagram'
  | 'linkedin'
  | 'twitter';

export interface IconProps {
  name: IconName;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  aria?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  size = 'md',
  aria = 'icon'
}) => {
  const sizeClass = sizeMap[size];
  const baseClass = `${sizeClass} ${className}`;

  const iconComponents: Record<IconName, React.JSX.Element> = {
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <path
          d="M5 19L19 5M8 5H19V16"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    
    mail: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M4 7L12 13L20 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    
    phone: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <path
          d="M7.2 3.8L10 8L8.3 10.1C9.4 12.4 11.2 14.2 13.5 15.3L15.6 13.6L19.8 16.4C20.5 16.9 20.7 17.9 20.2 18.6L18.9 20.3C18.4 21 17.5 21.2 16.7 20.9C10 18.6 5.4 14 3.1 7.3C2.8 6.5 3 5.6 3.7 5.1L5.4 3.8C6.1 3.3 6.7 3.1 7.2 3.8Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    
    location: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <path
          d="M19 10C19 15 12 21 12 21C12 21 5 15 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <rect x="2" y="2" width="20" height="20" rx="4.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
    
    linkedin: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 10V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 7V7.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11 18V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M11 13.5C11 11.57 12.57 10 14.5 10C16.43 10 18 11.57 18 13.5V18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    
    twitter: (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} aria-label={aria}>
        <path
          d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  };

  return iconComponents[name] || null;
};

export default Icon;
