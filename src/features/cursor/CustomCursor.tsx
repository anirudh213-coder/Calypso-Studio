  
import { useEffect, useRef } from 'react';

type CursorType = 'default' | 'camera' | 'pin';

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    /*
     * ------------------------------------------------------------
     * CURSOR POSITION
     * ------------------------------------------------------------
     * Direct browser-like movement.
     * No GSAP smoothing or trailing.
     */

    const move = (event: MouseEvent) => {
      el.style.left = `${event.clientX}px`;
      el.style.top = `${event.clientY}px`;
    };

    /*
     * ------------------------------------------------------------
     * CURSOR TYPE
     * ------------------------------------------------------------
     * Only Archive and Connect map can change the cursor.
     */

    const setCursorType = (type: CursorType) => {
      el.dataset.cursorType = type;
    };

    const cameraTargets =
      document.querySelectorAll<HTMLElement>(
        '[data-cursor="camera"]',
      );

    const pinTargets =
      document.querySelectorAll<HTMLElement>(
        '[data-cursor="pin"]',
      );

    const cameraEnter = () => {
      setCursorType('camera');
    };

    const pinEnter = () => {
      setCursorType('pin');
    };

    const specialLeave = () => {
      setCursorType('default');
    };

    window.addEventListener('mousemove', move);

    cameraTargets.forEach((target) => {
      target.addEventListener('mouseenter', cameraEnter);
      target.addEventListener('mouseleave', specialLeave);
    });

    pinTargets.forEach((target) => {
      target.addEventListener('mouseenter', pinEnter);
      target.addEventListener('mouseleave', specialLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);

      cameraTargets.forEach((target) => {
        target.removeEventListener('mouseenter', cameraEnter);
        target.removeEventListener('mouseleave', specialLeave);
      });

      pinTargets.forEach((target) => {
        target.removeEventListener('mouseenter', pinEnter);
        target.removeEventListener('mouseleave', specialLeave);
      });
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cursor-type="default"
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        hidden
        h-4
        w-4
        -translate-x-1/2
        -translate-y-1/2
        md:block
      "
    >
      {/* Default white cursor */}
      <span className="cursor-default-shape" />

      {/* Archive camera cursor */}
      <span className="cursor-camera-shape">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="7"
            width="18"
            height="13"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />

          <path
            d="M8 7L9.5 4H14.5L16 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="12"
            cy="13.5"
            r="3.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>

      {/* Connect map pin cursor */}
      <span className="cursor-pin-shape">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M20 10C20 15.5 12 22 12 22C12 22 4 15.5 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />

          <circle
            cx="12"
            cy="10"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>
    </div>
  );
}

