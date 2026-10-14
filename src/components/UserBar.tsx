import React from "react";
import { UserAccount } from "../utils/storage";
import { LogOut, User as UserIcon } from "lucide-react";

interface UserBarProps {
  user: UserAccount | null;
  onSignOut: () => void;
}

export const UserBar: React.FC<UserBarProps> = ({ user, onSignOut }) => {
  if (!user) return null;
  const isGuest = user.key === "guest";

  return (
    <div
      className="p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 anim-rise"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)"
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{
            backgroundColor: "var(--surface-2)",
            color: "var(--accent)"
          }}
        >
          <UserIcon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="m-0 text-sm font-semibold leading-tight truncate" style={{ color: "var(--ink)" }}>
            {isGuest ? "Guest" : `Signed in as ${user.name}`}
          </p>
          <small className="block text-xs leading-normal" style={{ color: "var(--muted)" }}>
            {isGuest
              ? "Entries stay on this device. Sign in to keep them under your name."
              : "Your entries are saved to this account on this device."}
          </small>
        </div>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 hover:opacity-90 active:scale-95 cursor-pointer"
        style={{
          borderColor: "var(--line)",
          backgroundColor: "transparent",
          color: "var(--ink)"
        }}
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Sign out</span>
      </button>
    </div>
  );
};
