"use client";

import { useState, useCallback } from "react";
import { questions, CATEGORY_LABELS, type Category, type Question } from "@/app/data/questions";
import { saveResult, saveSession } from "@/app/lib/progress";

interface Props {
  category: Category | "mixed";
  targetSubcategory?: string;
  onDone: () => void;
  onExit: () => void;
}

const QUESTIONS_PER_SESSION = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ category, targetSubcategory, onDone, onExit }: Props) {
  const [pool] = useState<Question[]>(() => {
    let filtered =
      category === "mixed"
        ? questions
        : questions.filter((q) => q.category === category);

    if (targetSubcategory) {
      filtered = filtered.filter((q) => q.subcategory === targetSubcategory);
      // if fewer than 5 exact matches, add more from same category
      if (filtered.length < 5) {
        const extra = questions.filter(
          (q) =>
            (category === "mixed" || q.category === category) &&
            q.subcategory !== targetSubcategory
        );
        filtered = [...filtered, ...shuffle(extra).slice(0, QUESTIONS_PER_SESSION - filtered.length)];
      }
    }

    return shuffle(filtered).slice(0, QUESTIONS_PER_SESSION);
  });

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; timeTaken: number }[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [sessionStart] = useState(Date.now());
  const [done, setDone] = useState(false);

  const q = pool[current];

  const handleSelect = useCallback(
    (idx: number) => {
      if (revealed) return;
      setSelected(idx);
      setRevealed(true);
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      const correct = idx === q.answer;
      saveResult({
        questionId: q.id,
        category: q.category,
        subcategory: q.subcategory,
        correct,
        timeTaken,
        timestamp: Date.now(),
      });
      setResults((prev) => [...prev, { correct, timeTaken }]);
    },
    [revealed, q, startTime]
  );

  function next() {
    if (current + 1 >= pool.length) {
      const correct = results.filter((r) => r.correct).length;
      saveSession({
        id: `s-${Date.now()}`,
        date: sessionStart,
        category,
        totalQuestions: pool.length,
        correct,
        timeTaken: Math.round((Date.now() - sessionStart) / 1000),
      });
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setStartTime(Date.now());
    }
  }

  if (done) {
    const correct = results.filter((r) => r.correct).length;
    const pct = Math.round((correct / pool.length) * 100);
    const grade =
      pct >= 90 ? "Excellent!" : pct >= 70 ? "Good work!" : pct >= 50 ? "Keep practising!" : "More practice needed";
    const gradeColor =
      pct >= 90 ? "text-green-600" : pct >= 70 ? "text-blue-600" : pct >= 50 ? "text-yellow-600" : "text-red-600";

    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">{pct >= 70 ? "🎉" : "📚"}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Complete!</h2>
          <div className={`text-5xl font-bold mb-1 ${gradeColor}`}>{pct}%</div>
          <div className={`text-lg mb-4 ${gradeColor}`}>{grade}</div>
          <div className="text-gray-500 mb-8">
            {correct} / {pool.length} correct
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onDone}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition-colors cursor-pointer"
            >
              📊 See Progress
            </button>
            <button
              onClick={onExit}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold transition-colors cursor-pointer"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const catLabel = category === "mixed" ? "Mixed Practice" : CATEGORY_LABELS[category as Category];
  const sessionLabel = targetSubcategory ? `Targeted: ${targetSubcategory}` : catLabel;
  const progress = ((current + (revealed ? 1 : 0)) / pool.length) * 100;

  const optionStyle = (idx: number) => {
    if (!revealed) {
      return selected === idx
        ? "border-indigo-500 bg-indigo-50"
        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
    }
    if (idx === q.answer) return "border-green-500 bg-green-50";
    if (idx === selected && idx !== q.answer) return "border-red-500 bg-red-50";
    return "border-gray-200 bg-gray-50 opacity-60";
  };

  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onExit} className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer">
            ← Exit
          </button>
          <div className="text-white font-medium text-sm text-center">{sessionLabel}</div>
          <div className="text-white/70 text-sm">{current + 1} / {pool.length}</div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-2 mb-6">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Passage for reading comprehension */}
        {q.passage && (
          <div className="bg-white/95 rounded-2xl p-6 mb-4 shadow-lg max-h-64 overflow-y-auto">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">Read the passage</div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{q.passage}</p>
          </div>
        )}

        {/* Question card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 font-medium">
              {q.subcategory}
            </span>
            <span
              className={`text-xs rounded-full px-3 py-1 font-medium ${
                q.difficulty === "easy"
                  ? "bg-green-100 text-green-700"
                  : q.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {q.difficulty}
            </span>
          </div>

          <p className="text-gray-800 text-base font-medium mb-5 whitespace-pre-line leading-relaxed">
            {q.question}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle(idx)} ${
                  !revealed ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="font-semibold text-gray-500 mr-3">{String.fromCharCode(65 + idx)}.</span>
                <span className="text-gray-800">{opt}</span>
                {revealed && idx === q.answer && <span className="ml-2 text-green-600">✓</span>}
                {revealed && idx === selected && idx !== q.answer && <span className="ml-2 text-red-600">✗</span>}
              </button>
            ))}
          </div>

          {revealed && (
            <div className="mt-5 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="font-semibold text-blue-800 mb-1 text-sm">Explanation</div>
              <p className="text-blue-700 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {revealed && (
            <button
              onClick={next}
              className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors cursor-pointer"
            >
              {current + 1 < pool.length ? "Next Question →" : "Finish Session"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
