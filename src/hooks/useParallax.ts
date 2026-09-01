import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  start?: string;
  end?: string;
  scrub?: number;
  yPercent?: [number, number];
}

export const useParallax = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  parallaxRef: React.RefObject<HTMLDivElement | null>,
  options: ParallaxOptions = {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.2,
    yPercent: [-18, 18],
  }
) => {
  useEffect(() => {
    if (!containerRef.current || !parallaxRef.current) return;

    const [startPercent, endPercent] = options.yPercent || [-18, 18];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        {
          yPercent: startPercent,
        },
        {
          yPercent: endPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start,
            end: options.end,
            scrub: options.scrub,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, parallaxRef, options]);
};

export default useParallax;
