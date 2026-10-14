import React, { useState } from "react";
import {
  UserAccount,
  getStoredAccounts,
  saveStoredAccounts,
  hashPassword
} from "../utils/storage";

interface AuthPanelProps {
  onSuccess: (user: UserAccount) => void;
}

export const AuthPanel: React.FC<AuthPanelProps> = ({ onSuccess }) => {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanName = name.trim();

    if (cleanName.length < 2) {
      setError("Enter a name with at least 2 characters.");
      return;
    }
    if (password.length < 4) {
      setError("Use a password with at least 4 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const key = cleanName.toLowerCase();
      const accounts = getStoredAccounts();
      const h = await hashPassword(key, password);

      if (mode === "up") {
        if (accounts[key]) {
          setError("That name is already taken. Pick another, or switch to Sign in.");
          setSubmitting(false);
          return;
        }
        accounts[key] = { display: cleanName, h };
        saveStoredAccounts(accounts);
      } else {
        if (!accounts[key]) {
          setError("There is no account with that name on this device. Switch to Create account.");
          setSubmitting(false);
          return;
        }
        if (accounts[key].h !== h) {
          setError("That password does not match.");
          setSubmitting(false);
          return;
        }
      }

      const activeUser: UserAccount = {
        name: accounts[key].display,
        key: `u_${key}`
      };
      setPassword("");
      onSuccess(activeUser);
    } catch {
      setError("Something went wrong while verifying. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = () => {
    onSuccess({
      name: "Guest",
      key: "guest"
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 rounded-xl border flex flex-col gap-4 anim-rise"
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
        Sign in to start
      </h2>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Account mode">
        <button
          type="button"
          onClick={() => {
            setMode("in");
            setError(null);
          }}
          aria-pressed={mode === "in"}
          className="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer"
          style={{
            backgroundColor: mode === "in" ? "var(--accent)" : "var(--surface-2)",
            color: mode === "in" ? "var(--accent-ink)" : "var(--ink)",
            borderColor: mode === "in" ? "var(--accent)" : "var(--line)"
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("up");
            setError(null);
          }}
          aria-pressed={mode === "up"}
          className="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer"
          style={{
            backgroundColor: mode === "up" ? "var(--accent)" : "var(--surface-2)",
            color: mode === "up" ? "var(--accent-ink)" : "var(--ink)",
            borderColor: mode === "up" ? "var(--accent)" : "var(--line)"
          }}
        >
          Create account
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="authUser" className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          Name
        </label>
        <input
          id="authUser"
          type="text"
          autoComplete="username"
          placeholder="For example, Arun"
          value={name}
          onChange={e => {
            setName(e.target.value);
            setError(null);
          }}
          className="w-full px-3.5 py-2.5 rounded-lg border text-base transition-colors duration-150"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--line)",
            color: "var(--ink)"
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="authPass" className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
          Password
        </label>
        <input
          id="authPass"
          type="password"
          autoComplete={mode === "in" ? "current-password" : "new-password"}
          placeholder="At least 4 characters"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError(null);
          }}
          className="w-full px-3.5 py-2.5 rounded-lg border text-base transition-colors duration-150"
          style={{
            backgroundColor: "var(--surface-2)",
            borderColor: "var(--line)",
            color: "var(--ink)"
          }}
        />
      </div>

      {error && (
        <p className="m-0 text-sm font-semibold" style={{ color: "var(--dawn)" }} role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-5 rounded-lg text-base font-bold border transition-all duration-150 cursor-pointer hover:brightness-105 active:scale-95 disabled:opacity-60"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--accent-ink)",
          borderColor: "var(--accent)"
        }}
      >
        {submitting ? "Checking..." : mode === "in" ? "Sign in" : "Create account"}
      </button>

      <button
        type="button"
        onClick={handleGuest}
        className="w-full py-2.5 px-5 rounded-lg text-base font-semibold border transition-all duration-150 cursor-pointer hover:border-[var(--accent)] active:scale-95"
        style={{
          backgroundColor: "transparent",
          color: "var(--ink)",
          borderColor: "var(--line)"
        }}
      >
        Continue as guest
      </button>

      <p className="m-0 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        Accounts are stored only in this browser, so they work on this device and are not a secure online login. Do not use a password you use anywhere else.
      </p>
    </form>
  );
};
