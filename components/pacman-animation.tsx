"use client";

import { useEffect, useState, useRef } from "react";

interface Ghost {
  id: number;
  x: number;
  color: string;
  eaten: boolean;
}

export function PacmanAnimation() {
  const [pacmanX, setPacmanX] = useState(-50);
  const [mouthOpen, setMouthOpen] = useState(true);
  const [dots, setDots] = useState<number[]>([]);
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize dots and ghosts
  useEffect(() => {
    const generateDots = () => {
      const newDots: number[] = [];
      for (let i = 50; i < window.innerWidth - 50; i += 40) {
        newDots.push(i);
      }
      return newDots;
    };

    const generateGhosts = (): Ghost[] => {
      const colors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8fd3"];
      return colors.map((color, i) => ({
        id: i,
        x: 200 + i * 120,
        color,
        eaten: false,
      }));
    };

    setDots(generateDots());
    setGhosts(generateGhosts());

    const handleResize = () => {
      setDots(generateDots());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animate pacman movement
  useEffect(() => {
    const speed = 3;
    const interval = setInterval(() => {
      setPacmanX((prev) => {
        const maxX = window.innerWidth + 50;
        const minX = -50;

        if (direction === "right") {
          if (prev >= maxX) {
            setDirection("left");
            // Reset ghosts when changing direction
            setGhosts((g) => g.map((ghost) => ({ ...ghost, eaten: false })));
            return prev - speed;
          }
          return prev + speed;
        } else {
          if (prev <= minX) {
            setDirection("right");
            setGhosts((g) => g.map((ghost) => ({ ...ghost, eaten: false })));
            return prev + speed;
          }
          return prev - speed;
        }
      });
    }, 16);

    return () => clearInterval(interval);
  }, [direction]);

  // Animate mouth
  useEffect(() => {
    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Eat dots
  useEffect(() => {
    setDots((prev) =>
      prev.filter((dotX) => {
        const distance = Math.abs(dotX - pacmanX);
        return distance > 20;
      })
    );
  }, [pacmanX]);

  // Eat ghosts
  useEffect(() => {
    setGhosts((prev) =>
      prev.map((ghost) => {
        const distance = Math.abs(ghost.x - pacmanX);
        if (distance < 25 && !ghost.eaten) {
          return { ...ghost, eaten: true };
        }
        return ghost;
      })
    );
  }, [pacmanX]);

  // Regenerate dots periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newDots: number[] = [];
      for (let i = 50; i < window.innerWidth - 50; i += 40) {
        newDots.push(i);
      }
      setDots(newDots);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-16 overflow-hidden bg-secondary/30 border-b border-border"
    >
      {/* Dots */}
      {dots.map((dotX) => (
        <div
          key={dotX}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent/60 rounded-full transition-opacity duration-200"
          style={{ left: dotX }}
        />
      ))}

      {/* Ghosts */}
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-300 ${ghost.eaten ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
          style={{ left: ghost.x }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            className="animate-[bounce_0.5s_ease-in-out_infinite]"
          >
            <path
              d="M14 2C7.373 2 2 7.373 2 14v10l3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3V14C26 7.373 20.627 2 14 2z"
              fill={ghost.color}
            />
            <circle cx="10" cy="12" r="3" fill="white" />
            <circle cx="18" cy="12" r="3" fill="white" />
            <circle cx="11" cy="12" r="1.5" fill="#1e293b" />
            <circle cx="19" cy="12" r="1.5" fill="#1e293b" />
          </svg>
        </div>
      ))}

      {/* Pacman */}
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: pacmanX,
          transform: `translateY(-50%) scaleX(${direction === "left" ? -1 : 1})`,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="#facc15" />
          {mouthOpen && (
            <path d="M16 16 L30 8 L30 24 Z" fill="var(--background)" />
          )}
          <circle cx="14" cy="10" r="2" fill="#1e293b" />
        </svg>
      </div>

      {/* Score display */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-mono text-muted-foreground tracking-wider">
        SCORE: {(4 - ghosts.filter((g) => !g.eaten).length) * 200}
      </div>
    </div>
  );
}
