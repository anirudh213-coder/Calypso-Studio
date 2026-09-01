import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading, Text, Container } from "../base";
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
      className="
        relative
        min-h-[calc(100dvh+2rem)]
        overflow-hidden
        bg-black
        text-white

        pt-6

        xs:pt-8
        sm:pt-10

        md:min-h-dvh
        md:pt-0
        md:mt-4
      "
    >
      {/* ======================================================
          BACKGROUND VIDEO
      ======================================================= */}

      <div
        data-cursor="camera"
        className="
          absolute
          inset-0
          z-0
          cursor-none
        "
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
          className="
            h-full
            w-full
            object-cover
          "
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

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-20
          w-full
          px-4
          pt-6

          xs:px-5
          xs:pt-8

          sm:px-6
          sm:pt-10

          md:px-8
          md:pt-8

          lg:px-10
          lg:pt-10

          xl:px-12
          xl:pt-12

          2xl:px-16
        "
      >
        <h2
          className="
            archive-title
            m-0
            w-full
            max-w-none

            text-[clamp(4rem,17vw,8rem)]
            font-medium
            leading-[0.82]
            tracking-[-0.07em]

            xs:text-[clamp(4.5rem,16vw,9rem)]
            sm:text-[clamp(5rem,15vw,10rem)]
            md:text-[clamp(6rem,13vw,11rem)]
            lg:text-[clamp(7rem,11vw,13rem)]
            xl:text-[clamp(8rem,10vw,15rem)]
            2xl:text-[clamp(9rem,9vw,17rem)]
            3xl:text-[clamp(10rem,8vw,19rem)]
          "
        >
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
        className="
          archive-project-info
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-20
          w-full
          px-4
          pb-8
          text-left

          xs:px-5
          xs:pb-10

          sm:px-6
          sm:pb-10

          md:px-8
          md:pb-8

          lg:px-10
          lg:pb-10

          xl:px-12
          xl:pb-12

          2xl:px-16
          2xl:pb-14
        "
      >
        <div
          className="
            mb-3
            font-mono-ui
            text-[8px]
            uppercase
            tracking-[.2em]
            text-white/50

            sm:text-[9px]
            lg:text-[10px]
          "
        >
          {activeProject.year}
        </div>

        <h3
          className="
            w-full
            max-w-none
            text-[clamp(2.5rem,8vw,5.5rem)]
            leading-none
            tracking-[-0.06em]

            xs:text-[clamp(2.75rem,8vw,6rem)]
            sm:text-[clamp(3rem,7vw,6.5rem)]
            md:text-[clamp(3.5rem,6vw,7rem)]
            lg:text-[clamp(4rem,5vw,8rem)]
            xl:text-[clamp(4.5rem,4.5vw,9rem)]
            2xl:text-[clamp(5rem,4vw,10rem)]
          "
        >
          {activeProject.title}
        </h3>

        <div
          className="
            mt-3
            font-mono-ui
            text-[8px]
            uppercase
            tracking-[.2em]
            text-white/50

            sm:text-[9px]
            lg:text-[10px]
          "
        >
          {activeProject.category}
        </div>

        <div
          className="
            mt-5
            font-mono-ui
            text-[7px]
            uppercase
            tracking-[.25em]
            text-white/35

            sm:text-[8px]
            md:mt-6
          "
        >
          Click video For Next project
        </div>
      </div>
    </section>
  );
}