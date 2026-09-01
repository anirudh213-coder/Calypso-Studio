import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Full-width section container with responsive padding
 */
export const Section: React.FC<SectionProps> = ({
  id,
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClass = 'relative w-full';
  const fullWidthClass = fullWidth ? 'min-h-dvh' : '';
  
  return (
    <section
      id={id}
      className={`${baseClass} ${fullWidthClass} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
