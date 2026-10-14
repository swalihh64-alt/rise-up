const memoryStore: Record<string, string> = {};

export function storageGet(key: string): string | null {
  try {
    const val = localStorage.getItem(key);
    if (val !== null) return val;
  } catch {
    // ignore
  }
  return memoryStore[key] ?? null;
}

export function storageSet(key: string, value: string): void {
  memoryStore[key] = value;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function storageRemove(key: string): void {
  delete memoryStore[key];
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export interface UserAccount {
  name: string;
  key: string;
}

export interface StoredAccountRecord {
  display: string;
  h: string;
}

export interface HistoryItem {
  id: number;
  name: string;
  text: string;
  cat: string;
  mood: string;
  date: string;
  completedSteps?: number[];
}

export interface DailyState {
  last: string;
  streak: number;
}

export async function hashPassword(name: string, password: string): Promise<string> {
  const data = new TextEncoder().encode(`${name.toLowerCase()}::${password}`);
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
      const buffer = await window.crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {
    // fallback below
  }
  let h = 5381;
  data.forEach(b => {
    h = ((h << 5) + h + b) >>> 0;
  });
  return `x${h}`;
}

export function getStoredAccounts(): Record<string, StoredAccountRecord> {
  try {
    return JSON.parse(storageGet("riseup_accounts") || "{}");
  } catch {
    return {};
  }
}

export function saveStoredAccounts(accounts: Record<string, StoredAccountRecord>): void {
  storageSet("riseup_accounts", JSON.stringify(accounts));
}

export function getSession(): UserAccount | null {
  try {
    const raw = storageGet("riseup_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(user: UserAccount | null): void {
  if (user) {
    storageSet("riseup_session", JSON.stringify(user));
  } else {
    storageRemove("riseup_session");
  }
}

export function getUserHistory(userKey: string): HistoryItem[] {
  try {
    return JSON.parse(storageGet(`riseup_history_${userKey}`) || "[]");
  } catch {
    return [];
  }
}

export function saveUserHistory(userKey: string, history: HistoryItem[]): void {
  storageSet(`riseup_history_${userKey}`, JSON.stringify(history));
}

export function getUserDailyState(userKey: string): DailyState {
  try {
    return JSON.parse(storageGet(`riseup_daily_${userKey}`) || "{}");
  } catch {
    return { last: "", streak: 0 };
  }
}

export function saveUserDailyState(userKey: string, state: DailyState): void {
  storageSet(`riseup_daily_${userKey}`, JSON.stringify(state));
}
