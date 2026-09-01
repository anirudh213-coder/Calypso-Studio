import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Logo } from "../common/logo";
import { Text, Container } from "../base";

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
*/

function getRandomGlyph() {
  const randomScript =
    scriptNames[Math.floor(Math.random() * scriptNames.length)];

  const pool = scriptPools[randomScript];

  return pool[Math.floor(Math.random() * pool.length)];
}

/* Creates a long mixed stream of globally distributed glyphs. */

function generateUnicodeColumn(length = 180) {
  return Array.from({ length }, () => getRandomGlyph());
}

/* Number of streams controls the density of the background rain. */

const languageColumns = Array.from({ length: 14 }, () =>
  generateUnicodeColumn(180),
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
        heroRef.current?.querySelectorAll(".subtitle-char");

      const mobileLogo =
        heroRef.current?.querySelector(".mobile-hero-logo");

      const letters =
        lettersRef.current?.querySelectorAll(".hero-letter");

      const psO =
        lettersRef.current?.querySelectorAll(".typing-letter");

      if (!subtitleChars || !letters || !psO) return;

      gsap.set(logoRef.current, {
        x: -120,
        opacity: 0,
      });

      if (mobileLogo) {
        gsap.set(mobileLogo, {
          x: -120,
          opacity: 0,
        });
      }

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

      timeline.to([logoRef.current, mobileLogo], {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
      });

      timeline.to(subtitleChars, {
        opacity: 1,
        y: 0,
        duration: 0.01,
        stagger: 0.02,
        ease: "none",
      });

      timeline.to(".letter-C", {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      });

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
  */

  useEffect(() => {
    if (!devanagariRef.current) return;

    const tracks =
      devanagariRef.current.querySelectorAll(".devanagari-track");

    const animations: gsap.core.Tween[] = [];

    tracks.forEach((track, index) => {
      const direction = index % 2 === 0 ? 1 : -1;

      const singleCopyHeight = track.scrollHeight / 2;

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
      className="
        relative
        min-h-dvh
        overflow-hidden
        px-4
        pb-8
        pt-5
        xs:px-5
        sm:px-6
        md:px-8
        md:pt-8
        lg:pt-10
      "
    >
      <div className="relative z-10 min-h-[calc(100dvh-2rem)]">

        {/* Main content sits above the typography rain. */}

        <div
          className="
            relative
            z-20
            flex
            min-h-[calc(100dvh-2rem)]
            w-full
            flex-col
            justify-between
            pr-0
            lg:w-[72%]
            lg:pr-8
          "
        >
          {/* Top content. */}

          <div className="flex flex-col">

            {/* =====================================================
                DESKTOP / TABLET VERSION
                ===================================================== */}

            <div className="hidden md:flex md:flex-col">

              {/* Large logo. */}

              <div
                ref={logoRef}
                className="
                  w-fit
                  -translate-y-3
                  sm:-translate-y-4
                  lg:-translate-y-5
                  xl:-translate-y-6
                "
              >
                <Logo
                  className="
                    h-auto
                    w-[clamp(15rem,28vw,24rem)]
                    lg:w-[clamp(20rem,30vw,30rem)]
                    text-white
                  "
                />
              </div>

              {/* Desktop subtitle. */}

              <div
                ref={subtitleRef}
                className="
                  mt-10
                  flex
                  flex-col
                  gap-1
                  font-mono-ui
                  text-[10px]
                  uppercase
                  leading-[1.35]
                  tracking-[0.16em]
                  text-white
                  italic
                  xs:mt-12
                  sm:text-[11px]
                  md:mt-16
                  md:text-base
                  lg:mt-18
                  lg:text-lg
                  xl:mt-20
                  xl:text-xl
                "
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

            {/* =====================================================
                MOBILE VERSION
                ===================================================== */}

            <div
              className="
                relative
                flex
                w-full
                flex-col
                items-center
                text-center
                md:hidden
              "
            >
              {/* Main logo */}

              <div
                className="
                  mobile-hero-logo
                  flex
                  w-full
                  justify-center
                  pt-2
                  mt-8
                  pl-0
                "
              >
                <Logo
                  className="
                    h-auto
                    w-[clamp(12rem,68vw,18rem)]
                    xs:w-[clamp(13rem,66vw,19rem)]
                    sm:w-[clamp(14rem,60vw,20rem)]
                    text-white
                  "
                />
              </div>
            </div>
          </div>

          {/* =====================================================
              MOBILE / DESKTOP HERO CONTENT
              ===================================================== */}

          <div
            ref={lettersRef}
            className="
              w-full

              md:static
              md:translate-y-0
            "
          >
            {/* Main title */}

            <div
              className="
                flex
                w-full
                items-end
                justify-center
                text-center

                translate-y-[-25vh]

                md:translate-y-0

                md:justify-start
                md:text-left
              "
            >
              {/* CALY. */}

              {heroLetters.slice(0, 4).map(
                (letter, index) => (
                  <span
                    key={`${letter.char}-${index}`}
                    className={[
                      `
                        hero-letter
                        inline-block
                        text-[clamp(4rem,15vw,7rem)]
                        xs:text-[clamp(4.25rem,14.5vw,7.5rem)]
                        sm:text-[clamp(5rem,14vw,8.5rem)]
                        md:text-[clamp(7rem,15vw,11rem)]
                        lg:text-[clamp(8rem,14vw,13rem)]
                        xl:text-[16vw]
                        2xl:text-[15vw]
                        3xl:text-[14vw]
                        font-semibold
                        leading-[0.80]
                        tracking-[-0.09em]
                        text-[#F4A261]
                      `,
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
                      `
                        typing-letter
                        relative
                        mx-[0.01em]
                        inline-block
                        italic
                        text-[clamp(4rem,15vw,7rem)]
                        xs:text-[clamp(4.25rem,14.5vw,7.5rem)]
                        sm:text-[clamp(5rem,14vw,8.5rem)]
                        md:text-[clamp(7rem,15vw,11rem)]
                        lg:text-[clamp(8rem,14vw,13rem)]
                        xl:text-[16vw]
                        2xl:text-[15vw]
                        3xl:text-[14vw]
                        font-semibold
                        leading-[0.80]
                        tracking-[-0.09em]
                        text-white
                      `,
                      "drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]",
                      "drop-shadow-[0_0_24px_rgba(255,255,255,0.22)]",
                    ].join(" ")}
                  >
                    {letter.char}
                  </span>
                ),
              )}
            </div>

            {/* Mobile subtitle under main CALYPSO */}

            <div
              className="
                
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-1
                px-3
                text-center
                font-mono-ui
                text-[8px]
                uppercase
                leading-[2.4]
                tracking-[0.14em]
                text-white/75
                italic

                xs:text-[9px]
                sm:text-[10px]

                md:hidden
              "
              aria-label={`${subtitleLines[0]} ${subtitleLines[1]}`}
            >
              {subtitleLines.map((line, lineIndex) => (
                <div
                  key={`mobile-title-${line}`}
                  className="
                    flex
                    w-full
                    justify-center
                    text-center
                  "
                >
                  {line.split("").map((char, index) => (
                    <span
                      key={`mobile-title-${lineIndex}-${char}-${index}`}
                      className="
                        subtitle-char
                        whitespace-pre
                      "
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Supporting description. */}

            <div
              className="
                mt-6
                border-t
                border-white/15
                pt-4
                sm:mt-8
                md:mt-10
              "
            >
              <p
                className="
                  mx-auto
                  max-w-[280px]
                  text-center
                  text-sm
                  leading-relaxed
                  text-white/65
                  underline
                  sm:max-w-[320px]
                  md:mx-0
                  md:max-w-sm
                  md:text-left
                  lg:max-w-md
                  xl:max-w-lg
                "
              >
                We build identities, digital spaces and visual systems for
                brands that refuse to look ordinary.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            Full-height multilingual Unicode rain
            ========================================================= */}

        <div
          ref={devanagariRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            block
            overflow-hidden
            select-none
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
              right-0
              top-0
              flex
              h-full
              w-full
              justify-between
              gap-x-1
              px-2
              md:right-[-1%]
              md:w-[57%]
              md:gap-x-7
              md:px-1
            "
          >
            {languageColumns.map((column, index) => {
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
                    w-[20px]
                    overflow-hidden
                    opacity-35
                    md:w-[28px]
                  "
                >
                  <div
                    className={[
                      `
                        devanagari-track
                        absolute
                        left-1/2
                        flex
                        -translate-x-1/2
                        flex-col
                        items-center
                      `,
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
                            w-[20px]
                            select-none
                            text-center
                            font-serif
                            text-[10px]
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