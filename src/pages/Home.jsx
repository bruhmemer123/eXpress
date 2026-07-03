import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const canvasRef = useRef();

  useEffect(() => {
    const frameCount = 90;

    const currentFrame = (index) =>
      `/frames/frame_${String(index).padStart(4, "0")}.jpg`;

    const images = [];

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frame = {
      current: 0,
    };
    const drawCover = (ctx, img) => {
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);

  const centerShiftX =
    (canvas.width - img.width * ratio) / 2;

  const centerShiftY =
    (canvas.height - img.height * ratio) / 2;

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
      drawCover(context,img);
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    gsap.to(frame, {
      current: frameCount - 1,
      snap: "current",
      ease: "none",

      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=7000",
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
};
  }, []);

  useEffect(() => {
    gsap.from(".ani",{
      y:10,
      opacity:0,
      delay:0.2,
      stagger:0.2
    })
  }, [])
  
useEffect(() => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "+=6000",
      scrub: true
    }
  });

  tl.to(".hero1", {
    opacity: 0,
    y: -50,
    duration: 1
  })

  .to(".hero2", {
    opacity: 1,
    duration: 1
  }, "<")

  .to(".hero2", {
    opacity: 0,
    y: -50,
    duration: 1
  })

  .to(".hero3", {
    opacity: 1,
    duration: 1
  }, "<");

}, []);
  return (
    <>
    <div className="relative h-[6000px]">
  <canvas
    ref={canvasRef}
    className="fixed inset-0 z-0"
  />
  <div className="fixed z-30 bg-gradient-to-r from-black to-black/0 h-screen w-[60%]">
 
  <div className="fixed inset-0 z-20 pointer-events-none">

  {/* FRAME 1 */}
  <div className="hero1 absolute bottom-12 left-12">
    <h1 className="text-white uppercase leading-none">
      <span className="ani block text-6xl md:text-7xl font-light">
        Every
      </span>

      <span className="ani block text-7xl md:text-9xl font-bold bg-gradient-to-r from-violet-400 to-purple-700 bg-clip-text text-transparent">
        Voice
      </span>

      <span className="ani block text-6xl md:text-7xl font-light">
        Starts
      </span>

      <span className="ani block text-6xl md:text-7xl font-light">
        Somewhere
      </span>
    </h1>
  </div>

  {/* FRAME 2 */}
  <div className="hero2 absolute inset-0 opacity-0">

    <h1
      className="
      absolute
      left-10
      top-1/2
      -translate-y-1/2
      text-[14vw]
      font-black
      text-transparent
      [-webkit-text-stroke:2px_white]
      "
    >
      EXPRESS
    </h1>

    <div className="absolute left-12 bottom-12">
      <p className="text-white text-5xl font-light uppercase">
        To
      </p>

      <p className="text-violet-400 text-8xl font-black uppercase">
        Inspire
      </p>
    </div>
  </div>

  {/* FRAME 3 */}
  <div className="hero3 absolute inset-0 opacity-0">

    <div className="absolute left-12 bottom-12">
      <p className="text-white text-5xl uppercase">
        The Stage
      </p>

      <p className="text-violet-400 text-8xl font-black uppercase">
        Is Waiting
      </p>
    </div>

    <button
      className="
      absolute
      right-12
      bottom-12
      px-8
      py-4
      rounded-full
      bg-violet-600
      text-white
      font-bold
      "
    >
      Join eXpress →
    </button>

  </div>
</div>
</div>
</div>
    </>
  );
}