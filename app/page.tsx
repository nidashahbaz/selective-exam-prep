"use client";

import { useState, useEffect } from "react";
import { CATEGORY_LABELS, type Category } from "@/app/data/questions";
import { getSessions, getResults, getCategoryStats } from "@/app/lib/progress";
import Quiz from "@/app/components/Quiz";
import MockExam from "@/app/components/MockExam";
import Dashboard from "@/app/components/Dashboard";

type View = "home" | "quiz" | "mock" | "dashboard";

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [quizCategory, setQuizCategory] = useState<Category | "mixed">("mixed");
  const [targetSubcategory, setTargetSubcategory] = useState<string | undefined>(undefined);
  const [timedMode, setTimedMode] = useState(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [overallPct, setOverallPct] = useState<number | null>(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [catStats, setCatStats] = useState<ReturnType<typeof getCategoryStats>>([]);

  useEffect(() => {
    const results = getResults();
    const correct = results.filter((r) => r.correct).length;
    setTotalAnswered(results.length);
    setOverallPct(results.length > 0 ? Math.round((correct / results.length) * 100) : null);
    setSessionCount(getSessions().length);
    setCatStats(getCategoryStats(results));
  }, [view]);

  function startQuiz(cat: Category | "mixed", subcategory?: string) {
    setQuizCategory(cat);
    setTargetSubcategory(subcategory);
    setView("quiz");
  }

  if (view === "quiz") {
    return (
      <Quiz
        category={quizCategory}
        targetSubcategory={targetSubcategory}
        timed={timedMode}
        onDone={() => setView("dashboard")}
        onExit={() => setView("home")}
      />
    );
  }

  if (view === "mock") {
    return <MockExam onDone={() => setView("dashboard")} onExit={() => setView("home")} />;
  }

  if (view === "dashboard") {
    return <Dashboard onBack={() => setView("home")} onTargetedPractice={startQuiz} />;
  }

  const categories: { key: Category | "mixed"; color: string; icon: string }[] = [
    { key: "mixed", color: "bg-indigo-600 hover:bg-indigo-700", icon: "🎯" },
    { key: "numerical", color: "bg-blue-600 hover:bg-blue-700", icon: "🔢" },
    { key: "verbal", color: "bg-purple-600 hover:bg-purple-700", icon: "💬" },
    { key: "mathematics", color: "bg-green-600 hover:bg-green-700", icon: "📐" },
    { key: "reading", color: "bg-orange-600 hover:bg-orange-700", icon: "📖" },
    { key: "vocabulary", color: "bg-rose-600 hover:bg-rose-700", icon: "📚" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <div className="text-6xl mb-3">🏆</div>
          <h1 className="text-4xl font-bold text-white mb-2">VIC Selective Exam Prep</h1>
          <p className="text-indigo-200 text-lg">Practice smarter, score higher</p>
        </div>

        {totalAnswered > 0 && (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-5 mb-6 grid grid-cols-3 gap-4 text-white text-center">
            <div>
              <div className="text-3xl font-bold">{totalAnswered}</div>
              <div className="text-indigo-200 text-sm">Questions Done</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{overallPct}%</div>
              <div className="text-indigo-200 text-sm">Overall Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{sessionCount}</div>
              <div className="text-indigo-200 text-sm">Sessions</div>
            </div>
          </div>
        )}

        {/* Timed mode toggle */}
        <div className="bg-white/15 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold">⏱ Timed Mode</div>
            <div className="text-indigo-200 text-sm">Countdown per question (real exam pace)</div>
          </div>
          <button
            onClick={() => setTimedMode((t) => !t)}
            className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${timedMode ? "bg-green-400" : "bg-white/30"}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${timedMode ? "left-8" : "left-1"}`} />
          </button>
        </div>

        {/* Practice categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {categories.map(({ key, color, icon }) => {
            const s = catStats.find((x) => x.category === key);
            return (
              <button
                key={key}
                onClick={() => startQuiz(key)}
                className={`${color} text-white rounded-2xl p-6 text-left transition-all transform hover:scale-[1.02] shadow-lg cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{icon}</span>
                  {s && <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">{s.percentage}%</span>}
                </div>
                <div className="font-bold text-xl">
                  {key === "mixed" ? "Mixed Practice" : CATEGORY_LABELS[key as Category]}
                </div>
                <div className="text-white/70 text-sm mt-1">
                  {key === "mixed" ? "All sections" : key === "vocabulary" ? "Barron's 1100 words" : "10 questions"}
                  {s && ` · ${s.total} attempted`}
                  {timedMode && " · ⏱ Timed"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mock exam */}
        <button
          onClick={() => setView("mock")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl p-5 mb-4 font-semibold text-lg transition-all cursor-pointer shadow-lg flex items-center justify-center gap-3"
        >
          <span className="text-2xl">📋</span>
          <div className="text-left">
            <div>Full Mock Exam</div>
            <div className="text-yellow-100 text-sm font-normal">4 timed sections · real exam conditions</div>
          </div>
        </button>

        {totalAnswered > 0 && (
          <button
            onClick={() => setView("dashboard")}
            className="w-full bg-white/20 hover:bg-white/30 text-white rounded-2xl p-4 font-semibold transition-all backdrop-blur cursor-pointer mb-6"
          >
            📊 View Progress Dashboard
          </button>
        )}

        <div className="bg-white/10 rounded-2xl p-5 text-white/80 text-sm">
          <div className="font-semibold text-white mb-2">Exam structure:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <div>🔢 Numerical Reasoning — 50 Qs, 30 min</div>
            <div>💬 Verbal Reasoning — 60 Qs, 30 min</div>
            <div>📐 Mathematical Reasoning — 60 Qs, 30 min</div>
            <div>📖 Reading Comprehension — 50 Qs, 30 min</div>
          </div>
        </div>
      </div>
    </main>
  );
}
