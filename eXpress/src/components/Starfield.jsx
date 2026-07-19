import { useEffect, useRef } from "react";

// A soft, drifting dot-field matching DJS eXpress' existing dark/purple
// aesthetic. Pure canvas, cheap on CPU, pauses off-screen automatically
// since it's fixed behind everything.
export default function Starfield({ density = 90 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let dots = [];
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.round((w * h) / 14000) + density;
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.4,
        drift: (Math.random() - 0.5) * 0.08,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y += d.drift;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        const twinkle = 0.35 + 0.35 * Math.sin(t * 0.0006 + d.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(196, 181, 253, ${twinkle})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
      aria-hidden="true"
    />
  );
}
