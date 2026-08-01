import React, { useState, useEffect, useRef } from 'react';

// --- Reusable Reveal Animation (from Theme) ---
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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const micContainerRef = useRef(null);
  
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Physics state exclusively for the microphone
  const [isDragging, setIsDragging] = useState(false);
  const [micPos, setMicPos] = useState({ x: 50, y: 40 }); 
  const dragStart = useRef({ mouseX: 0, mouseY: 0, startMicX: 50, startMicY: 40 });

  const slides = [
    {
      tag: "What Are We?",
      title: "DJSCE eXpress",
      text: "The official public speaking committee of DJ Sanghvi College of Engineering where we organize public speaking and debating events. We have organised many successful events in the past like Illuminare and our flagship event, Aryavarta, which have been received with a lot of support and appreciation."
    },
    {
      tag: "Our Community & Mission",
      title: "Unlock Potential",
      text: "At DJSCE eXpress, we strive to unlock the potential of every student, ranging from public speaking skills to critical thinking to confident self-expression. We organize debates and discussions related to real-world problems and work on finding solutions collectively."
    },
    {
      tag: "Why Choose Us?",
      title: "Unmatched Reach",
      text: "With the largest audiences and highest participant registrations in the city, we have built a reputation for exceptional publicity and unique event concepts. Our committee consists of the brightest minds, ensuring a platform where only the most thought-provoking discussions thrive."
    }
  ];

  const pillars = [
    { title: "Enhancing Public Speaking Skills", desc: "We help students discover and refine their inner speaker." },
    { title: "Shaping Responsible Global Citizens", desc: "Our activities prepare students to think critically and act responsibly on global issues." },
    { title: "Organizing Meaningful Debates", desc: "We host debates that tackle real-world issues and resolutions." },
    { title: "Encouraging Innovation & Idea Sharing", desc: "Our community fosters creativity and new perspectives through discussions." },
    { title: "Preparing for a Fast-Paced World", desc: "We equip students with the confidence and skills to succeed in today's dynamic environment." },
    { title: "Building a Supportive Community", desc: "We create a strong network of like-minded individuals who support and inspire each other." }
  ];

  // MAGNETIC SNAP OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) setCurrentSlide(index);
        }
      });
    }, {
      root: containerRef.current,
      threshold: 0.5 
    });

    const tracks = document.querySelectorAll('.track-slide');
    tracks.forEach((track) => observer.observe(track));

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setSpotlightPos({ x, y });
  };

  // --- INTERACTIVE ROPE PHYSICS LOGIC ---
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { 
      mouseX: e.clientX, 
      mouseY: e.clientY,
      startMicX: micPos.x,
      startMicY: micPos.y
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !micContainerRef.current) return;
    
    const rect = micContainerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.current.mouseX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.current.mouseY) / rect.height) * 100;
    
    setMicPos({
      x: Math.max(5, Math.min(95, dragStart.current.startMicX + deltaX)),
      y: Math.max(5, Math.min(85, dragStart.current.startMicY + deltaY))
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    setMicPos({ x: 50, y: 40 }); 
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const yDiff = micPos.y - 40; 
  const xDiff = micPos.x - 50;
  const isSlack = yDiff < 0; 
  const sag = Math.abs(xDiff) * 0.15; 
  const cpX = 50 + (xDiff * 0.3) + (isSlack ? (xDiff * 1.5) : 0);
  const cpY = (micPos.y * 0.4) + sag + (isSlack ? Math.abs(yDiff) * 1.2 : 0);

  const springTransition = isDragging ? 'none' : 'all 1.2s cubic-bezier(0.4, 2.8, 0.3, 0.8)';

  return (
    <div 
      ref={containerRef}
      className="bg-black font-sans text-violet-50 select-none h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      onMouseMove={handleMouseMove}
    >
      {/* THEME STYLES INJECTED */}
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
      
      {/* SECTION 1: THE STICKY ARENA */}
      <div className="relative w-full h-[300vh]">
        
        <div className="sticky top-0 left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden px-6 md:px-12 z-10 border-b border-violet-500/20">
          
          <div 
            className="absolute inset-0 opacity-40 transition-all duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle 350px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(139,92,246,0.15) 0%, transparent 100%)`
            }}
          />
          
          {/* THE HANGING INTERACTIVE MICROPHONE */}
          <div 
            ref={micContainerRef}
            className="absolute inset-0 md:relative md:inset-auto w-full md:w-1/2 h-full z-20 overflow-visible"
          >
            
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
              <path d="M 0 0 L 100 100" fill="none" stroke="none" />
              <path 
                d={`M 50 0 Q ${cpX} ${cpY} ${micPos.x} ${micPos.y}`}
                stroke="#52525b" 
                strokeWidth="16" // Wire heavily thickened
                vectorEffect="non-scaling-stroke" 
                fill="none" 
                strokeLinecap="round"
                style={{ transition: springTransition }}
              />
            </svg>

            {/* Draggable Steely Chrome Mic Capsule */}
            <div 
              className={`absolute flex flex-col items-center pointer-events-auto group ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                left: `${micPos.x}%`,
                top: `${micPos.y}%`,
                transform: `translate(-50%, -2px) rotate(${(micPos.x - 50) * 0.8}deg)`,
                transformOrigin: 'top center',
                transition: springTransition
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Steely Wire Mount / Cap (U-bracket completely removed, replaced with sleek XLR block) */}
              <div className="w-10 h-16 bg-gradient-to-b from-zinc-600 to-zinc-900 border-x-2 border-zinc-500 rounded-b-lg z-20 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex flex-col justify-end items-center relative">
                 <div className="absolute top-0 w-5 h-full bg-zinc-950/40" />
                 {/* Mount Attachment Ring */}
                 <div className="w-14 h-4 bg-zinc-700 rounded-full border border-zinc-500 shadow-md -mb-2 z-30" />
              </div>
              
              {/* Main Chrome Mic Capsule (Massively scaled up) */}
              <div className="w-32 h-64 bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-500 rounded-full border-[4px] border-zinc-400 shadow-[inset_-6px_-6px_20px_rgba(0,0,0,0.3),_0_24px_60px_rgba(0,0,0,0.8)] flex flex-col items-center p-2.5 z-10 overflow-hidden group-hover:border-zinc-300 group-hover:shadow-[0_24px_60px_rgba(217,70,239,0.2)] transition-all duration-300">
                
                <div className="w-full h-1/2 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-t-full shadow-inner relative overflow-hidden border-b-[5px] border-zinc-700">
                   {/* Thicker Mesh Pattern */}
                   <div className="absolute inset-0 opacity-60 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#18181b_4px,#18181b_8px)]" />
                   <div className="absolute inset-0 opacity-60 bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,#18181b_4px,#18181b_8px)]" />
                   <div className="absolute top-2 left-3 w-6 h-20 bg-white/20 blur-md rounded-full transform -rotate-12" />
                </div>
                
                <div className="w-full h-1/2 flex flex-col items-center justify-center relative">
                   <div className="absolute w-full h-[3px] bg-zinc-600 top-5 shadow-sm" />
                   <div className="absolute w-full h-[3px] bg-zinc-600 top-10 shadow-sm" />
                   
                   {/* LED Button */}
                   <div className={`w-5 h-5 rounded-full mt-10 border border-zinc-800 transition-all duration-300 ${
                     isDragging 
                       ? 'bg-fuchsia-400 shadow-[0_0_25px_#d946ef] animate-pulse' 
                       : 'bg-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
                   }`} />
                </div>
              </div>
            </div>
            
          </div>

          {/* THE TEXT ARENA */}
          <div className="relative w-full md:w-1/2 h-full flex items-center justify-center md:justify-start z-10 pointer-events-none mt-40 md:mt-0">
            <div className="relative w-full max-w-xl h-[28rem] md:h-96 flex items-center pl-0 md:pl-12">
              {slides.map((slide, index) => {
                const isCurrent = currentSlide === index;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-center text-center md:text-left transition-all duration-700 ease-out ${
                      isCurrent 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-12 scale-95'
                    }`}
                  >
                    <div className="mb-5 flex items-center justify-center md:justify-start gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-fuchsia-300">
                      <span className="h-px w-6 bg-fuchsia-300" />
                      {slide.tag}
                    </div>
                    <h2 className="font-serif-brew text-5xl md:text-6xl font-semibold leading-[0.98] tracking-tight mb-6">
                      {slide.title}
                    </h2>
                    <p className="text-violet-200/80 text-base md:text-lg leading-relaxed max-w-sm md:max-w-none mx-auto md:mx-0">
                      {slide.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION DOTS */}
          <div className="hidden md:flex absolute right-12 top-1/2 transform -translate-y-1/2 flex-col gap-4 z-30 pointer-events-none">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-fuchsia-300 h-8 shadow-[0_0_10px_#d946ef]' 
                    : 'bg-violet-900/50'
                }`}
              />
            ))}
          </div>

        </div>

        {/* INVISIBLE MAGNETIC SNAP TRACKS */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none z-0">
          {slides.map((_, index) => (
            <div 
              key={index} 
              data-index={index}
              className="track-slide w-full h-screen snap-center" 
            />
          ))}
        </div>

      </div>

      {/* SECTION 2: TICKER & CORE OBJECTIVES */}
      <section className="snap-start min-h-screen bg-black relative z-30 flex flex-col overflow-hidden">
        
        <div
          className="orb pointer-events-none absolute left-[-10%] top-20 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        />
        <div
          className="orb-2 pointer-events-none absolute right-[-10%] bottom-20 h-72 w-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 70%)" }}
        />

        <div className="overflow-hidden whitespace-nowrap border-b border-violet-500/20 bg-violet-950/30 py-3 relative z-10">
          <div className="marquee-track inline-block">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="font-mono text-xs tracking-wide text-violet-300/50">
                  <span className="px-7">Public Speaking & Debating</span>
                  <span className="px-7">•</span>
                  <span className="px-7"><b className="font-semibold text-fuchsia-300">Aryavarta</b> & <b className="font-semibold text-fuchsia-300">Illuminare</b></span>
                  <span className="px-7">•</span>
                  <span className="px-7">DJSCE's Official Committee</span>
                  <span className="px-7">•</span>
                  <span className="px-7">Building future leaders</span>
                  <span className="px-7">•</span>
                </span>
              ))}
          </div>
        </div>

        <div className="container mx-auto px-6 py-20 md:px-12 md:py-24 relative z-10 flex-grow flex flex-col justify-center">
          <Reveal>
            <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif-brew text-4xl md:text-5xl font-semibold">What Do We Do?</h2>
              <span className="font-mono text-xs text-violet-300/50">OUR PILLARS</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="group relative block h-full rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-black p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/20">
                  
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
                    <span className="font-mono text-sm font-bold text-fuchsia-300">{index + 1}</span>
                  </div>
                  
                  <h3 className="font-serif-brew text-xl font-semibold text-violet-50 mb-3">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-violet-200/80">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}