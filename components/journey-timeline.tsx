"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import spyderforceLogo from "@/images/spyderforce.png";
import blackberryLogo from "@/images/blackberry.png";
import shopifyLogo from "@/images/shopify.png";
import crafumeLogo from "@/images/crafume.png";
import ottawLogo from "@/images/ottawa.png";
import shoebotLogo from "@/images/shoebot.png";
import botitLogo from "@/images/botit_l.png";
const milestones = [
  {
    year: "2021",
    title: "SneakerBots Startup",
    description:
      "Co-founded SpyderForce, fastest sneaker bot on mobile, crossed $100k in sales during high school.",
    logo: { src: spyderforceLogo.src, alt: "SpyderForce" },
    gradient: "from-amber-100 via-amber-50 to-yellow-100",
    border: "border-amber-200/70",
    glow: "shadow-amber-200/40",
  },
  {
    year: "2022 - 2026",
    title: "University of Ottawa",
    description:
      "Started Software Engineering and built the fastest iOS/Android sneaker bot.",
    gradient: "from-violet-100 via-purple-50 to-fuchsia-100",
    border: "border-violet-200/70",
    glow: "shadow-violet-200/40",
    logo: { src: ottawLogo.src, alt: "University of Ottawa" },
  },
  {
    year: "2021 - 2023",
    title: "Coding Course Launch",
    description:
      "Created a coding course with 100k+ students and $40k in revenue.",
    gradient: "from-emerald-100 via-emerald-50 to-teal-100",
    border: "border-emerald-200/70",
    glow: "shadow-emerald-200/40",
    logo: { src: shoebotLogo.src, alt: "SpyderForce" },

  },
  {
    year: "2023 — 2024",
    title: "Embedded Software Engineer",
    description:
      "Built an internal dashboard revamp and virtualized CarPlay in the cloud.",
    logo: { src: blackberryLogo.src, alt: "BlackBerry" },
    gradient: "from-rose-100 via-pink-50 to-rose-100",
    border: "border-rose-200/70",
    glow: "shadow-rose-200/40",
  },
  {
    year: "2023",
    title: "Bot It (Shark Tank)",
    description:
      "Built an AI automation tool to book restaurants, litteraly anything you can think of.",
    gradient: "from-sky-100 via-blue-50 to-cyan-100",
    border: "border-sky-200/70",
    glow: "shadow-sky-200/40",
    logo: { src: botitLogo.src, alt: "BotIt" },

  },
  {
    year: "2024",
    title: "AI Rocket League Car",
    description: "Built an AI-driven Rocket League car as a research project.",
    gradient: "from-teal-100 via-cyan-50 to-emerald-100",
    border: "border-teal-200/70",
    glow: "shadow-teal-200/40",
  },
  {
    year: "2024 — 2025",
    title: "Software Engineer",
    description:
      "Built Shopify's ai chatbot on shopify.com and different agentic tools for Shopify employees.",
    logo: { src: shopifyLogo.src, alt: "Shopify" },
    gradient: "from-amber-100 via-amber-50 to-yellow-100",
    border: "border-amber-200/70",
    glow: "shadow-amber-200/40",
  },
  {
    year: "2025",
    title: "Crafume",
    description:
      "Crafume is a platform that allows you to create your own fragrance. COMING SOON",
    logo: { src: crafumeLogo.src, alt: "Crafume" },
    gradient: "from-violet-100 via-purple-50 to-fuchsia-100",
    border: "border-violet-200/70",
    glow: "shadow-violet-200/40",
  },
];

type JourneyTimelineProps = {
  className?: string;
};

export function JourneyTimeline({ className }: JourneyTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [dragOffsets, setDragOffsets] = useState(() =>
    milestones.map(() => ({ x: 0, y: 0 }))
  );
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [cardPositions, setCardPositions] = useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  // Update card positions for SVG connectors
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const positions = itemRefs.current.slice(0, milestones.length).map((ref) => {
      if (!ref) return { x: 0, y: 0, width: 0, height: 0 };
      const rect = ref.getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
    });
    setCardPositions(positions);
  }, []);

  // Intersection observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Initial position calculation + resize handler
  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    const timeout = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", updatePositions);
      clearTimeout(timeout);
    };
  }, [updatePositions, visibleItems]);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: dragOffsets[index].x,
      offsetY: dragOffsets[index].y,
    };
    setDraggingIndex(index);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    if (draggingIndex !== index) return;
    if (!dragStartRef.current) {
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        offsetX: dragOffsets[index].x,
        offsetY: dragOffsets[index].y,
      };
      return;
    }

    const dragStart = dragStartRef.current;
    if (!dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setDragOffsets((prev) => {
      const next = [...prev];
      next[index] = {
        x: dragStart.offsetX + dx,
        y: dragStart.offsetY + dy,
      };
      return next;
    });

    // Update connector positions in real-time
    requestAnimationFrame(updatePositions);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragStartRef.current = null;
    setDraggingIndex(null);
    updatePositions();
  };

  return (
    <div id="journey" className={className}>
      <div className="text-center mb-10" />

      {/* Desktop flowchart */}
      <div className="relative hidden md:block" ref={containerRef}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0, overflow: "visible" }}
        >
          {cardPositions.length > 1 &&
            cardPositions.slice(0, -1).map((pos, index) => {
              const nextPos = cardPositions[index + 1];
              if (!pos || !nextPos || pos.x === 0 || nextPos.x === 0) {
                return null;
              }

              const isVisible = visibleItems.includes(index);
              const startX = pos.x;
              const startY = pos.y + pos.height / 2 + 6;
              const endX = nextPos.x;
              const endY = nextPos.y - nextPos.height / 2 - 6;
              const midY = (startY + endY) / 2;

              return (
                <g key={index}>
                  <path
                    d={`M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
                    fill="none"
                    stroke="url(#journeyGradient)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    className={`transition-opacity duration-500 ${
                      isVisible ? "opacity-60" : "opacity-0"
                    }`}
                  />
                  <circle
                    cx={startX}
                    cy={startY}
                    r="4"
                    fill="currentColor"
                    className={`text-slate-400 transition-all duration-500 ${
                      isVisible ? "opacity-80" : "opacity-0"
                    }`}
                  />
                  <circle
                    cx={endX}
                    cy={endY}
                    r="4"
                    fill="currentColor"
                    className={`text-slate-400 transition-all duration-500 ${
                      isVisible ? "opacity-80" : "opacity-0"
                    }`}
                  />
                </g>
              );
            })}
          <defs>
            <linearGradient
              id="journeyGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgb(148 163 184 / 0.7)" />
              <stop offset="100%" stopColor="rgb(100 116 139 / 0.5)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
          {milestones.map((milestone, index) => {
            const isVisible = visibleItems.includes(index);
            const colPattern = [2, 1, 0, 2, 1, 0];
            const colStart = colPattern[index % 6] + 1;
            const isDragging = draggingIndex === index;

            return (
              <div
                key={`${milestone.year}-${milestone.title}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`${
                  isVisible ? "opacity-100" : "opacity-0 translate-y-8"
                } ${!isDragging ? "transition-all duration-700" : ""}`}
                style={{
                  transitionDelay: !isDragging ? `${index * 120}ms` : "0ms",
                  gridColumn: `${colStart} / span 1`,
                  transform: `translate3d(${dragOffsets[index]?.x ?? 0}px, ${
                    dragOffsets[index]?.y ?? 0
                  }px, 0)`,
                  zIndex: isDragging ? 50 : 1,
                }}
              >
                <div
                  onPointerDown={(e) => handlePointerDown(e, index)}
                  onPointerMove={(e) => handlePointerMove(e, index)}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={`
                    relative px-5 py-4 rounded-2xl select-none
                    bg-gradient-to-br ${milestone.gradient}
                    border ${milestone.border}
                    shadow-lg ${milestone.glow}
                    ${
                      isDragging
                        ? "shadow-2xl scale-105 cursor-grabbing"
                        : "hover:shadow-xl hover:-translate-y-1 cursor-grab"
                    }
                    transition-shadow transition-transform duration-200
                  `}
                  style={{ touchAction: "none" }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {milestone.title}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-500 bg-white/70 px-2 py-0.5 rounded-full">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                      {milestone.logo ? (
                        <img
                          src={milestone.logo.src}
                          alt={milestone.logo.alt}
                          className="h-10 w-10 rounded-sm object-contain"
                        />
                      ) : null}
                      <span>{milestone.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile stacked timeline */}
      <div className="relative md:hidden">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300/60 via-slate-400/40 to-transparent" />
        <div className="space-y-6 pl-8">
          {milestones.map((milestone) => (
            <div
              key={`${milestone.year}-${milestone.title}-mobile`}
              className="relative"
            >
              <div className="absolute -left-8 top-6 h-3 w-3 rounded-full bg-slate-300/70" />
              <div
                className={`
                  px-4 py-4 rounded-2xl
                  bg-gradient-to-br ${milestone.gradient}
                  border ${milestone.border}
                  shadow-lg ${milestone.glow}
                `}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-slate-800">
                    {milestone.title}
                  </h3>
                  <span className="text-[11px] font-medium text-slate-500 bg-white/70 px-2 py-0.5 rounded-full">
                    {milestone.year}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                  {milestone.logo ? (
                    <img
                      src={milestone.logo.src}
                      alt={milestone.logo.alt}
                      className="h-8 w-8 rounded-sm object-contain"
                    />
                  ) : null}
                  <span>{milestone.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
