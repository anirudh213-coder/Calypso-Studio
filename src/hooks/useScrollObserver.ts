import { useEffect, useState, useRef } from 'react';

interface ScrollObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export const useScrollObserver = (
  ids: string[],
  options: ScrollObserverOptions = {
    rootMargin: '-35% 0px -55% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  }
) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveId(visible.target.id);
      }
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

export default useScrollObserver;
