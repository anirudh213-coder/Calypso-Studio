import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "../base";
import { ContactItem } from "../composite";

gsap.registerPlugin(ScrollTrigger);

// Arrow icon component for map interactions
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      d="M5 19L19 5M8 5H19V16"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/*
 * ------------------------------------------------------------
 * CONNECT SECTION
 * ------------------------------------------------------------
 */

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(".connect-index", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".connect-map",
          {
            y: 45,
            opacity: 0,
            scale: 0.97,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35",
        )
        .from(
          ".connect-main",
          {
            y: 45,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.7",
        )
        .from(
          ".connect-contact",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".connect-footer",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        border-t
        border-white/15

        px-4
        py-10
        text-center

        xs:px-5
        sm:px-6

        md:px-8
        md:py-14
      "
    >
      {/* HEADER */}

      <div
        className="
          connect-index
          flex
          items-center
          justify-center
          font-mono-ui
          text-[9px]
          uppercase
          tracking-[.3em]
          text-white/45

          md:justify-between
        "
      >
        <span className="hidden md:block">
          Independent digital studio
        </span>
      </div>

      {/* MAIN */}

      <div
        className="
          mt-12
          grid
          justify-items-center
          gap-10

          md:mt-16
          md:grid-cols-12
          md:gap-8
        "
      >
        {/* MAP */}

        <div
          className="
            connect-map
            w-full
            md:col-span-7
          "
        >
          <div
            data-cursor="pin"
            className="
              group
              relative
              mx-auto
              aspect-[16/10]
              w-full
              cursor-none
              overflow-hidden
              border
              border-white/10
              bg-[#111]
            "
          >
            <iframe
              title="Calypso studio location"
              src="https://www.google.com/maps?q=Bangalore%2C%20India&z=12&output=embed"
              className="
                pointer-events-none
                absolute
                inset-0
                h-full
                w-full
                border-0
                grayscale
                invert
                opacity-55
                transition-all
                duration-1000
                group-hover:opacity-75
              "
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/10" />

            <div
              className="
                absolute
                left-4
                top-4
                font-mono-ui
                text-[8px]
                tracking-[.2em]
                text-white/55
              "
            >
              12.9716° N
            </div>

            <div
              className="
                absolute
                right-4
                top-4
                font-mono-ui
                text-[8px]
                tracking-[.2em]
                text-white/35
              "
            >
              77.5946° E
            </div>

            <div
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <span className="absolute -inset-6 animate-ping rounded-full border border-white/20" />

              <div
                className="
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/60
                  bg-black/60
                  backdrop-blur-sm
                "
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 text-left">
              <div
                className="
                  font-mono-ui
                  text-[8px]
                  uppercase
                  tracking-[.2em]
                  text-white/30
                "
              >
                Studio location
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Bangalore%2C%20India"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="
                  mt-1
                  block
                  text-lg
                  tracking-[-.03em]
                  transition-opacity
                  hover:opacity-70
                "
              >
                Bangalore, India
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Bangalore%2C%20India"
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              className="
                group
                absolute
                bottom-4
                right-4
                flex
                items-center
                gap-3
                font-mono-ui
                text-[8px]
                uppercase
                tracking-[.2em]
                text-white/50
                transition-colors
                hover:text-white
              "
            >
              Open maps

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        {/* CONTACT DIRECTORY */}

        <div
          className="
            connect-main
            w-full
            max-w-xl
            text-center

            md:col-span-5
            md:max-w-none
            md:text-left
          "
        >
          <p
            className="
              mb-6
              font-mono-ui
              text-[9px]
              uppercase
              tracking-[.25em]
              text-white/40
            "
          >
            Have an ambitious idea?
          </p>

          {/* BIG EMAIL */}

          <a
            href="mailto:hello@calypso.studio"
            data-cursor="interactive"
            className="group block overflow-hidden"
          >
            <div
              className="
                text-[clamp(2.7rem,9vw,4rem)]
                leading-[.78]
                tracking-[-.075em]

                sm:text-[clamp(3rem,7vw,5rem)]

                md:text-[clamp(3rem,5vw,6rem)]
              "
            >
              <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[0.025em]">
                HELLO@
              </span>

              <span className="font-serif-display inline-block transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:italic">
                CALYPSO
              </span>

              <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]">
                .STUDIO
              </span>
            </div>
          </a>

          {/* CONTACTS */}

          <div className="mt-12 text-center md:text-left">
            <div className="connect-contact border-t border-white/10 py-5">
              <ContactItem
                icon="mail"
                label="Email"
                value="hello@calypso.studio"
                href="mailto:hello@calypso.studio"
                isLink
              />
            </div>

            <div className="connect-contact border-t border-white/10 py-5">
              <ContactItem
                icon="phone"
                label="Phone"
                value="+91 00000 00000"
                href="tel:+910000000000"
                isLink
              />
            </div>

            <div className="connect-contact border-t border-white/10 py-5">
              <ContactItem
                icon="location"
                label="Studio"
                value="Bangalore, India"
                href="https://www.google.com/maps/search/?api=1&query=Bangalore%2C%20India"
                isLink
              />
            </div>

            <div className="connect-contact border-t border-white/10 py-5">
              <ContactItem
                icon="instagram"
                label="Instagram"
                value="@calypso.studio"
                href="https://instagram.com/calypso.studio"
                isLink
              />
            </div>

            <div className="connect-contact border-t border-white/10 py-5">
              <ContactItem
                icon="linkedin"
                label="LinkedIn"
                value="Calypso Studio"
                href="https://www.linkedin.com/"
                isLink
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
          connect-footer
          mt-12
          grid
          justify-items-center
          gap-3
          border-t
          border-white/10
          pt-5
          font-mono-ui
          text-[9px]
          uppercase
          tracking-[.2em]
          text-white/35

          md:mt-16
          md:grid-cols-3
          md:justify-items-stretch
        "
      >
        <span className="text-center md:text-left">
          © 2026 Calypso
        </span>

        <span className="text-center">
          India / Worldwide
        </span>

        <span className="text-center md:text-right">
          Built by{" "}
          <a
            href="https://github.com/anirudh213-coder"
            target="_blank"
            rel="noreferrer"
            className="text-white/50 transition-colors duration-300 hover:text-white"
          >
            Anirudh Makwana
          </a>
        </span>
      </div>
    </section>
  );
}