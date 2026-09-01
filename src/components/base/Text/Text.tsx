import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'accent';
  children: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses = {
  default: 'text-white',
  muted: 'text-white/60',
  accent: 'text-white/80',
};

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      size = 'md',
      weight = 'normal',
      color = 'default',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const sizeClass = sizeClasses[size];
    const weightClass = weightClasses[weight];
    const colorClass = colorClasses[color];

    return (
      <p ref={ref} className={`${sizeClass} ${weightClass} ${colorClass} ${className}`} {...props}>
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export default Text;
