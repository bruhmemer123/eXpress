import { useEffect, useRef } from 'react';

export default function GlassRipple() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let lastX = 0;
    let lastY = 0;
    let timeout;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Calculate velocity and angle for the fluid stretch effect
      const dx = x - lastX;
      const dy = y - lastY;
      const velocity = Math.min(Math.sqrt(dx * dx + dy * dy), 60); // Cap max stretch
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // The faster the mouse moves, the longer and thinner the glass droplet gets
      const scaleX = 1 + velocity * 0.025;
      const scaleY = 1 - velocity * 0.01;

      // Apply transformations (centered on the mouse cursor)
      cursor.style.transform = `
        translate(${x - 75}px, ${y - 75}px) 
        rotate(${angle}deg) 
        scale(${scaleX}, ${scaleY})
      `;
      cursor.style.opacity = '1';

      lastX = x;
      lastY = y;

      // Dissipate (fade and shrink) when the mouse stops moving
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cursor.style.opacity = '0';
        // Shrinks back down to simulate a dissipating ripple
        cursor.style.transform = `translate(${lastX - 75}px, ${lastY - 75}px) scale(0.3)`;
      }, 150); 
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      // Tailwind classes handle the base size, absolute positioning, and smooth fading
      className="fixed top-0 left-0 w-[150px] h-[150px] rounded-full pointer-events-none z-50 origin-center transition-opacity duration-300"
      style={{
        // The magic CSS that creates the glassy refraction effect over your background
        backdropFilter: 'blur(8px) brightness(1.1) contrast(1.2)',
        WebkitBackdropFilter: 'blur(8px) brightness(1.1) contrast(1.2)',
        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        opacity: 0, // Starts invisible
      }}
    />
  );
}