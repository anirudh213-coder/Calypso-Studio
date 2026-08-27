import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    const overInteractive = () => gsap.to(el, { scale: 2.6, duration: .25, ease: 'power2.out' });
    const outInteractive = () => gsap.to(el, { scale: 1, duration: .25, ease: 'power2.out' });
    window.addEventListener('mousemove', move);
    const targets = document.querySelectorAll<HTMLElement>('a, button, [data-cursor="interactive"]');
    targets.forEach(t => { t.addEventListener('mouseenter', overInteractive); t.addEventListener('mouseleave', outInteractive); });
    return () => {
      window.removeEventListener('mousemove', move);
      targets.forEach(t => { t.removeEventListener('mouseenter', overInteractive); t.removeEventListener('mouseleave', outInteractive); });
    };
  }, []);

  return <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block" />;
}
