import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { ReactNode } from 'react';

export default function Magnet({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const move = (event: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = event.clientX - (r.left + r.width / 2);
      const dy = event.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(90, Math.max(r.width, r.height) * 2);
      if (dist < radius) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0); yTo(0);
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [strength]);

  return <span ref={ref} className="inline-block">{children}</span>;
}
