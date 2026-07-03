const SOCIALS = [
  { label: "Instagram", icon: "IG" },
  { label: "Medium", icon: "Md" },
  { label: "Archive", icon: "Ar" },
  { label: "YouTube", icon: "YT" },
  { label: "LinkedIn", icon: "in" },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-border-soft ">
      <div className="max-w-[1280px] mx-auto py-[26px] px-8 flex items-center justify-between flex-wrap gap-4 text-[0.85rem] text-text-dim max-[640px]:justify-center max-[640px]:text-center">
        <span>© {new Date().getFullYear()} DJS eXpress. All rights reserved.</span>

        <div className="flex gap-3.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="w-[34px] h-[34px] rounded-[10px] border border-border-soft flex items-center justify-center text-[0.68rem] font-bold text-purple-light transition-[background-color,transform] duration-[250ms] ease-in-out hover:bg-purple/15 hover:-translate-y-0.5"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <span>
          Made with <span className="text-purple-light">♥</span> by DJS eXpress
        </span>
      </div>
    </footer>
  );
}
