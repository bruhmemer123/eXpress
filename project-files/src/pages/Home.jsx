import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef();

  useEffect(() => {
    const frameCount = 90;
    const isMobile = window.innerWidth < 768;
    const frameFolder = isMobile ? "mobile_frames" : "frames";

    const currentFrame = (index) =>
      `/${frameFolder}/frame_${String(index).padStart(4, "0")}.jpg`;

    const images = [];
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frame = { current: 0 };

    const drawCover = (ctx, img) => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    };

    const render = () => {
      const img = images[Math.floor(frame.current)];

      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCover(context, img);
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    const tween = gsap.to(frame, {
      current: frameCount - 1,
      snap: "current",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=4800",
        scrub: true,
      },
      onUpdate: render,
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    gsap.from(".ani", {
      y: 20,
      opacity: 0,
      delay: 0.2,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=3600",
        scrub: 0.3,
      },
    });

    tl.to(".hero1", {
      opacity: 0,
      y: -50,
      duration: 0.7,
    })
      .to(
        ".hero2",
        {
          opacity: 1,
          duration: 0.7,
        },
        "<"
      )
      .to(".hero2", {
        opacity: 0,
        y: -50,
        duration: 0.7,
      })
      .to(
        ".hero3",
        {
          opacity: 1,
          duration: 0.7,
        },
        "<"
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh+4800px)] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        <div className="absolute top-0 left-0 z-30 h-full w-[100%] md:w-[60%] bg-gradient-to-r from-black/90 via-black/50 to-black/0">
          
          <div className="absolute inset-0 z-20 pointer-events-none px-6 md:px-12 lg:px-16 flex items-end pb-12 md:pb-20">
            
            <div className="hero1 absolute bottom-12 md:bottom-20 left-6 md:left-12 lg:left-16">
              <h1 className="text-white uppercase leading-[1.05] flex flex-col gap-1 md:gap-2">
                <span className="ani text-4xl sm:text-5xl font-light md:text-6xl lg:text-7xl tracking-wide">
                  Every
                </span>
                <span className="ani inline-block text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent md:text-8xl lg:text-9xl pb-2 tracking-tight">
                  Voice
                </span>
                <span className="ani text-4xl sm:text-5xl font-light md:text-6xl lg:text-7xl tracking-wide">
                  Starts
                </span>
                <span className="ani text-4xl sm:text-5xl font-light md:text-6xl lg:text-7xl tracking-wide">
                  Somewhere
                </span>
              </h1>
            </div>

            <div className="hero2 absolute inset-0 opacity-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
              <div className="flex flex-col gap-2 md:gap-4 max-w-xl">
                <h1 className="text-white font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  EXPRESS
                </h1>
                <div>
                  <p className="text-purple-300 text-xl md:text-3xl font-medium uppercase tracking-[0.2em] mb-1">
                    To
                  </p>
                  <p className="text-violet-400 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight">
                    Inspire
                  </p>
                </div>
              </div>
            </div>

            <div className="hero3 absolute inset-0 opacity-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
              <div className="flex max-w-md flex-col gap-4 md:gap-6">
                <p className="text-white text-3xl sm:text-4xl md:text-5xl uppercase font-light tracking-wide">
                  The Stage
                </p>
                <p className="text-violet-400 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight">
                  Is Waiting
                </p>
                <button className="pointer-events-auto text-sm md:text-base inline-flex w-fit rounded-full bg-violet-600 px-8 py-3.5 font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-violet-500 hover:shadow-[0_10px_25px_rgba(139,92,246,0.4)] mt-2">
                  Join eXpress →
                </button>
              </div>
            </div>

          </div> 
        </div> 
      </div> 
    </div>
  );
}