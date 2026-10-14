import React, { useState, useEffect } from "react";
import { UserAccount } from "../utils/storage";

interface ComplaintFormProps {
  user: UserAccount | null;
  onSubmit: (data: {
    name: string;
    category: string;
    mood: string;
    complaint: string;
  }) => void;
  isLoading: boolean;
}

const MOODS = ["Sad", "Angry", "Anxious", "Low", "Okay"];

export const ComplaintForm: React.FC<ComplaintFormProps> = ({
  user,
  onSubmit,
  isLoading
}) => {
  const [name, setName] = useState(user && user.key !== "guest" ? user.name : "");
  const [category, setCategory] = useState("auto");
  const [selectedMood, setSelectedMood] = useState("");
  const [complaint, setComplaint] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (user && user.key !== "guest") {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = complaint.trim();
    if (!cleanText) {
      setHasError(true);
      return;
    }
    setHasError(false);
    onSubmit({
      name: name.trim(),
      category,
      mood: selectedMood,
      complaint: cleanText
    });
    setComplaint("");
  };

  const toggleMood = (m: string) => {
    setSelectedMood(prev => (prev === m ? "" : m));
  };

  return (
    <form
      id="complaintForm"
      onSubmit={handleSubmit}
      noValidate
      className="p-6 rounded-xl border flex flex-col gap-4.5 anim-rise"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)",
        animationDelay: "0.15s"
      }}
    >
      <h2
        className="font-display text-xl sm:text-2xl font-bold leading-tight m-0"
        style={{ color: "var(--ink)" }}
      >
        Share your problem
      </h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          Your name (optional)
        </label>
        <input
          id="name"
          type="text"
          placeholder="For example, Arun"
          autoComplete="given-name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border text-base"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--line)",
            color: "var(--ink)"
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          What is it about?
        </label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-lg border text-base"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--line)",
            color: "var(--ink)"
          }}
        >
          <option value="auto">Not sure, detect it for me</option>
          <option value="study">Study and exams</option>
          <option value="work">Work and career</option>
          <option value="family">Family and relationships</option>
          <option value="health">Health and stress</option>
          <option value="money">Money</option>
          <option value="lonely">Loneliness and sadness</option>
          <option value="failure">Failure and self-doubt</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          How are you feeling?
        </span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="How are you feeling?">
          {MOODS.map(m => {
            const isSelected = selectedMood === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleMood(m)}
                aria-pressed={isSelected}
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:scale-95"
                style={{
                  backgroundColor: isSelected ? "var(--accent)" : "var(--surface-2)",
                  color: isSelected ? "var(--accent-ink)" : "var(--ink)",
                  borderColor: isSelected ? "var(--accent)" : "var(--line)"
                }}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="complaint" className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          Your complaint or problem
        </label>
        <textarea
          id="complaint"
          rows={5}
          placeholder="Write freely. Nobody is judging you here."
          value={complaint}
          onChange={e => {
            setComplaint(e.target.value);
            if (hasError) setHasError(false);
          }}
          className="w-full px-3.5 py-2.5 rounded-lg border text-base resize-y min-h-[130px]"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--line)",
            color: "var(--ink)"
          }}
        />
      </div>

      {hasError && (
        <p className="m-0 text-sm font-semibold" style={{ color: "var(--dawn)" }} role="alert">
          Please write your problem in the box first, then tap Send.
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-5 rounded-lg text-base font-bold border transition-all duration-150 cursor-pointer hover:brightness-105 active:scale-95 disabled:opacity-60"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--accent-ink)",
          borderColor: "var(--accent)"
        }}
      >
        Send
      </button>

      <p className="m-0 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Your message is saved only in this browser. It is not sent to anyone.
      </p>
    </form>
  );
};
