import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

interface ScrollToOptions {
  duration?: number;
  ease?: string;
  offsetY?: number;
}

export const useScrollTo = () => {
  const scrollTo = (elementId: string, options: ScrollToOptions = {}) => {
    const {
      duration = 1.25,
      ease = 'power4.inOut',
      offsetY = 0,
    } = options;

    const element = document.getElementById(elementId);
    if (!element) return;

    gsap.to(window, {
      duration,
      scrollTo: {
        y: element,
        offsetY,
      },
      ease,
    });
  };

  return { scrollTo };
};

export default useScrollTo;
