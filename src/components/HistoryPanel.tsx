import React, { useState } from "react";
import { HistoryItem } from "../utils/storage";
import { DATA } from "../data/riseUpData";
import { Trash2, AlertTriangle, ArrowUpRight } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryItem[];
  freshId: number | null;
  onDeleteItem: (id: number) => void;
  onClearAll: () => void;
  onRevisitEntry?: (item: HistoryItem) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  freshId,
  onDeleteItem,
  onClearAll,
  onRevisitEntry
}) => {
  const [clearArmed, setClearArmed] = useState(false);

  const handleClearClick = () => {
    if (!clearArmed) {
      setClearArmed(true);
      setTimeout(() => setClearArmed(false), 4000);
      return;
    }
    setClearArmed(false);
    onClearAll();
  };

  return (
    <section
      id="histPanel"
      className="p-6 rounded-xl border flex flex-col gap-4 anim-rise"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)",
        animationDelay: "0.2s"
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          className="font-display text-xl sm:text-2xl font-bold leading-tight m-0"
          style={{ color: "var(--ink)" }}
        >
          Your past entries
        </h2>
        {history.length > 0 && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--surface-2)", color: "var(--muted)" }}>
            {history.length} {history.length === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        {history.length === 0 ? (
          <p className="m-0 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Nothing here yet. After you tap Send, your entry is listed here and stays on this device.
          </p>
        ) : (
          history.map(item => {
            const isFresh = item.id === freshId;
            const categoryData = DATA[item.cat];
            const catLabel = categoryData ? categoryData.label : "General";

            return (
              <div
                key={item.id}
                className={`flex items-start justify-between gap-3 py-3.5 border-t first:border-t-0 transition-colors ${
                  isFresh ? "anim-flash" : ""
                }`}
                style={{ borderColor: "var(--line)" }}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <strong className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                      {catLabel}
                    </strong>
                    {item.mood && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: "var(--surface-2)",
                          color: "var(--dawn)"
                        }}
                      >
                        {item.mood}
                      </span>
                    )}
                  </div>

                  <p
                    className="m-0 text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.text}
                  </p>

                  <div className="mt-1.5 flex items-center gap-3 flex-wrap">
                    <small className="text-xs" style={{ color: "var(--muted)" }}>
                      {item.name || "Anonymous"} · {item.date}
                    </small>

                    {onRevisitEntry && (
                      <button
                        type="button"
                        onClick={() => onRevisitEntry(item)}
                        className="inline-flex items-center gap-0.5 text-xs font-semibold hover:underline cursor-pointer"
                        style={{ color: "var(--accent)" }}
                      >
                        <span>Revisit encouragement</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteItem(item.id)}
                  title="Delete entry"
                  className="shrink-0 p-1.5 rounded text-xs font-semibold transition-opacity duration-150 cursor-pointer opacity-70 hover:opacity-100"
                  style={{ color: "var(--dawn)" }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {history.length > 0 && (
        <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
          <button
            type="button"
            onClick={handleClearClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 cursor-pointer active:scale-95 ${
              clearArmed ? "bg-red-50 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-300" : ""
            }`}
            style={{
              borderColor: clearArmed ? undefined : "var(--line)",
              color: clearArmed ? undefined : "var(--muted)",
              backgroundColor: clearArmed ? undefined : "transparent"
            }}
          >
            {clearArmed && <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{clearArmed ? "Tap again to delete everything" : "Clear all"}</span>
          </button>
        </div>
      )}
    </section>
  );
};
