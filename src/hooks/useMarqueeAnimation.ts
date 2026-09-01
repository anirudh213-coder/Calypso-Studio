import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MarqueeAnimationOptions {
  duration?: number;
  ease?: string;
}

export const useMarqueeAnimation = (
  topTrackRef: React.RefObject<HTMLDivElement>,
  bottomTrackRef: React.RefObject<HTMLDivElement>,
  options: MarqueeAnimationOptions = {
    duration: 30,
    ease: 'none',
  }
) => {
  useEffect(() => {
    const topTrack = topTrackRef.current;
    const bottomTrack = bottomTrackRef.current;

    if (!topTrack || !bottomTrack) return;

    const ctx = gsap.context(() => {
      const topContent = topTrack.innerHTML;
      const bottomContent = bottomTrack.innerHTML;

      topTrack.innerHTML = topContent + topContent;
      bottomTrack.innerHTML = bottomContent + bottomContent;

      const topTrackWidth = topTrack.offsetWidth / 2;
      const bottomTrackWidth = bottomTrack.offsetWidth / 2;

      gsap.fromTo(
        topTrack,
        { x: 0 },
        {
          x: -topTrackWidth,
          duration: options.duration,
          ease: options.ease,
          repeat: -1,
        }
      );

      gsap.fromTo(
        bottomTrack,
        { x: 0 },
        {
          x: -bottomTrackWidth,
          duration: options.duration,
          ease: options.ease,
          repeat: -1,
        }
      );
    });

    return () => ctx.revert();
  }, [topTrackRef, bottomTrackRef, options.duration, options.ease]);
};

export default useMarqueeAnimation;
