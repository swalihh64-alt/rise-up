import React, { useState, useEffect } from "react";
import { DATA } from "../data/riseUpData";
import { BreathingOrb } from "./BreathingOrb";
import { Sparkles, PhoneCall, CheckCircle2, Circle, Copy, Check } from "lucide-react";

interface ResultPanelProps {
  category: string;
  userName?: string;
  complaintText: string;
  isCrisis: boolean;
  onNewProblem: () => void;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  category,
  userName,
  complaintText: _complaintText,
  isCrisis,
  onNewProblem
}) => {
  const data = DATA[category] || DATA["other"];

  // Quotes displayed (initial quotes from category)
  const [quotes, setQuotes] = useState<[string, string][]>([]);
  // Interactive checked steps
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setQuotes(data.quotes);
    setCheckedSteps({});
  }, [category, data]);

  const formattedTitle = userName
    ? `${userName}, ${data.title.charAt(0).toLowerCase() + data.title.slice(1)}`
    : data.title;

  const handleAnotherQuote = () => {
    const shownQuotes = new Set(quotes.map(q => q[0]));
    const pool = Object.values(DATA)
      .flatMap(d => d.quotes)
      .filter(([q]) => !shownQuotes.has(q));

    if (pool.length > 0) {
      const random = pool[Math.floor(Math.random() * pool.length)];
      setQuotes(prev => [...prev, random]);
    }
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const copyAdvice = async () => {
    const textToCopy = `Rise Up Reflection:\n\n${formattedTitle}\n\n${data.msg}\n\nQuotes:\n${quotes.map(([q, a]) => `• "${q}" — ${a}`).join("\n")}\n\nSteps for today:\n${data.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="result"
      className="p-6 rounded-xl border flex flex-col gap-6 anim-rise"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)"
      }}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded"
          style={{
            color: "var(--dawn)",
            backgroundColor: "var(--dawn-bg)"
          }}
        >
          {data.label}
        </span>
        <button
          type="button"
          onClick={copyAdvice}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded border transition-colors cursor-pointer"
          style={{
            borderColor: "var(--line)",
            backgroundColor: "var(--surface-2)",
            color: "var(--muted)"
          }}
          title="Copy words to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy reflection"}</span>
        </button>
      </div>

      <h2
        className="font-display text-2xl sm:text-3xl font-bold leading-tight m-0"
        style={{ color: "var(--ink)" }}
      >
        {formattedTitle}
      </h2>

      <p
        className="m-0 text-base sm:text-lg leading-relaxed max-w-[62ch]"
        style={{ color: "var(--ink)" }}
      >
        {data.msg}
      </p>

      {/* Helpline box if crisis detected */}
      {isCrisis && (
        <div
          role="alert"
          className="p-4 sm:p-5 rounded-lg border-2 flex flex-col gap-2.5"
          style={{
            backgroundColor: "var(--alert-bg)",
            borderColor: "var(--alert-line)"
          }}
        >
          <div className="flex items-start gap-2.5">
            <PhoneCall className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--dawn)" }} />
            <div>
              <p className="m-0 font-bold text-base sm:text-lg leading-snug" style={{ color: "var(--ink)" }}>
                You matter, and you do not have to carry this alone.
              </p>
              <p className="m-0 mt-1 text-sm sm:text-base leading-relaxed" style={{ color: "var(--ink)" }}>
                If you are thinking about hurting yourself, please talk to someone right now: a family member, a friend or a helpline.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm font-semibold">
                <a
                  href="tel:14416"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white text-slate-900 border border-red-300 shadow-sm hover:underline"
                >
                  Tele-MANAS: 14416 (Toll-Free, 24/7)
                </a>
                <a
                  href="tel:18005990019"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white text-slate-900 border border-red-300 shadow-sm hover:underline"
                >
                  KIRAN: 1800-599-0019 (24/7)
                </a>
              </div>
              <p className="m-0 mt-2 text-xs" style={{ color: "var(--muted)" }}>
                If you are outside India or in immediate danger, please reach out to your local emergency medical services or crisis line.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Motivation quotes */}
      <div className="flex flex-col gap-3">
        <h3
          className="font-display text-lg font-bold m-0"
          style={{ color: "var(--ink)" }}
        >
          Motivation for you
        </h3>

        <div className="flex flex-col gap-3">
          {quotes.map(([quoteText, author], idx) => (
            <div
              key={`${quoteText}-${idx}`}
              className="p-4 sm:p-5 rounded-lg border-l-4 transition-all duration-300 anim-slide-in"
              style={{
                backgroundColor: "var(--dawn-bg)",
                borderLeftColor: "var(--dawn)",
                animationDelay: `${idx * 150 + 150}ms`
              }}
            >
              <p
                className="font-display font-semibold text-lg sm:text-xl leading-snug text-balance m-0"
                style={{ color: "var(--ink)" }}
              >
                “{quoteText}”
              </p>
              <p className="m-0 mt-1.5 text-xs sm:text-sm font-medium" style={{ color: "var(--muted)" }}>
                — {author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Small steps for today */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="font-display text-lg font-bold m-0"
            style={{ color: "var(--ink)" }}
          >
            Small steps for today
          </h3>
          <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
            Tap to mark done
          </span>
        </div>

        <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
          {data.steps.map((step, idx) => {
            const isDone = !!checkedSteps[idx];
            return (
              <li
                key={idx}
                onClick={() => toggleStep(idx)}
                className="p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all duration-150 select-none hover:border-[var(--accent)] anim-fade-in"
                style={{
                  backgroundColor: isDone ? "var(--surface-2)" : "var(--surface)",
                  borderColor: isDone ? "var(--accent)" : "var(--line)",
                  animationDelay: `${idx * 100 + 350}ms`
                }}
              >
                <div className="mt-0.5 shrink-0" style={{ color: isDone ? "var(--accent)" : "var(--muted)" }}>
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 fill-current text-white dark:text-slate-900" style={{ color: "var(--accent)" }} />
                  ) : (
                    <Circle className="w-5 h-5 opacity-60" />
                  )}
                </div>
                <span
                  className={`text-base leading-snug transition-all ${
                    isDone ? "line-through opacity-70" : ""
                  }`}
                  style={{ color: "var(--ink)" }}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* One minute to breathe */}
      <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: "var(--line)" }}>
        <h3
          className="font-display text-lg font-bold m-0"
          style={{ color: "var(--ink)" }}
        >
          One minute to breathe
        </h3>
        <BreathingOrb />
      </div>

      {/* Bottom actions */}
      <div className="flex flex-wrap gap-2.5 pt-2 border-t" style={{ borderColor: "var(--line)" }}>
        <button
          type="button"
          onClick={handleAnotherQuote}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer hover:brightness-105 active:scale-95"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-ink)",
            borderColor: "var(--accent)"
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Show another quote</span>
        </button>

        <button
          type="button"
          onClick={onNewProblem}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer hover:border-[var(--accent)] active:scale-95"
          style={{
            backgroundColor: "transparent",
            color: "var(--ink)",
            borderColor: "var(--line)"
          }}
        >
          <span>Write something new</span>
        </button>
      </div>
    </section>
  );
};
