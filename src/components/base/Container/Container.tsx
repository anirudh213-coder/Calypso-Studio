import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
};

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'full',
  padding = 'md',
  className = '',
  children,
  ...props
}) => {
  const maxWidthClass = maxWidthClasses[maxWidth];
  const paddingClass = paddingClasses[padding];

  return (
    <div
      className={`mx-auto ${maxWidthClass} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
