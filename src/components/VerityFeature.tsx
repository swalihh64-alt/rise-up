import React, { useState, useEffect } from "react";
import {
  VERITY_CARDS,
  VerityCard,
  reframeUserThought,
  ReframedVerity
} from "../data/verityData";
import { soundscapes } from "../utils/soundscapes";
import { triggerBurst } from "../utils/burst";
import {
  Anchor,
  Compass,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Eye,
  Hand,
  Volume1,
  Flower2,
  Coffee,
  CheckCircle2,
  Heart,
  RefreshCw,
  Lightbulb,
  Radio,
  Sliders
} from "lucide-react";

type VerityTab = "deck" | "reframe" | "sensory" | "soundscape";

export const VerityFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VerityTab>("deck");

  // Deck state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [affirmedCards, setAffirmedCards] = useState<Record<string, boolean>>({});

  // Reframe state
  const [thoughtInput, setThoughtInput] = useState("");
  const [reframedResult, setReframedResult] = useState<ReframedVerity | null>(null);

  // Sensory reset state
  const [sensoryStep, setSensoryStep] = useState(0);
  const [sensoryCompleted, setSensoryCompleted] = useState<boolean[]>([false, false, false, false, false]);

  // Soundscape state
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.35);

  const filteredCards = VERITY_CARDS.filter(
    c => selectedCategory === "all" || c.category === selectedCategory
  );

  const currentCard: VerityCard = filteredCards[currentCardIndex % filteredCards.length] || VERITY_CARDS[0];

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      soundscapes.stop();
    };
  }, []);

  const handleNextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handleAffirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAffirmedCards(prev => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id]
    }));
    triggerBurst(e.currentTarget);
  };

  const handleReframeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thoughtInput.trim()) return;
    const result = reframeUserThought(thoughtInput.trim());
    setReframedResult(result);
  };

  const handleSensoryItemToggle = (index: number, e: React.MouseEvent) => {
    const updated = [...sensoryCompleted];
    updated[index] = !updated[index];
    setSensoryCompleted(updated);
    if (updated.every(Boolean)) {
      triggerBurst(e.currentTarget as HTMLElement);
    }
  };

  const resetSensory = () => {
    setSensoryCompleted([false, false, false, false, false]);
    setSensoryStep(0);
  };

  const toggleSound = (type: "rain" | "waves" | "chime" | "breeze") => {
    if (activeSound === type) {
      soundscapes.stop();
      setActiveSound(null);
    } else {
      if (type === "rain") soundscapes.playRain();
      if (type === "waves") soundscapes.playWaves();
      if (type === "chime") soundscapes.playTibetanChime();
      if (type === "breeze") soundscapes.playBreeze();
      soundscapes.setVolume(volume);
      setActiveSound(type);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundscapes.setVolume(newVol);
  };

  const sensoryStages = [
    {
      num: 5,
      icon: Eye,
      title: "5 Things you can see",
      desc: "Look around slowly. Notice five distinct details: the corner of a book, light reflecting on glass, a speck of dust, a shadow, a pattern."
    },
    {
      num: 4,
      icon: Hand,
      title: "4 Things you can physically touch",
      desc: "Feel the fabric of your clothing, the smooth surface of your desk, the cool air against your cheeks, the soles of your feet inside your shoes."
    },
    {
      num: 3,
      icon: Volume1,
      title: "3 Things you can hear",
      desc: "Listen beyond your internal chatter: distant traffic, the gentle hum of an appliance, birds outside, or the rhythmic sound of your own breathing."
    },
    {
      num: 2,
      icon: Flower2,
      title: "2 Things you can smell",
      desc: "Inhale through your nose. Notice the scent of soap, morning coffee, fresh paper, or simply clean air."
    },
    {
      num: 1,
      icon: Coffee,
      title: "1 Thing you can taste",
      desc: "Notice the remaining taste of your last sip of water or tea, or swallow gently and focus on this immediate sensory anchor."
    }
  ];

  return (
    <section
      id="veritySection"
      className="p-6 sm:p-7 rounded-2xl border flex flex-col gap-5 anim-rise shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)"
      }}
      aria-label="Verity and Grounding Variety Corner"
    >
      {/* Header with emblem */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
            style={{
              backgroundColor: "var(--dawn-bg)",
              color: "var(--dawn)"
            }}
          >
            <Anchor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight m-0" style={{ color: "var(--ink)" }}>
              The Verity Corner
            </h2>
            <p className="m-0 text-xs sm:text-sm font-medium" style={{ color: "var(--muted)" }}>
              Grounding truths, cognitive reframing, and calm sensory variety
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl" style={{ backgroundColor: "var(--surface-2)" }}>
          <button
            type="button"
            onClick={() => setActiveTab("deck")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            style={{
              backgroundColor: activeTab === "deck" ? "var(--surface)" : "transparent",
              color: activeTab === "deck" ? "var(--ink)" : "var(--muted)",
              boxShadow: activeTab === "deck" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Verity Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reframe")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            style={{
              backgroundColor: activeTab === "reframe" ? "var(--surface)" : "transparent",
              color: activeTab === "reframe" ? "var(--ink)" : "var(--muted)",
              boxShadow: activeTab === "reframe" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            <Lightbulb className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Anchor a Thought</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sensory")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            style={{
              backgroundColor: activeTab === "sensory" ? "var(--surface)" : "transparent",
              color: activeTab === "sensory" ? "var(--ink)" : "var(--muted)",
              boxShadow: activeTab === "sensory" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>5-4-3-2-1 Reset</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("soundscape")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            style={{
              backgroundColor: activeTab === "soundscape" ? "var(--surface)" : "transparent",
              color: activeTab === "soundscape" ? "var(--ink)" : "var(--muted)",
              boxShadow: activeTab === "soundscape" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
            }}
          >
            <Radio className="w-3.5 h-3.5 text-rose-500" />
            <span>Calm Sounds</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VERITY CARDS DECK */}
      {activeTab === "deck" && (
        <div className="flex flex-col gap-4 anim-fade-in">
          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-bold mr-1" style={{ color: "var(--muted)" }}>Topic:</span>
            {[
              { id: "all", label: "All Verities" },
              { id: "self-worth", label: "Self-Worth" },
              { id: "overthinking", label: "Overthinking" },
              { id: "future", label: "The Future" },
              { id: "exhaustion", label: "Rest & Burnout" },
              { id: "social", label: "Connection" }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className="px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer"
                style={{
                  backgroundColor: selectedCategory === cat.id ? "var(--accent)" : "var(--surface-2)",
                  color: selectedCategory === cat.id ? "var(--accent-ink)" : "var(--ink)",
                  borderColor: selectedCategory === cat.id ? "var(--accent)" : "var(--line)"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main Verity Card */}
          <div
            className="p-5 sm:p-6 rounded-xl border flex flex-col gap-4 relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--line)"
            }}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--dawn-bg)",
                  color: "var(--dawn)"
                }}
              >
                {currentCard.categoryLabel}
              </span>
              <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                Card {((currentCardIndex % filteredCards.length) + 1)} of {filteredCards.length}
              </span>
            </div>

            {/* Mind Whisper vs The Verity */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-lg border bg-opacity-50" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-slate-500 dark:text-slate-400">
                  What your mind whispers when anxious:
                </span>
                <p className="m-0 text-sm sm:text-base italic text-slate-700 dark:text-slate-300">
                  “{currentCard.mindWhisper}”
                </p>
              </div>

              <div
                className="p-4 sm:p-5 rounded-xl border-l-4 shadow-sm"
                style={{
                  backgroundColor: "var(--surface)",
                  borderLeftColor: "var(--dawn)"
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Anchor className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-display font-bold text-sm tracking-wide" style={{ color: "var(--dawn)" }}>
                    The Verity (Grounding Truth)
                  </span>
                </div>
                <p
                  className="font-display text-base sm:text-lg font-semibold leading-relaxed m-0"
                  style={{ color: "var(--ink)" }}
                >
                  {currentCard.verity}
                </p>
              </div>

              {/* Micro Action */}
              <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm">
                <Compass className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                <span><strong>Micro-Anchor:</strong> {currentCard.microAction}</span>
              </div>
            </div>

            {/* Card Action Controls */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: "var(--line)" }}>
              <button
                type="button"
                onClick={handleAffirm}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer active:scale-95 ${
                  affirmedCards[currentCard.id] ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200" : ""
                }`}
                style={{
                  borderColor: affirmedCards[currentCard.id] ? undefined : "var(--line)",
                  backgroundColor: affirmedCards[currentCard.id] ? undefined : "var(--surface)",
                  color: affirmedCards[currentCard.id] ? undefined : "var(--ink)"
                }}
              >
                <Heart className={`w-4 h-4 ${affirmedCards[currentCard.id] ? "fill-current text-rose-500" : ""}`} />
                <span>{affirmedCards[currentCard.id] ? "Affirmed in my heart" : "Affirm this Truth"}</span>
              </button>

              <button
                type="button"
                onClick={handleNextCard}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer hover:brightness-105 active:scale-95"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-ink)",
                  borderColor: "var(--accent)"
                }}
              >
                <span>Next Verity</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANCHOR A THOUGHT (INTERACTIVE REFRAMER) */}
      {activeTab === "reframe" && (
        <div className="flex flex-col gap-4 anim-fade-in">
          <p className="m-0 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Have a negative or discouraging thought looping in your head? Enter it below to test it against reality and receive a steadfast grounding Verity.
          </p>

          <form onSubmit={handleReframeSubmit} className="flex flex-col gap-3">
            <textarea
              rows={3}
              value={thoughtInput}
              onChange={e => setThoughtInput(e.target.value)}
              placeholder="e.g. 'I feel like I'm ruining my future and falling behind everyone...'"
              className="w-full px-3.5 py-2.5 rounded-lg border text-sm sm:text-base resize-none"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--line)",
                color: "var(--ink)"
              }}
            />

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                Anonymous · Evaluated with cognitive clarity
              </span>
              <button
                type="submit"
                disabled={!thoughtInput.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer hover:brightness-105 active:scale-95 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-ink)",
                  borderColor: "var(--accent)"
                }}
              >
                <Anchor className="w-4 h-4" />
                <span>Anchor with Verity</span>
              </button>
            </div>
          </form>

          {reframedResult && (
            <div
              className="p-5 rounded-xl border flex flex-col gap-3.5 anim-slide-in shadow-sm"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--line)"
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-200">
                  Pattern: {reframedResult.distortionType}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <strong className="text-xs font-bold uppercase tracking-wider block" style={{ color: "var(--dawn)" }}>
                    The Objective Verity:
                  </strong>
                  <p className="m-0 text-sm sm:text-base font-semibold leading-relaxed" style={{ color: "var(--ink)" }}>
                    {reframedResult.realityAnchor}
                  </p>
                </div>

                <div className="p-3 rounded-lg border bg-opacity-60" style={{ borderColor: "var(--line)", backgroundColor: "var(--surface)" }}>
                  <strong className="text-xs font-bold uppercase tracking-wider block text-teal-700 dark:text-teal-300">
                    A Healthier Perspective to Carry:
                  </strong>
                  <p className="m-0 mt-0.5 text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                    {reframedResult.newPerspective}
                  </p>
                </div>

                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1">
                  <Compass className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Small Step:</strong> {reframedResult.microAction}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: 5-4-3-2-1 SENSORY GROUNDING */}
      {activeTab === "sensory" && (
        <div className="flex flex-col gap-4 anim-fade-in">
          <div className="flex items-center justify-between gap-2">
            <p className="m-0 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              When your mind is racing or spiraling, engage your 5 physical senses to anchor yourself back to the physical room.
            </p>
            <button
              type="button"
              onClick={resetSensory}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded border transition-colors cursor-pointer"
              style={{
                borderColor: "var(--line)",
                color: "var(--muted)",
                backgroundColor: "var(--surface-2)"
              }}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {sensoryStages.map((stage, idx) => {
              const isDone = sensoryCompleted[idx];
              const Icon = stage.icon;

              return (
                <div
                  key={stage.num}
                  onClick={(e) => handleSensoryItemToggle(idx, e)}
                  className="p-3.5 sm:p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all duration-150 select-none hover:border-[var(--accent)]"
                  style={{
                    backgroundColor: isDone ? "var(--surface-2)" : "var(--surface)",
                    borderColor: isDone ? "var(--accent)" : "var(--line)"
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs"
                    style={{
                      backgroundColor: isDone ? "var(--accent)" : "var(--surface-2)",
                      color: isDone ? "var(--accent-ink)" : "var(--ink)"
                    }}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : stage.num}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <strong className={`text-sm sm:text-base font-bold ${isDone ? "line-through opacity-70" : ""}`} style={{ color: "var(--ink)" }}>
                        {stage.title}
                      </strong>
                    </div>
                    <p className={`m-0 text-xs sm:text-sm leading-relaxed ${isDone ? "opacity-60" : ""}`} style={{ color: "var(--muted)" }}>
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {sensoryCompleted.every(Boolean) && (
            <div
              className="p-4 rounded-xl border text-center anim-slide-in font-display font-semibold text-base"
              style={{
                backgroundColor: "var(--dawn-bg)",
                borderColor: "var(--dawn)",
                color: "var(--ink)"
              }}
            >
              🌿 Wonderful job. You have rooted all five senses into the present moment. You are here, you are safe, and you are breathing.
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CALM SOUNDSCAPES */}
      {activeTab === "soundscape" && (
        <div className="flex flex-col gap-4 anim-fade-in">
          <p className="m-0 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            A variety of continuous tranquil ambient soundscapes generated in pure synthesis. Works 100% offline with zero data consumption.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "rain", label: "Soft Rain", icon: "🌧️", desc: "Gentle drops & pink noise" },
              { id: "waves", label: "Ocean Shore", icon: "🌊", desc: "Rhythmic wave swell" },
              { id: "chime", label: "432Hz Chime", icon: "🔔", desc: "Singing harmonic bowl" },
              { id: "breeze", label: "Forest Wind", icon: "🍃", desc: "Tranquil evening breeze" }
            ].map(snd => {
              const isActive = activeSound === snd.id;
              return (
                <button
                  key={snd.id}
                  type="button"
                  onClick={() => toggleSound(snd.id as "rain" | "waves" | "chime" | "breeze")}
                  className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                    isActive ? "shadow-md ring-2 ring-[var(--accent)]" : "hover:border-[var(--accent)]"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--surface-2)" : "var(--surface)",
                    borderColor: isActive ? "var(--accent)" : "var(--line)"
                  }}
                >
                  <span className="text-2xl">{snd.icon}</span>
                  <strong className="text-sm font-bold" style={{ color: "var(--ink)" }}>{snd.label}</strong>
                  <span className="text-[11px] leading-tight" style={{ color: "var(--muted)" }}>{snd.desc}</span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1"
                    style={{
                      backgroundColor: isActive ? "var(--accent)" : "var(--surface-2)",
                      color: isActive ? "var(--accent-ink)" : "var(--muted)"
                    }}
                  >
                    {isActive ? "Playing" : "Play"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="p-3.5 rounded-xl border flex items-center justify-between gap-4 mt-1" style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--line)" }}>
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: "var(--ink)" }}>
              {volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
              <span>Sound Volume</span>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-[220px]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <span className="text-xs font-semibold w-8 text-right" style={{ color: "var(--muted)" }}>
                {Math.round(volume * 100)}%
              </span>
            </div>

            {activeSound && (
              <button
                type="button"
                onClick={() => {
                  soundscapes.stop();
                  setActiveSound(null);
                }}
                className="text-xs font-bold px-2.5 py-1 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-300 cursor-pointer hover:underline"
              >
                Mute
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
