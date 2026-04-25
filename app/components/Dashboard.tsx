"use client";

import { useState, useEffect } from "react";
import { CATEGORY_LABELS, type Category } from "@/app/data/questions";
import {
  getResults,
  getSessions,
  getCategoryStats,
  getSubcategoryStats,
  clearProgress,
  type CategoryStats,
  type SubcategoryStats,
} from "@/app/lib/progress";

interface Props {
  onBack: () => void;
}

export default function Dashboard({ onBack }: Props) {
  const [catStats, setCatStats] = useState<CategoryStats[]>([]);
  const [subStats, setSubStats] = useState<SubcategoryStats[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const results = getResults();
    const correct = results.filter((r) => r.correct).length;
    setTotalAnswered(results.length);
    setTotalCorrect(correct);
    setSessionCount(getSessions().length);
    setCatStats(getCategoryStats(results));
    setSubStats(getSubcategoryStats(results));
  }, []);

  function handleClear() {
    if (confirm("Reset all progress? This cannot be undone.")) {
      clearProgress();
      onBack();
    }
  }

  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const catColors: Record<string, string> = {
    numerical: "#3b82f6",
    verbal: "#8b5cf6",
    mathematics: "#22c55e",
    reading: "#f97316",
  };

  const weakAreas = subStats.filter((s) => s.total >= 2 && s.percentage < 60);
  const strongAreas = subStats.filter((s) => s.total >= 2 && s.percentage >= 80);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Progress Dashboard</h1>
          <button
            onClick={handleClear}
            className="text-white/50 hover:text-red-300 text-sm transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Overall */}
        <div className="bg-white rounded-3xl p-6 mb-6 text-center shadow-xl">
          <div className="text-5xl font-bold text-indigo-600 mb-1">{overallPct}%</div>
          <div className="text-gray-500 mb-4">Overall Score</div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalAnswered}</div>
              <div className="text-gray-500 text-sm">Questions Attempted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{sessionCount}</div>
              <div className="text-gray-500 text-sm">Sessions Completed</div>
            </div>
          </div>
        </div>

        {/* By category */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Score by Category</h2>
          {catStats.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet — start practising!</p>
          ) : (
            <div className="space-y-4">
              {catStats.map((s) => (
                <div key={s.category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-medium text-sm">
                      {CATEGORY_LABELS[s.category as Category]}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {s.correct}/{s.total} · {s.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${s.percentage}%`,
                        backgroundColor: catColors[s.category] ?? "#6366f1",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weak areas */}
        {weakAreas.length > 0 && (
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              🔴 Areas to Improve
            </h2>
            <p className="text-gray-400 text-sm mb-4">Topics where you scored below 60%</p>
            <div className="space-y-3">
              {weakAreas.map((s) => (
                <div key={s.subcategory} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                  <span className="text-gray-700 font-medium text-sm">{s.subcategory}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-red-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-red-400"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                    <span className="text-red-600 font-semibold text-sm w-10 text-right">
                      {s.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strong areas */}
        {strongAreas.length > 0 && (
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              🟢 Strong Areas
            </h2>
            <p className="text-gray-400 text-sm mb-4">Topics where you scored 80% or above</p>
            <div className="space-y-3">
              {strongAreas.map((s) => (
                <div key={s.subcategory} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-gray-700 font-medium text-sm">{s.subcategory}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-green-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                    <span className="text-green-600 font-semibold text-sm w-10 text-right">
                      {s.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All subcategory breakdown */}
        {subStats.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">All Topics</h2>
            <div className="space-y-2">
              {subStats.map((s) => (
                <div key={s.subcategory} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{s.subcategory}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{s.correct}/{s.total}</span>
                    <span
                      className={`font-semibold w-10 text-right ${
                        s.percentage >= 80
                          ? "text-green-600"
                          : s.percentage >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {s.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onBack}
          className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white rounded-2xl p-4 font-semibold transition-all cursor-pointer"
        >
          Start Practising
        </button>
      </div>
    </div>
  );
}
