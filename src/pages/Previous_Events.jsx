import React from "react";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import events from "../data/events";

const scrollToEvents = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

const Previous_Events = () => {
  return (
    <div>
      <Hero onExplore={scrollToEvents} />
      <Timeline events = {events} />
    </div>
  )
}

export default Previous_Events