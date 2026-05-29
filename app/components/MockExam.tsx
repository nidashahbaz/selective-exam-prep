"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { questions, CATEGORY_LABELS, type Category, type Question } from "@/app/data/questions";
import { saveResult, saveSession } from "@/app/lib/progress";
import { formatMath } from "@/app/lib/formatMath";
import { getDiagram } from "@/app/components/Diagrams";

interface Props {
  onDone: () => void;
  onExit: () => void;
}

interface SectionConfig {
  category: Category;
  label: string;
  icon: string;
  questionCount: number;
  timeSecs: number; // total section time
}

const SECTIONS: SectionConfig[] = [
  { category: "numerical", label: "Numerical Reasoning", icon: "🔢", questionCount: 10, timeSecs: 6 * 60 },
  { category: "verbal", label: "Verbal Reasoning", icon: "💬", questionCount: 10, timeSecs: 5 * 60 },
  { category: "mathematics", label: "Mathematical Reasoning", icon: "📐", questionCount: 10, timeSecs: 5 * 60 },
  { category: "reading", label: "Reading Comprehension", icon: "📖", questionCount: 7, timeSecs: 6 * 60 },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface SectionResult {
  category: Category;
  correct: number;
  total: number;
  timeTaken: number;
  timedOut: number;
}

export default function MockExam({ onDone, onExit }: Props) {
  const [phase, setPhase] = useState<"intro" | "section" | "break" | "results">("intro");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [pool, setPool] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sectionTimeLeft, setSectionTimeLeft] = useState(0);
  const [qStartTime, setQStartTime] = useState(Date.now());
  const [sectionResults, setSectionResults] = useState<SectionResult[]>([]);
  const [currentSectionAnswers, setCurrentSectionAnswers] = useState<{ correct: boolean; timeTaken: number; timedOut: boolean }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const section = SECTIONS[sectionIdx];

  function clearTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }

  function buildPool(cat: Category, count: number): Question[] {
    const filtered = questions.filter((q) => q.category === cat);
    return shuffle(filtered).slice(0, count);
  }

  function startSection(idx: number) {
    const sec = SECTIONS[idx];
    const p = buildPool(sec.category, sec.questionCount);
    setPool(p);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setSectionTimeLeft(sec.timeSecs);
    setCurrentSectionAnswers([]);
    setQStartTime(Date.now());
    setPhase("section");
  }

  // Section countdown
  useEffect(() => {
    if (phase !== "section") { clearTimer(); return; }
    timerRef.current = setInterval(() => {
      setSectionTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          finishSection(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sectionIdx]);

  const finishSection = useCallback((timeExpired = false) => {
    clearTimer();
    const sec = SECTIONS[sectionIdx];
    const answers = currentSectionAnswers;
    const correct = answers.filter((a) => a.correct).length;
    const timedOut = answers.filter((a) => a.timedOut).length;
    const timeTaken = sec.timeSecs - sectionTimeLeft;

    saveSession({
      id: `mock-${Date.now()}-${sec.category}`,
      date: Date.now(),
      category: sec.category,
      totalQuestions: sec.questionCount,
      correct,
      timeTaken,
      isMock: true,
    });

    setSectionResults((prev) => [...prev, { category: sec.category, correct, total: sec.questionCount, timeTaken, timedOut }]);

    if (sectionIdx + 1 >= SECTIONS.length) {
      setPhase("results");
    } else {
      setPhase("break");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdx, currentSectionAnswers, sectionTimeLeft]);

  const handleSelect = useCallback((idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const timeTaken = Math.round((Date.now() - qStartTime) / 1000);
    const correct = idx === pool[current].answer;
    const q = pool[current];
    saveResult({ questionId: q.id, category: q.category, subcategory: q.subcategory, correct, timeTaken, timedOut: false, timestamp: Date.now() });
    setCurrentSectionAnswers((prev) => [...prev, { correct, timeTaken, timedOut: false }]);
  }, [revealed, pool, current, qStartTime]);

  function nextQuestion() {
    if (current + 1 >= pool.length) {
      finishSection(false);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setQStartTime(Date.now());
    }
  }

  if (phase === "intro") {
    const totalQuestions = SECTIONS.reduce((s, sec) => s + sec.questionCount, 0);
    const totalMins = SECTIONS.reduce((s, sec) => s + sec.timeSecs / 60, 0);
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
          <div className="text-5xl text-center mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Full Mock Exam</h2>
          <p className="text-gray-500 text-center text-sm mb-6">Simulates real exam conditions with timed sections</p>

          <div className="space-y-3 mb-6">
            {SECTIONS.map((sec) => (
              <div key={sec.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{sec.icon}</span>
                  <span className="text-gray-700 font-medium text-sm">{sec.label}</span>
                </div>
                <div className="text-gray-500 text-sm">{sec.questionCount} Qs · {sec.timeSecs / 60} min</div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-sm text-indigo-700">
            <div className="font-semibold mb-1">Total: {totalQuestions} questions · {totalMins} minutes</div>
            <div>Answer each section before time runs out. The section ends automatically when time expires.</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={onExit} className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-3 font-semibold cursor-pointer transition-colors">
              ← Back
            </button>
            <button onClick={() => startSection(0)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold cursor-pointer transition-colors">
              Start Exam →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "break") {
    const nextSec = SECTIONS[sectionIdx + 1];
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-5xl mb-4">☕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Section Complete!</h2>
          <p className="text-gray-500 mb-2 text-sm">Section {sectionIdx + 1} of {SECTIONS.length} done.</p>
          <p className="text-gray-600 mb-6">Take a short break, then continue with:</p>
          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <div className="text-2xl mb-1">{nextSec.icon}</div>
            <div className="font-bold text-gray-800">{nextSec.label}</div>
            <div className="text-gray-500 text-sm">{nextSec.questionCount} questions · {nextSec.timeSecs / 60} minutes</div>
          </div>
          <button
            onClick={() => { setSectionIdx((i) => i + 1); startSection(sectionIdx + 1); }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold cursor-pointer transition-colors"
          >
            Start Next Section →
          </button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const totalCorrect = sectionResults.reduce((s, r) => s + r.correct, 0);
    const totalQ = sectionResults.reduce((s, r) => s + r.total, 0);
    const pct = Math.round((totalCorrect / totalQ) * 100);
    const grade = pct >= 90 ? "Outstanding!" : pct >= 70 ? "Great effort!" : pct >= 50 ? "Keep working!" : "More practice needed";
    const gradeColor = pct >= 90 ? "text-green-600" : pct >= 70 ? "text-blue-600" : pct >= 50 ? "text-yellow-600" : "text-red-600";

    return (
      <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div className="max-w-lg mx-auto pt-8">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center mb-6">
            <div className="text-5xl mb-3">🏁</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Mock Exam Complete!</h2>
            <div className={`text-5xl font-bold mb-1 ${gradeColor}`}>{pct}%</div>
            <div className={`text-lg mb-2 ${gradeColor}`}>{grade}</div>
            <div className="text-gray-500 text-sm">{totalCorrect} / {totalQ} correct overall</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Section Breakdown</h3>
            <div className="space-y-4">
              {sectionResults.map((r) => {
                const secPct = Math.round((r.correct / r.total) * 100);
                const sec = SECTIONS.find((s) => s.category === r.category)!;
                return (
                  <div key={r.category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 font-medium text-sm">{sec.icon} {sec.label}</span>
                      <span className="text-gray-500 text-sm">{r.correct}/{r.total} · {secPct}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${secPct >= 80 ? "bg-green-500" : secPct >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                          style={{ width: `${secPct}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-xs w-16 text-right">
                        {formatTime(r.timeTaken)} used
                      </span>
                    </div>
                    {r.timedOut > 0 && (
                      <div className="text-red-500 text-xs mt-1">⏰ {r.timedOut} question{r.timedOut > 1 ? "s" : ""} timed out</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={onDone} className="bg-white text-indigo-600 rounded-xl py-3 font-semibold cursor-pointer hover:bg-indigo-50 transition-colors">
              📊 Full Dashboard
            </button>
            <button onClick={onExit} className="bg-white/20 hover:bg-white/30 text-white rounded-xl py-3 font-semibold cursor-pointer transition-colors">
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Section in progress
  const q = pool[current];
  if (!q) return null;
  const timerPct = (sectionTimeLeft / section.timeSecs) * 100;
  const timerColor = timerPct > 50 ? "bg-green-400" : timerPct > 20 ? "bg-yellow-400" : "bg-red-500";
  const sectionProgress = ((current + (revealed ? 1 : 0)) / pool.length) * 100;

  const optionStyle = (idx: number) => {
    if (!revealed) return selected === idx ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50";
    if (idx === q.answer) return "border-green-500 bg-green-50";
    if (idx === selected && idx !== q.answer) return "border-red-500 bg-red-50";
    return "border-gray-200 bg-gray-50 opacity-60";
  };

  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-white text-sm font-medium">{section.icon} {section.label}</div>
          <div className={`text-lg font-bold ${sectionTimeLeft <= 60 ? "text-red-300 animate-pulse" : "text-white"}`}>
            ⏱ {formatTime(sectionTimeLeft)}
          </div>
          <div className="text-white/70 text-sm">{current + 1}/{pool.length}</div>
        </div>

        {/* Section timer bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div className={`${timerColor} rounded-full h-3 transition-all duration-1000`} style={{ width: `${timerPct}%` }} />
        </div>

        {/* Question progress */}
        <div className="w-full bg-white/20 rounded-full h-1.5 mb-5">
          <div className="bg-white rounded-full h-1.5 transition-all duration-300" style={{ width: `${sectionProgress}%` }} />
        </div>

        {q.passage && (
          <div className="bg-white/95 rounded-2xl p-5 mb-4 shadow-lg max-h-56 overflow-y-auto">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Passage</div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{q.passage}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 font-medium">{q.subcategory}</span>
            <span className={`text-xs rounded-full px-3 py-1 font-medium ${q.difficulty === "easy" ? "bg-green-100 text-green-700" : q.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
              {q.difficulty}
            </span>
          </div>

          <p className="text-gray-800 text-base font-medium mb-3 whitespace-pre-line leading-relaxed">{formatMath(q.question)}</p>

          {q.hasDiagram && getDiagram(q.id)}

          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={revealed}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionStyle(idx)} ${!revealed ? "cursor-pointer" : "cursor-default"}`}
              >
                <span className="font-semibold text-gray-500 mr-3">{String.fromCharCode(65 + idx)}.</span>
                <span className="text-gray-800">{formatMath(opt)}</span>
                {revealed && idx === q.answer && <span className="ml-2 text-green-600">✓</span>}
                {revealed && idx === selected && idx !== q.answer && <span className="ml-2 text-red-600">✗</span>}
              </button>
            ))}
          </div>

          {revealed && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="font-semibold text-blue-800 mb-1 text-sm">Explanation</div>
              <p className="text-blue-700 text-sm leading-relaxed">{formatMath(q.explanation)}</p>
            </div>
          )}

          {revealed && (
            <button onClick={nextQuestion} className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors cursor-pointer">
              {current + 1 < pool.length ? "Next →" : "Finish Section"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
