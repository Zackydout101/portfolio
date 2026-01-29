"use client";

import { useEffect, useState } from "react";
import { JourneyTimeline } from "@/components/journey-timeline";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const orbitPath =
    "M 12 10 H 88 Q 94 10 94 16 V 84 Q 94 90 88 90 H 12 Q 6 90 6 84 V 16 Q 6 10 12 10 Z";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div 
          className={`absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
        />
        <div 
          className={`absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div
            className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-muted-foreground text-sm md:text-base tracking-widest uppercase mb-4">
              Software Engineer
            </p>
          </div>

          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Zachary Lévesque
          </h1>

          <p
            className={`text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-foreground italic">Crafting interfaces.</span>{" "}
            Building polished software and web experiences. Experimenting with magical details in user interfaces.
          </p>

          <div
            className={`mt-12 flex flex-wrap gap-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 text-sm tracking-wide hover:text-accent transition-colors"
            >
              <span className="w-8 h-px bg-foreground group-hover:w-12 group-hover:bg-accent transition-all" />
              VIEW WORK
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-sm tracking-wide hover:text-accent transition-colors"
            >
              <span className="w-8 h-px bg-foreground group-hover:w-12 group-hover:bg-accent transition-all" />
              GET IN TOUCH
            </a>
          </div>
        </div>

        <div
          className={`relative mx-auto w-full max-w-sm md:max-w-md lg:max-w-lg transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative aspect-square rounded-[2rem] border border-accent/40 bg-card/30 p-3 shadow-[0_0_40px_rgba(90,200,200,0.15)]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-secondary/20">
              <img
                src="/images/main_image.png"
                alt="Portrait"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pacman-orbit">
              <svg
                className="pacman-orbit-path"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path className="orbit-stroke" d={orbitPath} />
                <g className="orbit-dots">
                  <circle className="orbit-dot" cx="18" cy="12" r="1.6" />
                  <circle className="orbit-dot" cx="50" cy="10" r="1.6" />
                  <circle className="orbit-dot" cx="82" cy="12" r="1.6" />
                  <circle className="orbit-dot" cx="92" cy="35" r="1.6" />
                  <circle className="orbit-dot" cx="92" cy="65" r="1.6" />
                  <circle className="orbit-dot" cx="82" cy="88" r="1.6" />
                  <circle className="orbit-dot" cx="50" cy="90" r="1.6" />
                  <circle className="orbit-dot" cx="18" cy="88" r="1.6" />
                </g>

                <g className="pacman-motion">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={orbitPath}
                  />
                  <g className="pacman-body">
                    <circle cx="0" cy="0" r="11" fill="#facc15" />
                    <path
                      className="pacman-mouth pacman-mouth-open"
                      d="M0 0 L12 -8 L12 8 Z"
                      fill="var(--background)"
                    />
                    <path
                      className="pacman-mouth pacman-mouth-close"
                      d="M0 0 L12 -3 L12 3 Z"
                      fill="var(--background)"
                    />
                    <circle cx="-3" cy="-6" r="1.7" fill="#1e293b" />
                  </g>
                </g>

                <g className="ghost-motion">
                  <animateMotion
                    dur="6s"
                    begin="-1.8s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={orbitPath}
                  />
                  <g className="ghost-body">
                    <path
                      d="M0 -10C-6 -10 -10 -6 -10 0v10l3-3 3 3 3-3 3 3 3-3 3 3 3-3 3 3V0C10 -6 6 -10 0 -10z"
                      fill="#ff6b6b"
                    />
                    <circle cx="-4" cy="-2" r="2.2" fill="white" />
                    <circle cx="4" cy="-2" r="2.2" fill="white" />
                    <circle cx="-3" cy="-2" r="1" fill="#1e293b" />
                    <circle cx="5" cy="-2" r="1" fill="#1e293b" />
                  </g>
                </g>

                <g className="ghost-motion ghost-motion-alt">
                  <animateMotion
                    dur="6s"
                    begin="-3.6s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path={orbitPath}
                  />
                  <g className="ghost-body">
                    <path
                      d="M0 -9C-5.5 -9 -9 -5.5 -9 0v9l2.7-2.7 2.7 2.7 2.7-2.7 2.7 2.7 2.7-2.7 2.7 2.7 2.7-2.7 2.7 2.7V0C9 -5.5 5.5 -9 0 -9z"
                      fill="#4ecdc4"
                    />
                    <circle cx="-3.5" cy="-1.5" r="2" fill="white" />
                    <circle cx="3.5" cy="-1.5" r="2" fill="white" />
                    <circle cx="-2.5" cy="-1.5" r="0.9" fill="#1e293b" />
                    <circle cx="4.5" cy="-1.5" r="0.9" fill="#1e293b" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl mt-16 md:mt-20">
        <JourneyTimeline className="overflow-hidden" />
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-xs tracking-widest text-muted-foreground">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
      </div>
    </section>
  );
}
