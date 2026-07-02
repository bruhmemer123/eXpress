import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Rss, Mail } from "lucide-react";

const ARTICLES = [
  {
    n: "002",
    title: "The lives almost lived",
    author: "Shruti Gadgil",
    date: "Jun 22",
    img: "https://miro.medium.com/v2/resize:fit:800/0*RkblLHrAHgHcm3pF.jpeg",
    url: "https://medium.com/@djsexpresso/the-lives-almost-lived-57582c1c24ac",
  },
  {
    n: "003",
    title: "The Curious Comfort of Nostalgia",
    author: "Swara Desai",
    date: "Jun 14",
    img: "https://miro.medium.com/v2/resize:fit:800/g:fp:0.5:0.12/0*vFwkcFRNWMpus69x.jpeg",
    url: "https://medium.com/@djsexpresso/the-curious-comfort-of-nostalgia-2f643ae68cd5",
  },
  {
    n: "004",
    title: "the grey ghost in the elephant room",
    author: "eXpress writers",
    date: "Jun 7",
    img: "https://miro.medium.com/v2/resize:fit:800/1*Ysyg8aftwG142G-2jopb2g.jpeg",
    url: "https://medium.com/@djsexpresso/the-grey-ghost-in-the-elephant-room-92d7fc8b2b29",
  },
  {
    n: "005",
    title: "Our minds must have soulmates too",
    author: "Trisha Nair",
    date: "May 31",
    img: "https://miro.medium.com/v2/resize:fit:800/1*YTk_rVw7W_Rg4H6BSywQSA.png",
    url: "https://medium.com/@djsexpresso/our-minds-must-have-soulmates-too-4e90f3b0f715",
  },
  {
    n: "006",
    title: "Humanity's Endless Search For Itself",
    author: "Aiden Fernandes",
    date: "May 24",
    img: "https://miro.medium.com/v2/resize:fit:800/0*icwT-52xVu5UJ55g.png",
    url: "https://medium.com/@djsexpresso/humanitys-endless-search-for-itself-c1577b277747",
  },
  {
    n: "007",
    title: "You won't be able to achieve success if you don't do this…",
    author: "Aaditya Jadhav",
    date: "May 17",
    img: "https://miro.medium.com/v2/resize:fit:800/1*C0rOrVQJAU5U21l5n1Jz3A.jpeg",
    url: "https://medium.com/@djsexpresso/you-wont-be-able-to-achieve-success-if-you-don-t-do-this-98bf276d5a8a",
  },
  {
    n: "008",
    title: "why do people keep on living",
    author: "Pranay Purohit",
    date: "May 10",
    img: "https://miro.medium.com/v2/resize:fit:800/1*x1-08aJCctFk-YtZjuY6Pg.jpeg",
    url: "https://medium.com/@djsexpresso/why-do-people-keep-on-living-2361d5920e6b",
  },
  {
    n: "009",
    title: 'A "Perfectly" Algorithmic World',
    author: "Avrojit Dutta",
    date: "May 3",
    img: "https://miro.medium.com/v2/resize:fit:800/1*tisyE4OmGOb4_e-VlE1_1Q.jpeg",
    url: "https://medium.com/@djsexpresso/a-perfectly-algorithmic-world-a355157994b2",
  },
];

const MediumIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SubstackIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 17.688 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TicketCard({ a }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded border border-violet-500/20 bg-black/60 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/20"
    >
      <div
        className="absolute -top-px left-0 right-0 h-2.5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12px 0, transparent 6px, black 6.5px)",
          backgroundSize: "24px 12px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div className="relative h-40 overflow-hidden">
        <img
          src={a.img}
          alt={a.title}
          loading="lazy"
          className="h-full w-full object-cover saturate-[.85] contrast-105 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between px-4 pt-3 font-mono text-[0.65rem] tracking-wider text-violet-300/60">
        <span>№ {a.n}</span>
        <span>{a.date}</span>
      </div>
      <div className="px-4 pb-5 pt-2">
        <h4 className="font-serif text-base font-semibold leading-snug text-violet-50">
          {a.title}
        </h4>
        <p className="mt-2 text-xs text-violet-300/80">
          brewed in-house by{" "}
          <span className="font-semibold text-violet-50">{a.author}</span>
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-dashed border-violet-500/20 pt-2.5">
          <span className="font-mono text-[0.6rem] tracking-wider text-violet-300/50">
            MEDIUM
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-fuchsia-300">
            Read
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans text-violet-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,500&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-serif-brew { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes rise {
          0% { transform: translateY(6px) scaleY(0.9); opacity: 0; }
          30% { opacity: 0.8; }
          100% { transform: translateY(-60px) scaleY(1.15); opacity: 0; }
        }
        .steam path { transform-origin: center bottom; animation: rise 3.4s ease-in-out infinite; }
        .steam path:nth-child(2) { animation-delay: 0.9s; }
        .steam path:nth-child(3) { animation-delay: 1.8s; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 26s linear infinite; }
      `}</style>

      {/* NAV */} 
      {/* <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-violet-500/20 bg-black/70 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="flex items-center gap-2.5 font-serif-brew text-xl font-bold">
          <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]" />
          DJS eXpress
        </div> 
        <div className="hidden items-center gap-9 text-sm text-violet-300/80 md:flex">
          <a href="#" className="hover:text-violet-50">Home</a>
          <a href="#" className="hover:text-violet-50">Events</a>
          <a href="#" className="hover:text-violet-50">Team</a>
          <a href="#" className="relative text-fuchsia-300">
            The Brew
            <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-fuchsia-300" />
          </a>
          <a href="#" className="hover:text-violet-50">Contact</a>
        </div>
        <div className="flex gap-2.5">
          <a
            href="https://medium.com/@djsexpresso"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-violet-500/25 px-3.5 py-2 text-xs transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <MediumIcon className="h-3.5 w-3.5" /> Medium
          </a>
          <a
            href="https://substack.com/@djsexpresso"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-violet-500/25 px-3.5 py-2 text-xs transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <SubstackIcon className="h-3.5 w-3.5" /> Substack
          </a>
        </div>
      </nav> */}

      {/* HERO */}
      <section className="relative grid grid-cols-1 items-center gap-10 border-b border-violet-500/20 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div>
          <div className="mb-5 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-fuchsia-300">
            <span className="h-px w-6 bg-fuchsia-300" />
            The Brew : Fresh every Sunday
          </div>
          <h1 className="font-serif-brew text-5xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
            Every essay,
            <br />
            <span className="italic font-medium text-fuchsia-300">brewed</span> in-house.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-violet-200/80">
            Every week, eXpress' journalism deaprtment pours their unfiltered thoughts into
            essays and publishes them across Medium and Substack. We are just a committee that thinks out loud.
            This is proof of what we've
            made, not what we've won.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <a
              href="https://medium.com/@djsexpresso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 px-6 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/50"
            >
              Read on Medium <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://substack.com/@djsexpresso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/25 px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/10"
            >
              Subscribe on Substack <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex min-h-[320px] items-center justify-center">
          <svg viewBox="0 0 320 340" className="h-[300px] w-[280px]">
            <defs>
              <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e879f9" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>
            <g className="steam">
              <path d="M120 90 C 110 70, 135 60, 125 40 C 118 25, 132 15, 128 2" stroke="#c4b5fd" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65" />
              <path d="M160 90 C 150 68, 175 58, 163 36 C 155 20, 170 10, 165 -2" stroke="#e879f9" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M200 90 C 190 70, 213 60, 202 40 C 195 25, 208 15, 204 2" stroke="#c4b5fd" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65" />
            </g>
            <ellipse cx="160" cy="300" rx="120" ry="14" fill="#1e1033" stroke="rgba(139,92,246,0.25)" />
            <path d="M70 120 L90 260 Q90 280 120 280 L200 280 Q230 280 230 260 L250 120 Z" fill="#2e1065" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
            <path d="M82 132 L96 250 Q98 262 118 262 L202 262 Q222 262 224 250 L238 132 Z" fill="url(#liquidGrad)" opacity="0.9" />
            <path d="M100 140 L110 240" stroke="rgba(245,240,255,0.25)" strokeWidth="1" fill="none" />
            <path d="M250 150 Q300 155 296 195 Q292 232 246 228" fill="none" stroke="#2e1065" strokeWidth="14" />
          </svg>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden whitespace-nowrap border-b border-violet-500/20 bg-violet-950/30 py-3">
        <div className="marquee-track inline-block">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="font-mono text-xs tracking-wide text-violet-300/50">
                <span className="px-7"><b className="font-semibold text-fuchsia-300">101</b> followers on Medium</span>
                <span className="px-7">9 essays brewed and counting</span>
                <span className="px-7">latest drop — <b className="font-semibold text-fuchsia-300">"end of time"</b> by Pranay Purohit</span>
                <span className="px-7">new blend every sunday</span>
              </span>
            ))}
        </div>
      </div>

      {/* FEATURED */}
      <section className="px-6 py-20 md:px-12">
        <Reveal>
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif-brew text-3xl font-semibold">Fresh off the press</h2>
            <span className="font-mono text-xs text-violet-300/50">FEATURED / 001</span>
          </div>
          <a
            href="https://medium.com/@djsexpresso/end-of-time-f7669e120def"
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-1 overflow-hidden rounded-2xl border border-violet-500/20 bg-violet-950/20 md:grid-cols-2"
          >
            <img
              src="https://miro.medium.com/v2/resize:fit:1200/1*zurR8uJjlhKA3pCSSZHuHw.jpeg"
              alt="end of time cover"
              className="h-64 w-full object-cover saturate-[.85] md:h-full"
            />
            <div className="flex flex-col justify-center gap-4 p-9 md:p-11">
              <span className="w-fit rounded-full bg-fuchsia-300 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-black">
                Latest · 2d ago
              </span>
              <h3 className="font-serif-brew text-2xl font-semibold leading-tight md:text-3xl">
                end of time
              </h3>
              <p className="text-sm text-violet-200/80">
                brewed in-house by <span className="font-semibold text-violet-50">Pranay Purohit</span>
              </p>
              <span className="group mt-1 inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-300">
                Read the full essay on Medium
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* GRID */}
      <section className="px-6 pb-20 md:px-12">
        <Reveal>
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif-brew text-3xl font-semibold">The archive</h2>
            <span className="font-mono text-xs text-violet-300/50">002 – 009</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <TicketCard key={a.n} a={a} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* PLATFORMS */}
      <section className="px-6 pb-20 md:px-12">
        <Reveal>
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif-brew text-3xl font-semibold">Two platforms, one voice</h2>
            <span className="font-mono text-xs text-violet-300/50">WHERE WE PUBLISH</span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-black p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10">
                <MediumIcon className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="font-serif-brew text-2xl font-semibold">eXpresso on Medium</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-violet-200/80">
                This is our main essay feed with a reflective, personal and occasionally
                unfiltered style.   This is where new
                work drops first.
              </p>
              <div className="mt-6 font-mono text-xs text-violet-300/50">
                @djsexpresso · <b className="text-fuchsia-300">101</b> followers
              </div>
              <a
                href="https://medium.com/@djsexpresso"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-500/25 px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/10"
              >
                Follow on Medium <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-black p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10">
                <SubstackIcon className="h-6 w-6 text-fuchsia-300" />
              </div>
              <h3 className="font-serif-brew text-2xl font-semibold">eXpresso on Substack</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-violet-200/80">
                Home to our newletter, the same essays, straight to your
                inbox, plus longer-form and serialized ideas as the
                publication grows.
              </p>
              <div className="mt-6 flex items-center gap-1.5 font-mono text-xs text-violet-300/50">
                <Mail className="h-3.5 w-3.5" /> delivered by email
              </div>
              <a
                href="https://substack.com/@djsexpresso"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-500/25 px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/10"
              >
                Subscribe on Substack <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA STRIP */}
      <section className="px-6 pb-20 md:px-12">
        <Reveal>
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-400/10 px-8 py-16 text-center">
            <h2 className="font-serif-brew text-3xl font-semibold md:text-4xl">
              Check us out on Linkedin also!
            </h2>
            <p className="mx-auto mt-3 max-w-md text-violet-200/80">
              Our editorial department puts out insightful posts frequently.
               Do give it a read!
            </p>
            <a
              href="https://www.linkedin.com/company/djscexpress/posts/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-400 px-6 py-3.5 text-sm font-semibold text-black transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/50"
            >
              Follow us for great insights! <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      {/* <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-violet-500/20 px-6 py-8 text-xs text-violet-300/50 md:px-12">
        <div>© eXpress · DJSCE's official Public Speaking &amp; Debating Committee</div>
        <div className="flex items-center gap-3">
          <a href="https://medium.com/@djsexpresso" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-fuchsia-300">
            <Rss className="h-3.5 w-3.5" /> Medium
          </a>
          ·
          <a href="https://substack.com/@djsexpresso" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-300">Substack</a>
          ·
          <a href="https://www.djsexpress.com/" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-300">djsexpress.com</a>
        </div>
      </footer> */}
    </div>
  );
}
