import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'semibold' | 'bold';
  color?: 'default' | 'muted';
  children: React.ReactNode;
  className?: string;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',
  '3xl': 'text-6xl',
};

const weightClasses = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorClasses = {
  default: 'text-white',
  muted: 'text-white/70',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  size,
  weight = 'bold',
  color = 'default',
  className = '',
  children,
  ...props
}) => {
  const Tag = `h${level}` as const;
  const computedSize = size || ['3xl', '3xl', '2xl', 'xl', 'lg', 'md'][level - 1];
  
  const sizeClass = sizeClasses[computedSize as keyof typeof sizeClasses];
  const weightClass = weightClasses[weight];
  const colorClass = colorClasses[color];

  return React.createElement(
    Tag,
    {
      className: `${sizeClass} ${weightClass} ${colorClass} ${className}`,
      ...props,
    },
    children
  );
};

export default Heading;
