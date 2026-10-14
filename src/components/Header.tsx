import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Header: React.FC = () => {
  return (
    <header className="relative pt-2 pb-1">
      <div className="flex items-start justify-between gap-4">
        <div className="relative">
          <div
            className="sun anim-sunrise"
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-52px",
              top: "-8px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "var(--dawn)"
            }}
          />
          <h1
            className="font-display font-extrabold text-[clamp(2.4rem,8vw,3.6rem)] leading-none tracking-tight m-0 mb-3"
            style={{ color: "var(--ink)" }}
          >
            Rise <span style={{ color: "var(--dawn)" }}>Up</span>
          </h1>
        </div>
        <div className="pt-1">
          <ThemeToggle />
        </div>
      </div>
      <p
        className="m-0 max-w-[54ch] text-[1.1rem] leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        Write down what is bothering you. You will get a few honest words of encouragement and small steps for today.
      </p>
    </header>
  );
};
