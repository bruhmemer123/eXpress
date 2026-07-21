import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onExplore }) {
  const rootRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage3Ref = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // background: slow zoom the whole way through
      tl.fromTo(bgRef.current, { scale: 1.1 }, { scale: 0, ease: "none", duration: 2 }, 0);

      // Stage 1 -> out
      tl.fromTo(
        stage1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0
      );
      tl.to(stage1Ref.current, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, 0.7);

      // Stage 2 -> big tracking word, in then out
      tl.fromTo(
        stage2Ref.current,
        { opacity: 0, letterSpacing: "0.35em" },
        { opacity: 1, letterSpacing: "0.02em", duration: 0.7, ease: "power2.out" },
        0.85
      );
      tl.to(stage2Ref.current, { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }, 1.75);

      // Stage 3 -> closing line + CTA
      tl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        1.9
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full" id="hero" ref={rootRef}>
      <div className="relative h-screen w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0" ref={bgRef}>
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,5,9,0.35)_0%,rgba(6,5,9,0.25)_40%,rgba(6,5,9,0.85)_100%)]" />
        </div>
        <div className = "absolute inset-0 z-[1] flex flex-col items-center justify-center text-center px-12 max-[720px]:px-6" ref = {bgRef}>
          <h1 className="font-display font-bold text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.05] text-text">
            Previous Events
          </h1>
          <p className="lg:text-2xl md:text-xl sm:text-lg font-body font-normal text-text-dim mt-2.5">
            A journey through the <em className="not-italic text-purple-light font-bold">memories</em> of our past events
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 z-[2] px-12 pb-[90px] flex flex-col gap-1 max-[720px]:px-6 max-[720px]:pb-[70px]"
          ref={stage1Ref}
        > 
          <span className="font-display font-bold text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] text-text">
            EVERY
          </span>
          <span className="font-display font-bold text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] text-purple-light">
            MEMORY
          </span>
          <span className="font-body font-normal text-[clamp(1rem,2vw,1.35rem)] text-text-dim mt-2.5">
            STARTED WITH A MOMENT
          </span>
        </div>

        <div
          className="absolute inset-x-0 top-0 z-[2] flex flex-col items-start justify-center"
          ref={stage2Ref}
        >
          <span className="font-display font-extrabold text-[clamp(3.2rem,11vw,9rem)] leading-none text-transparent mt-20 [-webkit-text-stroke:1.5px_rgba(244,242,248,0.55)] px-12 max-[720px]:px-6">
            MOMENTS
          </span>
          <span className="px-[52px] mt-3 font-display font-medium text-[clamp(1.1rem,3vw,2rem)] text-text-dim tracking-[0.05em] max-[720px]:px-[26px]">
            WE'VE <em className="not-italic text-purple-light font-bold">LIVED</em>
          </span>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-[2] px-12 pb-[90px] flex flex-row items-end justify-between gap-5 max-[720px]:px-6 max-[720px]:pb-[70px] max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-[22px]"
          ref={stage3Ref}
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-display font-bold text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.1] text-text">
              THE TIMELINE
            </span>
            <span className="font-display font-bold text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.1] text-purple-light">
              AWAITS BELOW
            </span>
          </div>
          <button
            className="group inline-flex items-center gap-2 py-3.5 px-[26px] rounded-full border-none bg-[linear-gradient(135deg,#8b5cf6,#6d28d9)] text-white font-semibold text-[0.98rem] cursor-pointer shadow-[0_10px_30px_rgba(139,92,246,0.35)] transition-[transform,box-shadow] duration-[250ms] ease-in-out whitespace-nowrap hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(139,92,246,0.5)]"
            onClick={onExplore}
          >
            Explore Events{" "}
            <span className="transition-transform duration-[250ms] ease-in-out group-hover:translate-x-[3px]">
              →
            </span>
          </button>
        </div>

        {/* <div className="absolute bottom-[26px] right-10 z-[3] flex items-center gap-2.5 text-[0.72rem] tracking-[0.18em] uppercase text-text-dim max-[720px]:right-6">
          <span className="w-px h-[26px] bg-[linear-gradient(180deg,var(--color-purple-light),transparent)] animate-scrollhint" />
          scroll
        </div> */}
      </div>
    </section>
  );
}
