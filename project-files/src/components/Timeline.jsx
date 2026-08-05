import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventRow from "./EventRow";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ events }) {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const listRef = useRef(null);
  const progressFillRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 25%",
            end: "bottom 80%",
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        progressFillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative z-[1] max-w-[1180px] mx-auto px-8 pt-[130px] pb-15"
      id="timeline"
      ref={sectionRef}
    >
      <div className="min-[861px]:hidden fixed left-0 right-0 bottom-0 z-50 pointer-events-none px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden border border-white/10 backdrop-blur-sm shadow-[0_0_24px_rgba(0,0,0,0.35)]">
          <div
            className="h-full w-full origin-left bg-[linear-gradient(90deg,#6d28d9,#8b5cf6,#c4b5fd)]"
            ref={progressFillRef}
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <div className="max-w-[720px] mx-auto mb-[60px] text-center">
        <span className="inline-block text-xs font-mono font-semibold tracking-[0.2em] uppercase text-purple-light py-[7px] px-4 mt-10 border border-border-soft rounded-full mb-5">
          Previous Events
        </span>
        <h2 className="font-serif-brew font-extrabold text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.15] mt-0 mb-[18px] text-text">
          A trail of stages we've <span className="text-purple-light">lit up</span>
        </h2>
        <p className="font-sans text-text-dim text-[1.05rem] leading-[1.7] m-0">
          Thirteen editions, a dozen different formats — from ancient dynasties to
          courtroom drama to a balloon that just won't stop sinking. Scroll
          through everything DJSCE eXpress has brought to campus so far.
        </p>
      </div>

      <div className="relative" ref={listRef}>
        <div className="hidden min-[861px]:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border-soft z-0">
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#6d28d9,#8b5cf6)] origin-top scale-y-0"
            ref={lineRef}
          />
        </div>

        {events.map((event, i) => (
          <EventRow
            key={event.id}
            event={event}
            index={i}
            reversed={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
