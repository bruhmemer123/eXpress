import React from "react";
import Hero from "../components/HeroNew";
import Timeline from "../components/Timeline";
import events from "../data/events";

const scrollToEvents = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

const Previous_Events = () => {
  return (
    <div className="min-h-screen bg-black font-sans text-violet-50">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,500&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap'); .font-serif-brew { font-family: 'Fraunces', serif; } .font-sans { font-family: 'Space Grotesk', sans-serif; } .font-mono { font-family: 'JetBrains Mono', monospace; }`}</style>
      <Hero onExplore={scrollToEvents} />
      <Timeline events={events} />
    </div>
  );
};

export default Previous_Events