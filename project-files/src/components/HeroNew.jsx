import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroNew({ onExplore }) {
  const rootRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headlineRef.current, subRef.current, ctaRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative w-full text-center overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h1
          ref={headlineRef}
          className="font-serif-brew text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-tight text-white"
        >
          Timeline of our <em className="not-italic text-purple-light italic font-bold">Memories</em>
        </h1>

        <p
          ref={subRef}
          className="mt-4 text-lg text-text-dim max-w-2xl mx-auto"
        >
          A curated walk through moments, events and stories that shaped our community.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            ref={ctaRef}
            onClick={onExplore}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
          >
            Explore Events
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
