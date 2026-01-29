"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Toronto",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="px-6 md:px-12 lg:px-24 py-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zachary Levesque
          </span>
          <span className="text-sm text-muted-foreground hidden md:block">
            Crafted with precision
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm text-muted-foreground">
            Ottawa, Canada — {time}
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
