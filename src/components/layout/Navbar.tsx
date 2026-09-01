import { useState } from "react";
import { navItems } from "../../data/content";
import { useScrollObserver, useScrollTo } from "../../hooks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use custom hooks for scroll logic
  const active = useScrollObserver(navItems.map(item => item.id));
  const { scrollTo } = useScrollTo();

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollTo(id);
  };

  return (
    <>
      {/* =========================================================
          DESKTOP NAV
          Hidden below lg
      ========================================================== */}
      <nav
        className="group fixed right-0 top-1/2 z-[999] hidden -translate-y-1/2 lg:block"
        aria-label="Primary"
      >
        <div
          className="
            relative
            w-16
            overflow-hidden
            rounded-l-3xl
            border
            border-r-0
            border-white/10
            bg-black/[0.24]
            backdrop-blur-xl
            shadow-[-12px_0_45px_rgba(255,255,255,0.10)]
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:w-[400px]
          "
        >
          {/* Collapsed tab */}
          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-1/2
              z-20
              flex
              -translate-y-1/2
              flex-col
              items-center
              gap-3
              opacity-100
              transition-all
              duration-500
              group-hover:translate-x-10
              group-hover:opacity-0
            "
          >
            <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.75)]" />

            <span className="h-8 w-px bg-white/30" />

            <span
              className="
                mr-3
                font-mono-ui
                text-[18px]
                font-medium
                uppercase
                tracking-[0.98em]
                text-white
                drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]
                [writing-mode:vertical-rl]
              "
            >
              CALYPSO MENU
            </span>
          </div>

          {/* Expanded content */}
          <div
            className="
              flex
              min-h-[620px]
              w-[400px]
              translate-x-8
              flex-col
              justify-center
              px-10
              py-10
              opacity-0
              transition-all
              duration-500
              ease-out
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            <div className="flex flex-col gap-10">
              {navItems.map((item, index) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    data-cursor="interactive"
                    className={`
                      group/link
                      relative
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      px-5
                      py-4
                      text-left
                      font-mono-ui
                      text-base
                      uppercase
                      tracking-[0.24em]
                      transition-all
                      duration-300
                      hover:bg-[#F4A261]/[0.10]
                      md:text-lg
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/40 hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-2
                        w-2
                        shrink-0
                        rounded-full
                        bg-white
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "scale-100 opacity-100 shadow-[0_0_14px_rgba(255,255,255,0.65)]"
                            : "scale-50 opacity-0 group-hover/link:scale-100 group-hover/link:opacity-60"
                        }
                      `}
                    />

                    <span className="relative">
                      {item.label}
                    </span>

                    <span
                      className="
                        pointer-events-none
                        absolute
                        -inset-x-4
                        -inset-y-2
                        -z-10
                        rounded-2xl
                        bg-white/[0.08]
                        opacity-0
                        blur-2xl
                        transition-opacity
                        duration-500
                        group-hover/link:opacity-100
                      "
                    />

                    <span className="ml-auto text-[9px] tracking-[0.15em] text-white/20">
                      0{index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================================
          TABLET + MOBILE NAV
          Visible below lg
      ========================================================== */}
      <div className="lg:hidden">
        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="
            fixed
            right-4
            top-4
            z-[1001]
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/[0.35]
            backdrop-blur-xl
            shadow-[-8px_8px_35px_rgba(255,255,255,0.08)]
            transition-all
            duration-500
            hover:bg-white/[0.08]
            md:right-6
            md:top-6
            md:h-16
            md:w-16
          "
        >
          <div className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`
                h-px
                w-full
                bg-white
                transition-all
                duration-500
                ${
                  isOpen
                    ? "translate-y-[9px] rotate-45"
                    : "translate-y-0 rotate-0"
                }
              `}
            />

            <span
              className={`
                h-px
                w-full
                bg-white
                transition-all
                duration-300
                ${
                  isOpen
                    ? "scale-x-0 opacity-0"
                    : "scale-x-100 opacity-100"
                }
              `}
            />

            <span
              className={`
                h-px
                w-full
                bg-white
                transition-all
                duration-500
                ${
                  isOpen
                    ? "-translate-y-[9px] -rotate-45"
                    : "translate-y-0 rotate-0"
                }
              `}
            />
          </div>
        </button>

        {/* Backdrop */}
        <div
          className={`
            fixed
            inset-0
            z-[999]
            bg-black/50
            backdrop-blur-sm
            transition-all
            duration-500
            ${
              isOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile / Tablet menu */}
        <nav
          className={`
            fixed
            right-0
            top-0
            z-[1000]
            flex
            h-dvh
            w-[min(88vw,420px)]
            flex-col
            justify-center
            overflow-hidden
            border-l
            border-white/10
            bg-black/[0.82]
            px-6
            backdrop-blur-2xl
            shadow-[-20px_0_60px_rgba(255,255,255,0.08)]
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
            md:w-[min(72vw,500px)]
            md:px-10
            ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-full opacity-0"
            }
          `}
        >
          {/* Menu heading */}
          <div
            className={`
              absolute
              left-6
              top-8
              font-mono-ui
              text-[11px]
              uppercase
              tracking-[0.4em]
              text-white/40
              transition-all
              duration-700
              md:left-10
            `}
          >
            CALYPSO MENU
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-4 md:gap-6">
            {navItems.map((item, index) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  data-cursor="interactive"
                  className={`
                    group/mobile-link
                    relative
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    px-4
                    py-4
                    text-left
                    font-mono-ui
                    text-base
                    uppercase
                    tracking-[0.2em]
                    transition-all
                    duration-300
                    sm:text-lg
                    md:px-5
                    md:py-5
                    md:text-xl
                    ${
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white"
                    }
                  `}
                >
                  {/* Active dot */}
                  <span
                    className={`
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      bg-white
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "scale-100 opacity-100 shadow-[0_0_14px_rgba(255,255,255,0.65)]"
                          : "scale-50 opacity-0 group-hover/mobile-link:scale-100 group-hover/mobile-link:opacity-60"
                      }
                    `}
                  />

                  {/* Label */}
                  <span>{item.label}</span>

                  {/* Hover glow */}
                  <span
                    className="
                      pointer-events-none
                      absolute
                      -inset-x-3
                      -inset-y-2
                      -z-10
                      rounded-2xl
                      bg-white/[0.08]
                      opacity-0
                      blur-2xl
                      transition-opacity
                      duration-500
                      group-hover/mobile-link:opacity-100
                    "
                  />

                  {/* Index */}
                  <span className="ml-auto text-[9px] tracking-[0.15em] text-white/20">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom label */}
          <div
            className="
              absolute
              bottom-8
              left-6
              font-mono-ui
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white/20
              md:left-10
            "
          >
            INDIA — WORLDWIDE
          </div>
        </nav>
      </div>
    </>
  );
}