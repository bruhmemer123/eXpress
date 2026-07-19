import React, { useState, useEffect, useRef } from 'react';

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const slides = [
    {
      tag: "What Are We?",
      title: "DJS eXpress",
      text: "The official public speaking committee of DJ Sanghvi College of Engineering where we organize public speaking and debating events. We have organised many successful events in the past like Illuminare and our flagship event, Aryavarta, which have been received with a lot of support and appreciation."
    },
    {
      tag: "Our Community & Mission",
      title: "Unlock Potential",
      text: "At DJS eXpress, we strive to unlock the potential of every student, ranging from public speaking skills to critical thinking to confident self-expression. We organize debates and discussions related to real-world problems and work on finding solutions collectively."
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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = height - windowHeight;
      const scrolled = -top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      
      const index = Math.min(Math.floor(progress * slides.length), slides.length - 1);
      setCurrentSlide(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <div className="bg-black text-white select-none">
      
      <div 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        // Added onTouchMove so the spotlight follows a user's thumb dragging on mobile!
        onTouchMove={(e) => {
          const touch = e.touches[0];
          setSpotlightPos({
            x: (touch.clientX / window.innerWidth) * 100,
            y: (touch.clientY / window.innerHeight) * 100
          });
        }}
        className="relative h-[500vh] w-full"
      >
        <div className="sticky top-0 left-0 w-full h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden px-6 md:px-20 lg:px-32">
          
          <div 
            className="absolute inset-0 opacity-40 transition-all duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle 350px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(155,135,245,0.15) 0%, transparent 100%)`
            }}
          />
          
          {/* THE MICROPHONE */}
          {/* Mobile: Absolute position, behind text, 15% opacity, slightly scaled down. 
              Desktop: Relative position, left side, 100% opacity. */}
          <div className="absolute inset-0 md:relative md:inset-auto w-full md:w-1/2 h-full flex items-end justify-center md:justify-start z-10 pointer-events-none opacity-15 md:opacity-100">
            
            <div 
              className="relative bottom-0 md:bottom-24 transform scale-75 md:scale-100 flex flex-col items-center transition-transform duration-[50ms] ease-out"
              style={{
                transform: `translate(${(spotlightPos.x - 50) * -0.4}px, ${(spotlightPos.y - 50) * -0.4}px)`
              }}
            >
              <div className="w-16 h-24 rounded-full border-2 border-express-purple bg-black/80 shadow-[0_0_30px_rgba(155,135,245,0.3)] flex flex-col justify-around py-2 overflow-hidden px-1">
                <div className="w-full h-[1px] bg-express-purple/50" />
                <div className="w-full h-[1px] bg-express-purple/50" />
                <div className="w-full h-[1px] bg-express-purple/50" />
              </div>
              <div className="w-4 h-6 bg-zinc-800 border-x border-express-purple/40" />
              <div className="w-1.5 h-96 bg-gradient-to-b from-zinc-700 to-zinc-950 shadow-[0_0_10px_rgba(155,135,245,0.1)]" />
            </div>
          </div>

          {/* THE TEXT ARENA */}
          {/* Mobile: Full width, z-20 to sit above the faded mic. */}
          <div className="relative w-full md:w-1/2 h-full flex items-center justify-center md:justify-start z-20">
            <div className="relative w-full max-w-xl h-[28rem] md:h-96 flex items-center">
              {slides.map((slide, index) => {
                const isCurrent = currentSlide === index;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-center text-center md:text-left transition-all duration-700 ease-out ${
                      isCurrent 
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                        : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
                    }`}
                  >
                    <span className="text-express-purple text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                      {slide.tag}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                      {slide.title}
                    </h2>
                    {/* Centered border and padding for mobile readability */}
                    <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed md:border-l-2 md:border-express-purple/30 md:pl-4 mx-auto md:mx-0 max-w-sm md:max-w-none">
                      {slide.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION DOTS */}
          {/* Mobile: Hidden or minimized so it doesn't crowd the text. Desktop: visible on right. */}
          <div className="hidden md:flex absolute right-12 top-1/2 transform -translate-y-1/2 flex-col gap-4 z-30">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-express-purple h-8 shadow-[0_0_10px_#9b87f5]' 
                    : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* CORE OBJECTIVES VALUE GRID */}
      {/* This grid naturally collapses into 1 column on mobile via Tailwind, so it's already perfect! */}
      <section className="py-20 md:py-32 border-t border-zinc-900 relative z-30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-express-purple font-mono tracking-widest text-xs md:text-sm uppercase">Our Pillars</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight mt-2 text-white">
              What Do We Do?
            </h2>
            <div className="w-16 h-1 bg-express-purple mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {pillars.map((pillar, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-black border border-zinc-900 hover:border-express-purple/40 transition-all duration-300 group hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-express-purple/10 border border-express-purple/20 flex items-center justify-center mb-6 group-hover:bg-express-purple/20 transition-colors">
                  <span className="text-express-purple font-mono font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-white tracking-wide group-hover:text-express-purple transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed flex-grow">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}