import React, { useState, useEffect } from "react";
import { LOAD_MSGS } from "../data/riseUpData";

export const LoaderPanel: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % LOAD_MSGS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="p-10 rounded-xl border flex flex-col items-center justify-center text-center gap-5 anim-rise"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)"
      }}
      aria-live="polite"
    >
      <div
        className="anim-spin-loader w-16 h-16 rounded-full border-[6px]"
        style={{
          borderColor: "var(--dawn-bg)",
          borderTopColor: "var(--dawn)"
        }}
        aria-hidden="true"
      />

      <p
        className="m-0 font-display font-semibold text-lg sm:text-xl transition-all duration-300"
        style={{ color: "var(--ink)" }}
      >
        {LOAD_MSGS[msgIdx]}
      </p>

      <div className="flex items-center gap-2" aria-hidden="true">
        <i
          className="w-2.5 h-2.5 rounded-full anim-bounce-loader block"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <i
          className="w-2.5 h-2.5 rounded-full anim-bounce-loader block"
          style={{
            backgroundColor: "var(--accent)",
            animationDelay: "0.15s"
          }}
        />
        <i
          className="w-2.5 h-2.5 rounded-full anim-bounce-loader block"
          style={{
            backgroundColor: "var(--accent)",
            animationDelay: "0.3s"
          }}
        />
      </div>
    </section>
  );
};
