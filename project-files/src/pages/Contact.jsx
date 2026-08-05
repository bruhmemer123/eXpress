import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, User } from "lucide-react";

/* ─── Scroll-reveal (identical to Articles) ─── */
function Reveal({ children, className = "", delay = 0 }) {
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
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Glassmorphism info card (matches TicketCard shell) ─── */
function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`relative rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-black overflow-hidden ${hover
          ? "transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/20"
          : ""
        } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Icon badge (same as Articles platform icon) ─── */
function IconBadge({ icon: Icon }) {
  return (
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10">
      <Icon className="h-5 w-5 text-fuchsia-300" />
    </div>
  );
}

/* ─── Team member card ─── */
function TeamCard({ role, name, phone, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <GlassCard className="p-6">
        <IconBadge icon={User} />
        <div className="font-mono text-[0.65rem] tracking-wider text-fuchsia-300/70 uppercase mb-1">
          {role}
        </div>
        <h4 className="font-serif-brew text-lg font-semibold text-violet-50 leading-snug">
          {name}
        </h4>
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="mt-3 flex items-center gap-2 text-xs text-violet-300/80 hover:text-fuchsia-300 transition-colors duration-200"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {phone}
        </a>
      </GlassCard>
    </Reveal>
  );
}

/* ─── Main page ─── */
export default function Contact() {
  return (
    <div className="min-h-screen bg-black font-sans text-violet-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,500&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-serif-brew { font-family: 'Fraunces', serif; }
        .font-sans       { font-family: 'Space Grotesk', sans-serif; }
        .font-mono       { font-family: 'JetBrains Mono', monospace; }
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        .orb { animation: float-orb 14s ease-in-out infinite; }
        .orb-2 { animation: float-orb 18s ease-in-out infinite reverse; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 26s linear infinite; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative border-b border-violet-500/20 px-6 py-24 text-center md:px-12 md:py-32 overflow-hidden">
        {/* background ambient orbs — same purple palette */}
        <div
          className="orb pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        />
        <div
          className="orb-2 pointer-events-none absolute right-1/4 bottom-0 h-56 w-56 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 70%)" }}
        />

        <Reveal>
          <div className="mb-5 flex items-center justify-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-fuchsia-300">
            <span className="h-px w-6 bg-fuchsia-300" />
            Get in Touch
            <span className="h-px w-6 bg-fuchsia-300" />
          </div>
          <h1 className="font-serif-brew text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
            Contact{" "}
            <span className="italic font-medium text-fuchsia-300">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-violet-200/80">
            Connect with the eXpress team for public speaking workshops, debate
            competitions, and all your communication skill development needs.
          </p>
        </Reveal>
      </section>

      {/* ── TICKER — identical implementation to Articles ────── */}
      <div className="overflow-hidden whitespace-nowrap border-b border-violet-500/20 bg-violet-950/30 py-3">
        <div className="marquee-track inline-block">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="font-mono text-xs tracking-wide text-violet-300/50">
                <span className="px-7">DJ Sanghvi College of Engineering · Vile Parle (W), Mumbai</span>
                <span className="px-7">•</span>
                <span className="px-7"><b className="font-semibold text-fuchsia-300">eXpress</b></span>
                <span className="px-7">•</span>
                <span className="px-7">DJSCE's Official Public Speaking &amp; Debating Committee</span>
                <span className="px-7">•</span>
                <span className="px-7">djsce.express@gmail.com</span>
                <span className="px-7">•</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── 3-COLUMN LAYOUT ──────────────────────────────────── */}
      <section className="px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-8">

            {/* Visit Us */}
            <Reveal>
              <div className="mb-7 flex items-end justify-between">
                <h2 className="font-serif-brew text-3xl font-semibold">Visit Us</h2>
                <span className="font-mono text-xs text-violet-300/50">LOCATION</span>
              </div>
              <GlassCard className="p-8">
                <IconBadge icon={MapPin} />
                <h3 className="font-serif-brew text-xl font-semibold text-violet-50 mb-3">
                  DJ Sanghvi College of Engineering
                </h3>
                <address className="not-italic text-sm leading-7 text-violet-200/80">
                  Plot No. U-15, Juhu Versova Link Road
                  <br />
                  Vile Parle (West)
                  <br />
                  Mumbai – 400056
                  <br />
                  Maharashtra, India
                </address>
              </GlassCard>
            </Reveal>

            {/* Quick Contact */}
            <Reveal delay={100}>
              <GlassCard className="p-8">
                <IconBadge icon={Mail} />
                <h3 className="font-serif-brew text-xl font-semibold text-violet-50 mb-3">
                  Quick Contact
                </h3>
                <div className="border-t border-dashed border-violet-500/20 pt-4">
                  <p className="font-mono text-[0.65rem] tracking-wider text-violet-300/50 uppercase mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:djsce.express@gmail.com"
                    className="text-sm font-semibold text-fuchsia-300 hover:text-fuchsia-200 transition-colors duration-200 break-all"
                  >
                    djsce.express@gmail.com
                  </a>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* ── MIDDLE COLUMN — Our Team ── */}
          <div>
            <Reveal>
              <div className="mb-7 flex items-end justify-between">
                <h2 className="font-serif-brew text-3xl font-semibold">Our Team</h2>
                <span className="font-mono text-xs text-violet-300/50">LEADERSHIP</span>
              </div>
            </Reveal>
            <div className="flex flex-col gap-5">
              <TeamCard
                role="Chairperson"
                name="Dhruv Thakur"
                phone="+91 90763 17135"
                delay={0}
              />
              <TeamCard
                role="Vice Chairperson"
                name="Sakshi Gandhi"
                phone="+91 86550 75744"
                delay={100}
              />
              <TeamCard
                role="Vice Chairperson"
                name="Vidit Thakkar"
                phone="+91 89764 61392"
                delay={200}
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN — Map ── */}
          <div>
            <Reveal>
              <div className="mb-7 flex items-end justify-between">
                <h2 className="font-serif-brew text-3xl font-semibold">Find Us</h2>
                <span className="font-mono text-xs text-violet-300/50">MAP</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <GlassCard hover={false} className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20">
                <div className="relative w-full" style={{ paddingBottom: "90%" }}>
                  <iframe
                    title="DJ Sanghvi College of Engineering on Google Maps"
                    src="https://maps.google.com/maps?ll=19.1058,72.8261&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&output=embed"
                    className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href="https://www.google.com/maps/place/SVKM's+Dwarkadas+J.+Sanghvi+College+of+Engineering/@19.1072583,72.8345328,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c9c676018b43:0x75f29a4205098f99!8m2!3d19.1072583!4d72.8371131!16zL20vMGdtbWs0?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 cursor-pointer"
                    aria-label="Open location in Google Maps"
                  />
                </div>
                <div className="px-6 py-4 border-t border-dashed border-violet-500/20 flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] tracking-wider text-violet-300/50 uppercase">
                    DJ Sanghvi, Vile Parle (W)
                  </span>
                  <a
                    href="https://www.google.com/maps/place/SVKM's+Dwarkadas+J.+Sanghvi+College+of+Engineering/@19.1072583,72.8345328,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c9c676018b43:0x75f29a4205098f99!8m2!3d19.1072583!4d72.8371131!16zL20vMGdtbWs0?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-fuchsia-300 hover:text-fuchsia-200 transition-colors duration-200"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}