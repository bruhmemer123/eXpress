import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventRow({ event, index, reversed }) {
  const rootRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const numberRef = useRef(null);
  const dotRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          end: "top 35%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        numberRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      )
        .fromTo(
          imgWrapRef.current,
          { opacity: 0, x: reversed ? 60 : -60, scale: 0.94 },
          { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: "power3.out" },
          "-=0.25"
        )
        .fromTo(
          imgRef.current,
          { scale: 1.22 },
          { scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.75"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.65"
        )
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );

      // timeline dot lights up as the row engages
      gsap.fromTo(
        dotRef.current,
        { boxShadow: "0 0 0 0 rgba(139,92,246,0)" },
        {
          boxShadow: "0 0 0 6px rgba(139,92,246,0.18)",
          backgroundColor: "#8b5cf6",
          duration: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reversed]);

  return (
    <div
      className={`relative grid items-center gap-[150px] py-[70px] max-[860px]:grid-cols-1 max-[860px]:gap-[26px] max-[860px]:py-10 ${
        reversed
          ? "grid-cols-[minmax(0,1fr)_minmax(0,460px)]"
          : "grid-cols-[minmax(0,460px)_minmax(0,1fr)]"
      }`}
      ref={rootRef}
      id={event.id}
    >
      {/* kept in the DOM to match the original markup; hidden to match the
          original site's (unused) timeline-dot styling */}
      <div
        className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#2a2333] z-[10]"
        ref={dotRef}
      />

      <div
        className={`relative group ${reversed ? "min-[861px]:order-2" : ""}`}
        ref={imgWrapRef}
      >
        <div className="relative rounded-[18px] overflow-hidden border border-border-soft shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.08)] aspect-[4/3] max-[860px]:aspect-[16/10] bg-bg-soft after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_55%,rgba(6,5,9,0.55)_100%)] after:pointer-events-none">
          <img
            ref={imgRef}
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-[600ms] ease-in-out group-hover:scale-[1.06]"
          />
        </div>
        <span
          className={`absolute -top-3.5 w-[46px] h-[46px] rounded-full bg-bg border border-border-soft flex items-center justify-center font-display font-bold text-[0.85rem] text-purple-light z-[2] ${
            reversed
              ? "-right-3.5 left-auto max-[860px]:-left-2.5 max-[860px]:right-auto"
              : "-left-3.5"
          }`}
          ref={numberRef}
        >
          {event.number}
        </span>
      </div>

      <div
        className={`flex flex-col gap-3.5 ${reversed ? "min-[861px]:order-1" : ""}`}
      >
        {event.tag && (
          <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-purple-light opacity-85">
            {event.tag}
          </span>
        )}
        <h3
          className="font-display font-bold text-[clamp(1.7rem,3vw,2.5rem)] m-0 bg-[linear-gradient(135deg,#d8c9ff,#6d28d9)] bg-clip-text text-transparent"
          ref={titleRef}
        >
          {event.title}
        </h3>
        <p className="m-0 text-text-dim text-base leading-[1.75] max-w-[50ch]" ref={bodyRef}>
          {event.description}
        </p>
      </div>
    </div>
  );
}
