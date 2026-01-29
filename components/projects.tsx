"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import aiRocketLeagueCar from "@/images/airocketleague.jpg";
import crafume from "@/images/perfumebackground.png";
import spyderforceSneakerBot from "@/images/spyderforce_intro.png";
import shoeBotCourse from "@/images/shoebot_allproducts.png";

const projects = [
  {
    id: 1,
    title: "AI Rocket League Car",
    description:
      "Reinforcement learning project that trains a Rocket League bot for control, positioning, and decision-making.",
    tags: ["Python", "C", "RL", "Computer Vision","RAG", "LLM", "C++", "ESP-IDF", "Boost.Asio", "Rust", "Unity", "TensorFlow Lite", "CUDA"],
    year: "2025",
    link: "#",
    image: aiRocketLeagueCar.src,
  },
  {
    id: 2,
    title: "Crafume",
    description:
      "AI fragrance experience that blends personalization, scent notes, and product storytelling.",
    tags: ["Next.js", "AI", "Product"],
    year: "2025",
    link: "#",
    image: crafume.src,
  },
  {
    id: 3,
    title: "SpyderForce Sneaker Bot",
    description:
      "Fast mobile sneaker bot with real-time monitoring, queue handling, and checkout automation.",
    tags: ["iOS", "Android", "Automation", "C#"],
    year: "2024",
    link: "#",
    image: spyderforceSneakerBot.src,
  },
  {
    id: 4,
    title: "ShoeBot Course",
    description:
      "Course platform and curriculum teaching sneaker bot development at scale.",
    tags: ["Education", "Web", "Community"],
    year: "2024",
    link: "#",
    image: shoeBotCourse.src,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100,200,180,0.1), transparent 40%)`
            : '',
        }}
      />

      <div className="relative p-6 md:p-8">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl mb-6 aspect-video">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-2xl font-medium tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <a
            href={project.link}
            className="flex-shrink-0 p-2 rounded-full bg-secondary text-secondary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
            aria-label={`View ${project.title} project`}
          >
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs tracking-wide bg-secondary text-secondary-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-sm tracking-widest text-muted-foreground uppercase">Selected Work</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
