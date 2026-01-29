"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100 ease-out"
        style={{
          left: position.x,
          top: position.y,
          background:
            "radial-gradient(circle, rgba(94, 234, 212, 0.08) 0%, rgba(94, 234, 212, 0.03) 30%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          background:
            "radial-gradient(circle, rgba(94, 234, 212, 0.12) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
