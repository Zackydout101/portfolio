"use client";

import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : ''
      } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
        <a href="/" className="text-lg font-medium tracking-tight hover:text-accent transition-colors">
          ZL
        </a>
        
        <div className="flex items-center gap-8">
          <a 
            href="#about" 
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            About
          </a>
          <a 
            href="#projects" 
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Projects
          </a>
          <a 
            href="#contact" 
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors hidden md:block"
          >
            Contact
          </a>
          <a 
            href="#contact" 
            className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </nav>
    </header>
  );
}
