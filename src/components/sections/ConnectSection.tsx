import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
 * ------------------------------------------------------------
 * ICONS
 * ------------------------------------------------------------
 */

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

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    <path
      d="M4 7L12 13L20 7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      d="M7.2 3.8L10 8L8.3 10.1C9.4 12.4 11.2 14.2 13.5 15.3L15.6 13.6L19.8 16.4C20.5 16.9 20.7 17.9 20.2 18.6L18.9 20.3C18.4 21 17.5 21.2 16.7 20.9C10 18.6 5.4 14 3.1 7.3C2.8 6.5 3 5.6 3.7 5.1L5.4 3.8C6.1 3.3 6.7 3.1 7.2 3.8Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      d="M19 10C19 15 12 21 12 21C12 21 5 15 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    <circle
      cx="12"
      cy="10"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <rect
      x="3.5"
      y="3.5"
      width="17"
      height="17"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    <path
      d="M7 10V17"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    <circle
      cx="7"
      cy="7"
      r="0.9"
      fill="currentColor"
    />

    <path
      d="M11 17V13.5C11 11.8 11.8 10.8 13.2 10.8C14.8 10.8 15.5 12 15.5 13.5V17"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

/*
 * ------------------------------------------------------------
 * CONTACT ITEM
 * ------------------------------------------------------------
 */

interface ContactLinkProps {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

function ContactLink({
  label,
  value,
  href,
  icon,
}: ContactLinkProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (!iconRef.current || !valueRef.current) return;

    gsap.to(iconRef.current, {
      scale: 1.2,
      x: 5,
      y: -5,
      rotation: -7,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(valueRef.current, {
      x: 8,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!iconRef.current || !valueRef.current) return;

    gsap.to(iconRef.current, {
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
    });

    gsap.to(valueRef.current, {
      x: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <a
      href={href}
      className="group flex items-center justify-between border-t border-white/10 py-5"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="flex items-center gap-5">
        <span
          ref={iconRef}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white"
        >
          {icon}
        </span>

        <div>
          <span className="block font-mono-ui text-[8px] uppercase tracking-[.22em] text-white/30">
            {label}
          </span>

          <span
            ref={valueRef}
            className="mt-2 block text-lg tracking-[-.025em] transition-opacity duration-300 group-hover:opacity-70"
          >
            {value}
          </span>
        </div>
      </div>

      <span className="text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white/70">
        <ArrowIcon />
      </span>
    </a>
  );
}

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
      className="relative overflow-hidden border-t border-white/15 px-5 py-10 md:px-8 md:py-14"
    >
      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="connect-index flex items-center justify-between font-mono-ui text-[9px] uppercase tracking-[.3em] text-white/45">
        <span>Connect</span>

        <span className="hidden md:block">
          Independent digital studio
        </span>
      </div>

      {/* ======================================================
          MAIN
      ======================================================= */}

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
        {/* ====================================================
            LARGE MAP — LEFT
        ===================================================== */}

        <div className="connect-map md:col-span-7">
          <div className="group relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#111]">
            <iframe
              title="Calypso studio location"
              src="https://www.google.com/maps?q=Bangalore%2C%20India&z=12&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale invert opacity-55 transition-all duration-1000 group-hover:opacity-75"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="pointer-events-none absolute inset-0 bg-black/10" />

            <div className="absolute left-4 top-4 font-mono-ui text-[8px] tracking-[.2em] text-white/55">
              12.9716° N
            </div>

            <div className="absolute right-4 top-4 font-mono-ui text-[8px] tracking-[.2em] text-white/35">
              77.5946° E
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute -inset-6 animate-ping rounded-full border border-white/20" />

              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-black/60 backdrop-blur-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4">
              <div className="font-mono-ui text-[8px] uppercase tracking-[.2em] text-white/30">
                Studio location
              </div>

              <div className="mt-1 text-lg tracking-[-.03em]">
                Bangalore, India
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Bangalore%2C%20India"
              target="_blank"
              rel="noreferrer"
              className="group absolute bottom-4 right-4 flex items-center gap-3 font-mono-ui text-[8px] uppercase tracking-[.2em] text-white/50 transition-colors hover:text-white"
            >
              Open maps

              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </div>

        {/* ====================================================
            CONTACT DIRECTORY — RIGHT
        ===================================================== */}

        <div className="connect-main md:col-span-5">
          <p className="mb-6 font-mono-ui text-[9px] uppercase tracking-[.25em] text-white/40">
            Have an ambitious idea?
          </p>

          {/* BIG EMAIL */}

          <a
            href="mailto:hello@calypso.studio"
            data-cursor="interactive"
            className="group block overflow-hidden"
          >
            <div className="text-[clamp(3rem,5vw,6rem)] leading-[.78] tracking-[-.075em]">
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

          <div className="mt-12">
            <div className="connect-contact">
              <ContactLink
                label="Email"
                value="hello@calypso.studio"
                href="mailto:hello@calypso.studio"
                icon={<MailIcon />}
              />
            </div>

            <div className="connect-contact">
              <ContactLink
                label="Phone"
                value="+91 00000 00000"
                href="tel:+910000000000"
                icon={<PhoneIcon />}
              />
            </div>

            <div className="connect-contact">
              <ContactLink
                label="Studio"
                value="Bangalore, India"
                href="https://www.google.com/maps/search/?api=1&query=Bangalore%2C%20India"
                icon={<LocationIcon />}
              />
            </div>

            <div className="connect-contact">
              <ContactLink
                label="Instagram"
                value="@calypso.studio"
                href="#"
                icon={<InstagramIcon />}
              />
            </div>

            <div className="connect-contact">
              <ContactLink
                label="LinkedIn"
                value="Calypso Studio"
                href="#"
                icon={<LinkedinIcon />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          FOOTER
      ======================================================= */}

      <div className="connect-footer mt-12 grid gap-3 border-t border-white/10 pt-5 font-mono-ui text-[9px] uppercase tracking-[.2em] text-white/35 md:mt-16 md:grid-cols-3">
        <span>© 2026 Calypso</span>

        <span className="md:text-center">
          India / Worldwide
        </span>

        <span className="md:text-right">
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