"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  { name: "Email", icon: Mail, href: "mailto:zackydout21@gmail.com" },
];

export function Contact() {
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
    <section id="contact" ref={sectionRef} className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div 
          className={`flex items-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-sm tracking-widest text-muted-foreground uppercase">Contact</h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div 
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 text-balance">
              Let's work together
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              If you would like to discuss a project or just say hi, I'm always down to chat. Currently available for freelance work and interesting collaborations.
            </p>
            <a 
              href="mailto:zackydout21@gmail.com"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span className="font-medium">Get in touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div 
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-6">
              <div>
                <span className="text-sm text-muted-foreground block mb-2">Email</span>
                <a 
                  href="mailto:zackydout21@gmail.com" 
                  className="text-lg hover:text-accent transition-colors inline-flex items-center gap-2 group"
                >
                  zackydout21@gmail.com
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div>
                <span className="text-sm text-muted-foreground block mb-4">Socials</span>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 bg-secondary rounded-full hover:bg-accent transition-colors"
                      aria-label={social.name}
                    >
                      <social.icon className="w-4 h-4 text-secondary-foreground group-hover:text-accent-foreground transition-colors" />
                      <span className="text-sm text-secondary-foreground group-hover:text-accent-foreground transition-colors">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground block mb-2">Location</span>
                <p className="text-lg">Ottawa, Canada</p>
                <p className="text-sm text-muted-foreground mt-1">Open to remote opportunities worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
