import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ArchiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];

  /*
   * ------------------------------------------------------------
   * SECTION INTRO
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(".archive-label", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      })
        .from(
          ".archive-title",
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.5",
        )
        .from(
          ".archive-project-info",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.6",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /*
   * ------------------------------------------------------------
   * CHANGE PROJECT
   * ------------------------------------------------------------
   */

  const changeProject = () => {
    const nextIndex = (activeIndex + 1) % projects.length;

    const video = videoRef.current;
    const info = projectInfoRef.current;

    if (!video || !info) {
      setActiveIndex(nextIndex);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
      },
    });

    tl.to(
      video,
      {
        opacity: 0,
        scale: 1.05,
        duration: 0.45,
        ease: "power3.inOut",
      },
      0,
    ).to(
      info,
      {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power3.in",
      },
      0,
    );
  };

  /*
   * ------------------------------------------------------------
   * PLAY NEW VIDEO + ENTER ANIMATION
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const video = videoRef.current;
    const info = projectInfoRef.current;

    if (!video || !info) return;

    video.load();

    const playVideo = () => {
      video.currentTime = 0;

      void video.play().catch(() => {
        // Browser autoplay restrictions are ignored safely.
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, {
        once: true,
      });
    }

    gsap.fromTo(
      video,
      {
        opacity: 0,
        scale: 1.05,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power4.out",
      },
    );

    gsap.fromTo(
      info,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power4.out",
      },
    );

    return () => {
      video.removeEventListener("loadeddata", playVideo);
    };
  }, [activeIndex]);

  /*
   * ------------------------------------------------------------
   * KEYBOARD SUPPORT
   * ------------------------------------------------------------
   */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      changeProject();
    }
  };

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black text-white md:mt-4"
    >
      {/* ======================================================
          BACKGROUND VIDEO
      ======================================================= */}

      <div
        className="absolute inset-0 z-0 cursor-pointer"
        onClick={changeProject}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Change selected project. Current project: ${activeProject.title}`}
      >
        <video
          ref={videoRef}
          key={activeProject.video}
          src={activeProject.video}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="pointer-events-none absolute inset-0 bg-black/25" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      </div>

      {/* ======================================================
          SELECTED WORK — TOP LEFT
      ======================================================= */}

      <div className="pointer-events-none absolute left-5 top-8 z-20 md:left-8 md:top-10">
        <div className="archive-label font-mono-ui text-[9px] uppercase tracking-[.3em] text-white/60">
          Archive
        </div>

        <h2 className="archive-title mt-4 text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em]">
          Selected
          <br />
          work
        </h2>
      </div>

      {/* ======================================================
          ACTIVE PROJECT — BOTTOM LEFT
      ======================================================= */}

      <div
        ref={projectInfoRef}
        className="archive-project-info pointer-events-none absolute bottom-8 left-5 z-20 text-left md:bottom-10 md:left-8"
      >
        <div className="mb-3 font-mono-ui text-[9px] uppercase tracking-[.2em] text-white/50">
          {activeProject.year}
        </div>

        <h3 className="text-[clamp(2.5rem,5vw,5.5rem)] leading-none tracking-[-0.06em]">
          {activeProject.title}
        </h3>

        <div className="mt-3 font-mono-ui text-[9px] uppercase tracking-[.2em] text-white/50">
          {activeProject.category}
        </div>

        <div className="mt-6 font-mono-ui text-[8px] uppercase tracking-[.25em] text-white/35">
          Click video For Next project
        </div>
      </div>
    </section>
  );
}