import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      /*
        Local background parallax.
        The image layer is oversized so it can move
        vertically while the section scrolls normally.
      */
      gsap.fromTo(
        parallaxRef.current,
        {
          yPercent: -18,
        },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      /*
        Philosophy typography reveal.
      */
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
        min-h-screen
        overflow-hidden
        px-05
        py-25
        md:px-8
        md:py-56
        mb-4
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
      <div className="relative z-10">
        <div className="mb-12 font-mono-ui text-[9px] uppercase tracking-[.3em] text-white/60">
          01 / Philosophy
        </div>

        <div
          className="
            max-w-6xl
            text-[11vw]
            leading-[.86]
            tracking-[-.065em]
            text-white
            md:text-[8.7vw]
          "
        >
          {philosophyLines.map((line, i) => (
            <div
              key={line}
              className={`ph-line ${
                i === 2 ? "font-serif-display italic" : ""
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}