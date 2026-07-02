import { useEffect, useState } from "react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Previous Events", href: "/previous-events" },
  { label: "eXpresso", href: "/expresso" },
  { label: "Articles", href: "/articles" },
  { label: "Team", href: "/team" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[padding,background-color,backdrop-filter] duration-300 ease-in-out ${
        scrolled
          ? "py-3.5 bg-bg/72 backdrop-blur-[14px] border-b border-border-soft"
          : "py-[22px]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
        <a
          href="#"
          className="font-display font-bold text-xl tracking-[0.02em] text-text hover:scale-[1.02] transition-transform duration-[250ms] ease-in-out"
        >
          e<span className="text-purple-light">X</span>press
        </a>

        <nav className="hidden min-[881px]:flex gap-[30px]">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative text-[0.92rem] font-medium transition-colors duration-[250ms] ease-in-out after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:bg-gradient-to-r after:from-purple after:to-purple-light after:transition-[width] after:duration-[250ms] after:ease-in-out ${
                l.active
                  ? "text-purple-light after:w-full"
                  : "text-text-dim after:w-0 hover:text-text hover:after:w-full"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="min-[881px]:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`w-[22px] h-0.5 bg-text transition-transform duration-[250ms] ease-in-out ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`w-[22px] h-0.5 bg-text transition-opacity duration-[250ms] ease-in-out ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-[22px] h-0.5 bg-text transition-transform duration-[250ms] ease-in-out ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 px-8 pt-[18px] pb-[26px] bg-bg/96 border-b border-border-soft">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-text-dim text-[0.95rem] border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
