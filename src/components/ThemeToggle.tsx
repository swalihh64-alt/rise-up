import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem("riseup_theme");
      if (saved === "light" || saved === "dark" || saved === "system") return saved;
    } catch {
      // ignore
    }
    return "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
      try {
        localStorage.setItem("riseup_theme", "system");
      } catch {
        // ignore
      }
    } else {
      root.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("riseup_theme", theme);
      } catch {
        // ignore
      }
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme(current => {
      if (current === "light") return "dark";
      if (current === "dark") return "system";
      return "light";
    });
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Theme: ${theme}. Click to switch.`}
      aria-label={`Toggle theme, current is ${theme}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)",
        color: "var(--muted)"
      }}
    >
      {theme === "light" && (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span>Light</span>
        </>
      )}
      {theme === "dark" && (
        <>
          <Moon className="w-3.5 h-3.5 text-teal-400" />
          <span>Dark</span>
        </>
      )}
      {theme === "system" && (
        <>
          <Monitor className="w-3.5 h-3.5" />
          <span>Auto</span>
        </>
      )}
    </button>
  );
};
