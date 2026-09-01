import React from 'react';
import { Heading, Text } from '../../base';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${className}`}
      {...props}
    >
      {title && <Heading level={3} size="md" className="mb-2">{title}</Heading>}
      {description && <Text size="sm" color="muted" className="mb-4">{description}</Text>}
      {children}
    </div>
  );
};

export default Card;
