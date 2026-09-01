import React, { useRef, useEffect } from 'react';
import { Text } from '../../base';
import type { TextProps } from '../../base';
import { gsap } from 'gsap';

export interface AnimatedTextProps extends TextProps {
  delay?: number;
  duration?: number;
  stagger?: number;
  animation?: 'fadeIn' | 'slideUp' | 'typeWriter';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  animation = 'fadeIn',
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      if (animation === 'fadeIn') {
        gsap.from(ref.current, {
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
        });
      } else if (animation === 'slideUp') {
        gsap.from(ref.current, {
          y: 20,
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, [delay, duration, animation]);

  return (
    <Text ref={ref} className={className} {...props}>
      {children}
    </Text>
  );
};

export default AnimatedText;
