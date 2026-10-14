/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { UserBar } from "./components/UserBar";
import { DailyMotivation } from "./components/DailyMotivation";
import { AuthPanel } from "./components/AuthPanel";
import { ComplaintForm } from "./components/ComplaintForm";
import { LoaderPanel } from "./components/LoaderPanel";
import { ResultPanel } from "./components/ResultPanel";
import { HistoryPanel } from "./components/HistoryPanel";
import { VerityFeature } from "./components/VerityFeature";
import {
  UserAccount,
  HistoryItem,
  getSession,
  saveSession,
  getUserHistory,
  saveUserHistory
} from "./utils/storage";
import { detectCategory, hasCrisisKeywords } from "./data/riseUpData";
import { triggerBurst } from "./utils/burst";
import { ShieldCheck, Heart } from "lucide-react";

export default function App() {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [freshId, setFreshId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeResult, setActiveResult] = useState<{
    category: string;
    userName: string;
    complaintText: string;
    isCrisis: boolean;
  } | null>(null);

  const formSectionRef = useRef<HTMLDivElement | null>(null);
  const resultSectionRef = useRef<HTMLDivElement | null>(null);

  // Initialize session on mount
  useEffect(() => {
    const existing = getSession();
    if (existing) {
      setUser(existing);
      setHistory(getUserHistory(existing.key));
    }
  }, []);

  const handleAuthSuccess = (authenticatedUser: UserAccount) => {
    setUser(authenticatedUser);
    saveSession(authenticatedUser);
    const userHistory = getUserHistory(authenticatedUser.key);
    setHistory(userHistory);
    setActiveResult(null);
  };

  const handleSignOut = () => {
    saveSession(null);
    setUser(null);
    setHistory([]);
    setActiveResult(null);
    setFreshId(null);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplaintSubmit = ({
    name,
    category,
    mood,
    complaint
  }: {
    name: string;
    category: string;
    mood: string;
    complaint: string;
  }) => {
    if (!user) return;

    let finalCategory = category;
    if (finalCategory === "auto") {
      finalCategory = detectCategory(complaint);
    }
    const isCrisis = hasCrisisKeywords(complaint);

    const now = new Date();
    const formattedDate = now.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    });

    const newEntry: HistoryItem = {
      id: Date.now(),
      name,
      text: complaint,
      cat: finalCategory,
      mood,
      date: formattedDate
    };

    const updatedHistory = [newEntry, ...history].slice(0, 50);
    setHistory(updatedHistory);
    saveUserHistory(user.key, updatedHistory);
    setFreshId(newEntry.id);

    setIsLoading(true);
    setActiveResult(null);

    // Simulated thoughtful reading duration
    setTimeout(() => {
      setIsLoading(false);
      setActiveResult({
        category: finalCategory,
        userName: name,
        complaintText: complaint,
        isCrisis
      });

      // Scroll smoothly to results
      setTimeout(() => {
        if (resultSectionRef.current) {
          resultSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          triggerBurst(resultSectionRef.current);
        }
      }, 100);
    }, 2600);
  };

  const handleDeleteHistoryItem = (id: number) => {
    if (!user) return;
    const filtered = history.filter(item => item.id !== id);
    setHistory(filtered);
    saveUserHistory(user.key, filtered);
    if (freshId === id) setFreshId(null);
  };

  const handleClearAllHistory = () => {
    if (!user) return;
    setHistory([]);
    saveUserHistory(user.key, []);
    setFreshId(null);
  };

  const handleRevisitEntry = (item: HistoryItem) => {
    setActiveResult({
      category: item.cat,
      userName: item.name,
      complaintText: item.text,
      isCrisis: hasCrisisKeywords(item.text)
    });
    setTimeout(() => {
      if (resultSectionRef.current) {
        resultSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const handleWriteNew = () => {
    setActiveResult(null);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto flex flex-col gap-6">
      <Header />

      {/* User info bar when authenticated */}
      <UserBar user={user} onSignOut={handleSignOut} />

      {/* Daily motivation and challenge */}
      <DailyMotivation
        user={user}
        onStreakUpdate={() => {
          // Re-render state if needed
        }}
      />

      {/* Auth panel if not logged in */}
      {!user && <AuthPanel onSuccess={handleAuthSuccess} />}

      {/* Main complaint form when authenticated or guest */}
      {user && (
        <div ref={formSectionRef}>
          <ComplaintForm
            user={user}
            onSubmit={handleComplaintSubmit}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Loader panel while processing */}
      {isLoading && <LoaderPanel />}

      {/* Result encouragement panel */}
      {activeResult && !isLoading && (
        <div ref={resultSectionRef}>
          <ResultPanel
            category={activeResult.category}
            userName={activeResult.userName}
            complaintText={activeResult.complaintText}
            isCrisis={activeResult.isCrisis}
            onNewProblem={handleWriteNew}
          />
        </div>
      )}

      {/* Past entries history */}
      {user && (
        <HistoryPanel
          history={history}
          freshId={freshId}
          onDeleteItem={handleDeleteHistoryItem}
          onClearAll={handleClearAllHistory}
          onRevisitEntry={handleRevisitEntry}
        />
      )}

      {/* Verity & Grounding Variety Corner */}
      <VerityFeature />

      {/* Footer */}
      <footer
        className="mt-4 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm"
        style={{
          borderColor: "var(--line)",
          color: "var(--muted)"
        }}
      >
        <p className="m-0 italic">Every storm runs out of rain.</p>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 opacity-80">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Private & Stored on Device</span>
          </span>
          <span className="inline-flex items-center gap-1 opacity-80">
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-current" />
            <span>Rise Up</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
