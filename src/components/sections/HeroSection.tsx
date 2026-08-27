import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Logo } from "../common/logo";

const subtitleLines = [
  "INDEPENDENT DIGITAL DESIGN STUDIO /",
  "INDIA — WORLDWIDE",
];

const heroLetters = [
  { char: "C", from: { x: 100, y: 0 } },
  { char: "A", from: { x: 0, y: -100 } },
  { char: "L", from: { x: -100, y: 0 } },
  { char: "Y", from: { x: 0, y: 100 } },
  { char: "P", from: { x: 200, y: 0 } },
  { char: "S", from: { x: 200, y: 0 } },
  { char: "O", from: { x: 200, y: 0 } },
];

/* Unicode ranges for the multilingual typography rain. */
type UnicodeRange = {
  start: number;
  end: number;
  name: string;
};

const unicodeRanges: UnicodeRange[] = [
  // Indian scripts
  { name: "Devanagari", start: 0x0904, end: 0x097f },
  { name: "Bengali", start: 0x0981, end: 0x09ff },
  { name: "Tamil", start: 0x0b82, end: 0x0bff },
  { name: "Telugu", start: 0x0c00, end: 0x0c7f },
  { name: "Kannada", start: 0x0c80, end: 0x0cff },
  { name: "Malayalam", start: 0x0d00, end: 0x0d7f },

  // Southeast Asian scripts
  { name: "Thai", start: 0x0e01, end: 0x0e7f },
  { name: "Lao", start: 0x0e81, end: 0x0eff },
  { name: "Myanmar", start: 0x1000, end: 0x109f },
  { name: "Khmer", start: 0x1780, end: 0x17ff },

  // Middle Eastern scripts
  { name: "Hebrew", start: 0x0590, end: 0x05ff },
  { name: "Arabic", start: 0x0600, end: 0x06ff },

  // European / regional scripts
  { name: "Greek", start: 0x0370, end: 0x03ff },
  { name: "Cyrillic", start: 0x0400, end: 0x04ff },
  { name: "Armenian", start: 0x0531, end: 0x058f },
  { name: "Georgian", start: 0x10a0, end: 0x10ff },
  { name: "Ethiopic", start: 0x1200, end: 0x137f },

  // Japanese
  { name: "Hiragana", start: 0x3041, end: 0x309f },
  { name: "Katakana", start: 0x30a1, end: 0x30ff },

  // East Asian
  { name: "Han", start: 0x4e00, end: 0x9fff },
  { name: "Hangul", start: 0xac00, end: 0xd7af },
];

/* Keeps only usable visual glyphs. */
function isUsableGlyph(char: string) {
  return (
    !/\p{M}/u.test(char) &&
    !/\p{P}/u.test(char) &&
    !/\p{S}/u.test(char) &&
    !/\p{C}/u.test(char) &&
    !/\p{Z}/u.test(char)
  );
}

/* Creates an independent glyph pool for every writing system. */
function buildScriptPools() {
  const pools: Record<string, string[]> = {};

  for (const range of unicodeRanges) {
    const pool: string[] = [];

    for (
      let codePoint = range.start;
      codePoint <= range.end;
      codePoint++
    ) {
      try {
        const char = String.fromCodePoint(codePoint);

        if (isUsableGlyph(char)) {
          pool.push(char);
        }
      } catch {
        // Ignore invalid Unicode code points.
      }
    }

    if (pool.length > 0) {
      pools[range.name] = pool;
    }
  }

  return pools;
}

const scriptPools = buildScriptPools();
const scriptNames = Object.keys(scriptPools);

/*
  Picks a script first and a glyph second.

  This is important:
  Han has thousands of characters, but Han now gets the
  same script-level probability as Devanagari, Arabic,
  Greek, Japanese, etc.
*/
function getRandomGlyph() {
  const randomScript =
    scriptNames[
      Math.floor(Math.random() * scriptNames.length)
    ];

  const pool = scriptPools[randomScript];

  return pool[
    Math.floor(Math.random() * pool.length)
  ];
}

/* Creates a long mixed stream of globally distributed glyphs. */
function generateUnicodeColumn(length = 180) {
  return Array.from(
    { length },
    () => getRandomGlyph(),
  );
}

/* Number of streams controls the density of the background rain. */
const languageColumns = Array.from(
  { length: 14 },
  () => generateUnicodeColumn(180),
);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const devanagariRef = useRef<HTMLDivElement>(null);

  /* Main hero entrance animation. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const subtitleChars =
        subtitleRef.current?.querySelectorAll(
          ".subtitle-char",
        );

      const letters =
        lettersRef.current?.querySelectorAll(
          ".hero-letter",
        );

      const psO =
        lettersRef.current?.querySelectorAll(
          ".typing-letter",
        );

      if (!subtitleChars || !letters || !psO) return;

      gsap.set(logoRef.current, {
        x: -120,
        opacity: 0,
      });

      gsap.set(subtitleChars, {
        opacity: 0,
        y: 8,
      });

      gsap.set(letters, {
        opacity: 0,
      });

      gsap.set(".letter-C", {
        x: -100,
      });

      gsap.set(".letter-A", {
        y: 100,
      });

      gsap.set(".letter-L", {
        x: -100,
      });

      gsap.set(".letter-Y", {
        y: 100,
      });

      gsap.set(psO, {
        opacity: 0,
        y: 50,
      });

      const timeline = gsap.timeline();

      // Logo entrance.
      timeline.to(logoRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      });

      // Subtitle typing effect.
      timeline.to(subtitleChars, {
        opacity: 1,
        y: 0,
        duration: 0.01,
        stagger: 0.02,
        ease: "none",
      });

      // C entrance.
      timeline.to(".letter-C", {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      });

      // A entrance.
      timeline.to(
        ".letter-A",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.45",
      );

      // L entrance.
      timeline.to(
        ".letter-L",
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.45",
      );

      // Y entrance.
      timeline.to(
        ".letter-Y",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.45",
      );

      // PSO entrance.
      timeline.to(psO, {
        opacity: 1,
        y: 0,
        duration: 0.22,
        stagger: 0.3,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /*
    Continuous vertical multilingual rain.

    Every column contains two identical copies.
    The animation travels exactly one copy height and
    immediately repeats, creating a seamless infinite loop.
  */
  useEffect(() => {
    if (!devanagariRef.current) return;

    const tracks =
      devanagariRef.current.querySelectorAll(
        ".devanagari-track",
      );

    const animations: gsap.core.Tween[] = [];

    tracks.forEach((track, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      // One complete copy of the vertical stream.
      const singleCopyHeight =
        track.scrollHeight / 2;

      /*
        Slow atmospheric movement.

        Increase these values for even slower movement.
        No repeatDelay is used so the rain never pauses.
      */
      const duration =
        direction === 1
          ? 45 + (index % 5) * 90
          : 38 + (index % 4) * 90;

      const startY =
        direction === 1
          ? -singleCopyHeight
          : 0;

      const endY =
        direction === 1
          ? 0
          : -singleCopyHeight;

      const tween = gsap.fromTo(
        track,
        {
          y: startY,
        },
        {
          y: endY,
          duration,
          ease: "none",
          repeat: -1,
          repeatDelay: 0,
        },
      );

      animations.push(tween);
    });

    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden px-5 pb-10 pt-6 md:px-8 md:pt-8"
    >
      <div className="relative z-10 min-h-[calc(100vh-2rem)]">

        {/* Main content sits above the typography rain. */}
        <div className="relative z-20 flex min-h-[calc(100vh-2rem)] w-full flex-col justify-between pr-0 md:w-[72%] md:pr-8">

          {/* Top content. */}
          <div className="flex flex-col">

            {/* Large logo. */}
            <div
              ref={logoRef}
              className="w-fit -translate-y-4 md:-translate-y-6"
            >
              <Logo className="h-auto w-64 text-white md:w-[30rem]" />
            </div>

            {/* Subtitle. */}
            <div
              ref={subtitleRef}
              className="mt-16 flex flex-col gap-1 font-mono-ui text-[11px] uppercase leading-[1.35] tracking-[0.2em] text-white italic md:mt-20 md:text-xl"
              aria-label={`${subtitleLines[0]} ${subtitleLines[1]}`}
            >
              {subtitleLines.map((line, lineIndex) => (
                <div
                  key={line}
                  className="flex flex-wrap"
                >
                  {line.split("").map((char, index) => (
                    <span
                      key={`${lineIndex}-${char}-${index}`}
                      className="subtitle-char whitespace-pre"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom content. */}
          <div ref={lettersRef}>

            {/* Main title. */}
            <div className="flex items-end">

              {/* CALY. */}
              {heroLetters.slice(0, 4).map(
                (letter, index) => (
                  <span
                    key={`${letter.char}-${index}`}
                    className={[
                      "hero-letter inline-block text-[19vw] font-semibold leading-[0.80] tracking-[-0.09em] text-[#F4A261] md:text-[16vw]",
                      index === 0 ? "letter-C" : "",
                      index === 1 ? "letter-A" : "",
                      index === 2 ? "letter-L" : "",
                      index === 3 ? "letter-Y" : "",
                    ].join(" ")}
                  >
                    {letter.char}
                  </span>
                ),
              )}

              {/* PSO with soft white neon glow. */}
              {heroLetters.slice(4).map(
                (letter, index) => (
                  <span
                    key={`${letter.char}-${index + 4}`}
                    className={[
                      "typing-letter relative mx-[0.01em] inline-block italic text-[19vw] font-semibold leading-[0.80] tracking-[-0.09em] text-white md:text-[16vw]",
                      "drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]",
                      "drop-shadow-[0_0_24px_rgba(255,255,255,0.22)]",
                    ].join(" ")}
                  >
                    {letter.char}
                  </span>
                ),
              )}
            </div>

            {/* Supporting description. */}
            <div className="mt-10 border-t border-white/15 pt-4">
              <p className="max-w-md text-md leading-relaxed text-white/65 underline">
                We build identities, digital spaces and visual systems for
                brands that refuse to look ordinary.
              </p>
            </div>
          </div>
        </div>

        {/* Full-height multilingual Unicode rain behind the hero title. */}
        <div
          ref={devanagariRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            hidden
            overflow-hidden
            select-none
            md:block
          "
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 5%, black 13%, black 87%, rgba(0,0,0,0.35) 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 5%, black 13%, black 87%, rgba(0,0,0,0.35) 95%, transparent 100%)",
          }}
        >
          <div
            className="
              absolute
              right-[-1%]
              top-0
              flex
              h-full
              w-[57%]
              justify-between
              gap-x-5
              px-1
              md:gap-x-7
            "
          >
            {languageColumns.map((column, index) => {
              // Duplicate the stream for a seamless infinite loop.
              const repeatedColumn = [
                ...column,
                ...column,
              ];

              return (
                <div
                  key={index}
                  className="
                    relative
                    h-full
                    w-[22px]
                    overflow-hidden
                    opacity-35
                    md:w-[28px]
                  "
                >
                  <div
                    className={[
                      "devanagari-track absolute left-1/2 flex -translate-x-1/2 flex-col items-center",
                      "will-change-transform",
                    ].join(" ")}
                  >
                    {repeatedColumn.map(
                      (glyph, glyphIndex) => (
                        <span
                          key={`${glyph}-${glyphIndex}`}
                          className="
                            block
                            h-[29px]
                            w-[24px]
                            select-none
                            text-center
                            font-serif
                            text-[11px]
                            font-normal
                            leading-[29px]
                            tracking-normal
                            text-[#F4A261]/100
                            md:h-[33px]
                            md:w-[28px]
                            md:text-[23px]
                            md:leading-[33px]
                          "
                        >
                          {glyph}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}