import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParallax } from "../../hooks";
import { Heading, Text } from "../base";
import { philosophyLines } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

/*
  Split editorial images used only as the Philosophy
  section's local parallax background.
*/
const philosophyImages = [
  "https://images.unsplash.com/photo-1728555729413-06b511297f64?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1504293538349-0be9a181d474?auto=format&fit=crop&w=1800&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",
];

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Use parallax hook for background effect
  useParallax(ref, parallaxRef, {
    yPercent: [-18, 18],
    scrub: 1.2,
    start: "top bottom",
    end: "bottom top",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typography reveal animation
      gsap.from(".ph-line", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="
        relative
        min-h-dvh
        overflow-hidden

        px-4
        pt-16
        pb-28
        mb-4

        xs:px-5
        xs:pt-20
        xs:pb-36

        sm:px-6
        sm:pt-24
        sm:pb-44

        md:px-8
        md:pt-40
        md:pb-48

        lg:px-10
        lg:pt-48
        lg:pb-56

        xl:px-12
        xl:pt-56
        xl:pb-64

        2xl:px-16
        2xl:pt-64
        2xl:pb-72

        3xl:px-20
      "
    >
      {/* Local split-image parallax background. */}

      <div
        ref={parallaxRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          -top-[22%]
          -bottom-[22%]
          z-0
          overflow-hidden
        "
      >
        {/* Three vertical image panels. */}

        <div className="absolute inset-0 flex gap-[2px]">
          {philosophyImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="
                relative
                h-full
                min-w-0
                flex-1
                overflow-hidden
              "
            >
              <img
                src={image}
                alt=""
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              />

              {/* Individual image darkness. */}

              <div className="absolute inset-0 bg-black/45" />

              {/* Subtle Calypso peach tone in the center panel. */}

              {index === 1 && (
                <div className="absolute inset-0 bg-[#F3B39D]/10 mix-blend-screen" />
              )}
            </div>
          ))}
        </div>

        {/* Overall dark treatment. */}

        <div className="absolute inset-0 bg-black/20" />

        {/* Soft central vignette. */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.72)_88%)]
          "
        />
      </div>

      {/* Philosophy content stays in normal document flow. */}

      <div className="relative z-10 flex min-h-[70dvh] w-full flex-col justify-between">
        <div className="w-full max-w-none text-[clamp(3.75rem,11vw,7rem)] leading-[1.02] tracking-[-0.065em] text-white xs:text-[clamp(4rem,10.5vw,8rem)] sm:text-[clamp(4.5rem,10vw,9rem)] md:text-[clamp(5rem,8.7vw,10rem)] md:leading-[0.94] lg:text-[clamp(6rem,8vw,12rem)] lg:leading-[0.90] xl:text-[clamp(7rem,7.5vw,14rem)] xl:leading-[0.88] 2xl:text-[clamp(8rem,7vw,16rem)] 2xl:leading-[0.86] 3xl:text-[clamp(9rem,6.5vw,18rem)] 3xl:leading-[0.84]">
          {philosophyLines.map((line, i) => (
            <div
              key={`${line}-${i}`}
              className={`ph-line ${i === 2 ? "font-serif-display italic" : ""} ${i < philosophyLines.length - 1 ? "mb-[0.18em] xs:mb-[0.22em] sm:mb-[0.25em] md:mb-[0.16em] lg:mb-[0.14em]" : ""}`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Breathing space */}
        <div
          aria-hidden="true"
          className="h-20 xs:h-24 sm:h-28 md:h-20 lg:h-24 xl:h-28"
        />
      </div>
    </section>
  );
}