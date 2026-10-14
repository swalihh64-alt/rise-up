import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Wind } from "lucide-react";

export const BreathingOrb: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"ready" | "in" | "out" | "done">("ready");
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopBreathing = (finalStatus: "ready" | "done" = "ready") => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setPhase(finalStatus);
    setCycleCount(0);
  };

  const startBreathing = () => {
    stopBreathing("ready");
    setIsRunning(true);
    let count = 0;
    let inhale = true;

    // immediate first phase
    setPhase("in");
    count++;
    setCycleCount(count);

    timerRef.current = setInterval(() => {
      inhale = !inhale;
      setPhase(inhale ? "in" : "out");
      count++;
      setCycleCount(count);

      if (count >= 15) {
        stopBreathing("done");
      }
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const getDisplayText = () => {
    switch (phase) {
      case "in":
        return "Breathe in";
      case "out":
        return "Breathe out";
      case "done":
        return "Well done";
      default:
        return "Ready";
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <div className="relative flex items-center justify-center my-6">
        <div
          className={`w-[124px] h-[124px] rounded-full grid place-items-center text-center font-semibold text-sm transition-transform duration-[4000ms] ease-in-out select-none shadow-md ${
            phase === "in" ? "scale-150" : "scale-100"
          } ${isRunning ? "anim-ring" : ""}`}
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-ink)"
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <Wind className="w-4 h-4 opacity-75" />
            <span>{getDisplayText()}</span>
            {isRunning && (
              <span className="text-[11px] opacity-75">
                {Math.ceil(cycleCount / 2)} / 8
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isRunning ? (
          <button
            type="button"
            onClick={startBreathing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer hover:border-[var(--accent)] active:scale-95"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              borderColor: "var(--line)"
            }}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{phase === "done" ? "Breathe again" : "Start breathing"}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => stopBreathing("ready")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "var(--surface-2)",
              color: "var(--dawn)",
              borderColor: "var(--dawn)"
            }}
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop</span>
          </button>
        )}
      </div>
    </div>
  );
};
