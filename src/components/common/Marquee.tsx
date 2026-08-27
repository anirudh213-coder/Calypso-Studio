import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const services = [
  'DIGITAL DESIGN',
  'INTERIOR DESIGN',
  'ART DIRECTION',
  'IDENTITY',
  'SPATIAL',
  'WEB EXPERIENCES',
];

const references = [
  {
    name: 'EK Type',
    src: '/logos/Ek-logo.svg',
  },
  {
    name: 'OBYS',
    src: '/logos/obys.svg',
  },
  {
    name: 'Pentagram',
    src: '/logos/Pentagram_(design_firm)_logo.svg',
  },

  // Companies
  {
    name: 'Adobe',
    src: '/logos/adobe.svg',
  },
  {
    name: 'alienware',
    src: '/logos/alienware.svg',
  },
  {
    name: 'airbnb-wordmark',
    src: '/logos/airbnb-wordmark.svg',
  },
  {
    name: 'spotify-wordmark',
    src: '/logos/spotify-wordmark.svg',
  },
  {
    name: 'asus',
    src: '/logos/asus.svg',
  },
  {
    name: 'airtel',
    src: '/logos/airtel.svg',
  },
  {
    name: 'airasia',
    src: '/logos/airasia.svg',
  },
  {
    name: 'air-canada',
    src: '/logos/air-canada.svg',
  },

  // Awards
  {
    name: 'Awwwards',
    src: '/logos/awwwards-mono.svg',
  },
  {
    name: 'CSS Design Awards',
    src: '/logos/cssda-wotd-white.svg',
  },
  {
    name: 'The One Club',
    src: '/logos/ONE_Asia_Logo.png',
  },
  {
    name: 'bbc',
    src: '/logos/bbc.svg',
  },
  {
    name: 'alibaba',
    src: '/logos/alibaba.svg',
  },
];

export default function Marquee() {
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topTrack = topTrackRef.current;
    const bottomTrack = bottomTrackRef.current;

    if (!topTrack || !bottomTrack) return;

    const ctx = gsap.context(() => {
      const topContent = topTrack.innerHTML;
      const bottomContent = bottomTrack.innerHTML;

      topTrack.innerHTML = topContent + topContent;
      bottomTrack.innerHTML = bottomContent + bottomContent;

      const topWidth = topTrack.scrollWidth / 2;
      const bottomWidth = bottomTrack.scrollWidth / 2;

      // Services → left
      gsap.to(topTrack, {
        x: -topWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

      // References → right
      gsap.fromTo(
        bottomTrack,
        {
          x: -bottomWidth,
        },
        {
          x: 0,
          duration: 85,
          ease: 'none',
          repeat: -1,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative overflow-hidden border-y border-black/10"
      aria-label="Calypso services and selected references"
    >
      {/* ======================================================
          TOP — SERVICES
      ======================================================= */}

      <div className="overflow-hidden border-b border-black/10 bg-white py-4 md:py-5">
        <div
          ref={topTrackRef}
          className="flex w-max items-center whitespace-nowrap"
        >
          {services.map((service, index) => (
            <div
              key={`${service}-${index}`}
              className="flex items-center"
            >
              <span className="px-6 text-[clamp(1.5rem,3vw,3.5rem)] leading-none tracking-[-0.05em] text-black md:px-10">
                {service}
              </span>

              <span
                className="text-[10px] text-black/45 md:text-xs"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================
          BOTTOM — REFERENCES / COMPANIES / AWARDS
      ======================================================= */}

      <div className="overflow-hidden bg-[#ebe9e9] py-4 md:py-5">
        <div
          ref={bottomTrackRef}
          className="flex w-max items-center whitespace-nowrap"
        >
          {references.map((reference, index) => (
            <div
              key={`${reference.name}-${index}`}
              className="group flex items-center"
            >
              <span className="flex min-w-[160px] items-center justify-center px-8 md:min-w-[210px] md:px-12">
                <img
                  src={reference.src}
                  alt={reference.name}
                  className="
                    h-8
                    w-auto
                    max-w-[160px]
                    object-contain
                    opacity-70
                    grayscale
                    transition-all
                    duration-500
                    group-hover:scale-[1.05]
                    group-hover:opacity-100
                    md:h-10
                    md:max-w-[190px]
                  "
                />
              </span>

              <span
                className="text-[10px] text-black/20 md:text-xs"
                aria-hidden="true"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}