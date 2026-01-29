"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Instagram, Linkedin, Youtube } from "lucide-react";


import hakcthon1 from "@/images/hakcthon1.png";
import hackthon2 from "@/images/hackthon2.png";
import hackthon3 from "@/images/hackthon3.png";

const languages = [
  "C",
  "C#",
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "Rust",
  "Ruby",
  "Lua",
  "Go",
  "PHP",
  "Swift",
  "Kotlin",
  "Scala",
  "Elixir",
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zachary-levesque-60500b252/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zach_lb1/",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@shoebot0",
    icon: Youtube,
  },
  {
    label: "GitHub",
    href: "https://github.com/Zackydout101",
    icon: Github,
  },
];

type Repo = {
  id: number;
  name: string;
  html_url: string;
  updated_at: string;
  description: string | null;
  fork: boolean;
  readmeIntro?: string | null;
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposError, setReposError] = useState<string | null>(null);

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

  useEffect(() => {
    let isMounted = true;
    const extractIntro = (markdown: string) => {
      const cleaned = markdown
        .replace(/\r\n/g, "\n")
        .replace(/^#\s.*$/gm, "")
        .replace(/^!\[.*?\]\(.*?\)$/gm, "")
        .replace(/`{1,3}[\s\S]*?`{1,3}/g, "");

      const paragraphs = cleaned
        .split(/\n\s*\n/)
        .map((para) => para.trim())
        .filter(Boolean);

      if (paragraphs.length === 0) return null;
      return paragraphs[0].replace(/\n/g, " ");
    };

    const fetchReadmeIntro = async (repoName: string) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/Zackydout101/${repoName}/readme`
        );
        if (!response.ok) return null;
        const data: { content?: string } = await response.json();
        if (!data.content) return null;
        const decoded = atob(data.content.replace(/\n/g, ""));
        return extractIntro(decoded);
      } catch {
        return null;
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Zackydout101/repos?sort=updated&per_page=5"
        );
        if (!response.ok) {
          throw new Error("GitHub request failed");
        }
        const data: Repo[] = await response.json();
        const filtered = data.filter((repo) => !repo.fork);
        const withReadmes = await Promise.all(
          filtered.map(async (repo) => ({
            ...repo,
            readmeIntro: await fetchReadmeIntro(repo.name),
          }))
        );
        if (isMounted) {
          setRepos(withReadmes);
          setReposError(null);
        }
      } catch (error) {
        if (isMounted) {
          setReposError("Unable to load GitHub projects right now.");
        }
      }
    };

    fetchRepos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-sm tracking-widest text-muted-foreground uppercase">About</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-stretch">
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex h-full flex-col gap-8">
              <div className="rounded-3xl border border-border/60 bg-card/40 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
                    <img
                      src={hakcthon1.src}
                      alt="Hackathon event photo 1"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
                    <img
                      src={hackthon2.src}
                      alt="Hackathon event photo 2"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
                    <img
                      src={hackthon3.src}
                      alt="Hackathon event photo 3"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Attending hackathons and tech events, building with teams, and
                  pushing rapid prototypes.
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <h3 className="text-sm tracking-widest text-muted-foreground uppercase mb-6">
                  Links
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-2 rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary/50"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                        <span className="font-medium group-hover:text-accent transition-colors">
                          {link.label}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          ↗
                        </span>
                      </a>
                    );
                  })}
                </div>
                
              </div>

            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex h-full flex-col gap-8">
              <div className="flex-1 rounded-3xl border border-border/60 bg-card/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <h3 className="text-sm tracking-widest text-muted-foreground uppercase mb-6">
                  Recent Projects
                </h3>
                {reposError ? (
                  <p className="text-sm text-muted-foreground">{reposError}</p>
                ) : (
                  <div className="space-y-4">
                    {repos.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Loading projects from GitHub...
                      </p>
                    ) : (
                      repos.map((repo) => (
                        <a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3 transition-colors hover:bg-secondary/50"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                              {repo.name}
                            </p>
                          {repo.readmeIntro ? (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {repo.readmeIntro}
                            </p>
                          ) : repo.description ? (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {repo.description}
                            </p>
                          ) : null}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            View ↗
                          </span>
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-border/60 bg-card/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <h3 className="text-sm tracking-widest text-muted-foreground uppercase mb-6">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                  {languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full border border-white/40 bg-gradient-to-r from-emerald-400/30 via-sky-400/30 to-violet-400/30 px-4 py-2 text-sm text-foreground shadow-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  A quick snapshot of the programming languages I use across web,
                  automation, and systems projects.
                </p>
              </div>
            
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
