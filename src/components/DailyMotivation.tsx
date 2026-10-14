import React, { useRef } from "react";
import { DAILY, getDayNumber, getTodayKey, getYesterdayKey } from "../data/riseUpData";
import { UserAccount, getUserDailyState, saveUserDailyState } from "../utils/storage";
import { triggerBurst } from "../utils/burst";
import { Flame, Check } from "lucide-react";

interface DailyMotivationProps {
  user: UserAccount | null;
  onStreakUpdate?: () => void;
}

export const DailyMotivation: React.FC<DailyMotivationProps> = ({ user, onStreakUpdate }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dayIdx = getDayNumber();
  const [quote, task] = DAILY[dayIdx % DAILY.length];

  const todayStr = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const todayKey = getTodayKey();
  const yesterdayKey = getYesterdayKey();

  const dailyState = user ? getUserDailyState(user.key) : { last: "", streak: 0 };
  const isDoneToday = user ? dailyState.last === todayKey : false;

  const currentStreak =
    user && (dailyState.last === todayKey || dailyState.last === yesterdayKey)
      ? dailyState.streak || 0
      : 0;

  const handleDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user || isDoneToday) return;

    const newStreak = dailyState.last === yesterdayKey ? (dailyState.streak || 0) + 1 : 1;
    saveUserDailyState(user.key, {
      last: todayKey,
      streak: newStreak
    });

    triggerBurst(e.currentTarget);
    if (onStreakUpdate) onStreakUpdate();
  };

  return (
    <section
      className="p-6 rounded-xl border flex flex-col gap-4 anim-rise"
      style={{
        backgroundColor: "var(--dawn-bg)",
        borderColor: "var(--line)",
        animationDelay: "0.1s"
      }}
      aria-labelledby="dailyH"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded"
          style={{
            color: "var(--dawn)",
            backgroundColor: "var(--surface)"
          }}
        >
          {todayStr}
        </span>
        {currentStreak > 0 && (
          <span
            className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--dawn)",
              borderColor: "var(--dawn)"
            }}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{currentStreak} {currentStreak === 1 ? "day streak" : "day streak"}</span>
          </span>
        )}
      </div>

      <h2
        id="dailyH"
        className="font-display text-xl sm:text-2xl font-bold leading-tight m-0"
        style={{ color: "var(--ink)" }}
      >
        Today's motivation
      </h2>

      <p className="m-0 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        You get one new quote every day, with one small task to go with it. Do the task, tap "I did it", and build a streak of days in a row. A new quote appears at midnight.
      </p>

      <blockquote
        className="m-0 font-display font-semibold text-[clamp(1.25rem,4vw,1.65rem)] leading-snug tracking-tight text-balance italic border-l-4 pl-4 my-1"
        style={{
          color: "var(--ink)",
          borderColor: "var(--dawn)"
        }}
      >
        “{quote}”
      </blockquote>

      <p className="m-0 text-[1rem] leading-relaxed max-w-[62ch]" style={{ color: "var(--ink)" }}>
        <strong style={{ color: "var(--dawn)" }}>Today's small challenge:</strong>{" "}
        <span>{task}</span>
      </p>

      {user ? (
        <div className="flex items-center gap-3 pt-1">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleDone}
            disabled={isDoneToday}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border transition-all duration-150 cursor-pointer disabled:cursor-not-allowed hover:brightness-105 active:scale-95 disabled:opacity-75"
            style={{
              backgroundColor: isDoneToday ? "var(--surface)" : "var(--accent)",
              color: isDoneToday ? "var(--ink)" : "var(--accent-ink)",
              borderColor: isDoneToday ? "var(--line)" : "var(--accent)"
            }}
          >
            {isDoneToday ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Done for today</span>
              </>
            ) : (
              <span>I did it</span>
            )}
          </button>
        </div>
      ) : null}

      <p className="m-0 text-xs sm:text-sm font-medium" style={{ color: "var(--muted)" }}>
        {!user ? (
          "Sign in or continue as guest to keep a daily streak."
        ) : isDoneToday ? (
          `Great job today! You have kept a ${currentStreak} ${currentStreak === 1 ? "day" : "days"} streak.`
        ) : currentStreak ? (
          `Streak: ${currentStreak} ${currentStreak === 1 ? "day" : "days"} in a row. Do today's challenge to keep it alive.`
        ) : (
          "Complete today's challenge to start a streak."
        )}
      </p>
    </section>
  );
};
