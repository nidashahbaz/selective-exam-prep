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
  onTargetedPractice: (category: Category | "mixed", subcategory?: string) => void;
}

const SUBJECT_CONFIG: { category: Category; icon: string; color: string; barColor: string }[] = [
  { category: "numerical",   icon: "🔢", color: "border-blue-200 bg-blue-50",   barColor: "bg-blue-500" },
  { category: "verbal",      icon: "💬", color: "border-purple-200 bg-purple-50", barColor: "bg-purple-500" },
  { category: "mathematics", icon: "📐", color: "border-green-200 bg-green-50",  barColor: "bg-green-500" },
  { category: "reading",     icon: "📖", color: "border-orange-200 bg-orange-50", barColor: "bg-orange-500" },
  { category: "vocabulary",  icon: "📚", color: "border-rose-200 bg-rose-50",    barColor: "bg-rose-500" },
];

const subCategoryToCategory: Record<string, Category> = {
  "Simple Interest": "mathematics", "Percentages & Discounts": "mathematics",
  "Area & Perimeter": "mathematics", "Volume": "mathematics", "Algebra": "mathematics",
  "Coordinate Geometry": "mathematics", "Statistics": "mathematics",
  "Pythagoras & Trigonometry": "mathematics", "Number Theory": "mathematics",
  "Rates & Speed": "mathematics", "Number Series": "numerical", "Grid Patterns": "numerical",
  "Word Problems": "numerical", "Percentages": "numerical", "Rates": "numerical",
  "Analogies": "verbal", "Odd One Out": "verbal", "Vocabulary": "verbal", "Logic": "verbal",
  "Main Idea": "reading", "Inference": "reading", "Vocabulary in Context": "reading",
  "Author's Purpose": "reading",
  "Barron's Group 1": "vocabulary", "Barron's Group 2": "vocabulary",
  "Barron's Group 3": "vocabulary", "Barron's Group 4": "vocabulary",
  "Barron's Group 5": "vocabulary", "Barron's Group 6": "vocabulary",
};

function ScoreBadge({ pct }: { pct: number }) {
  const color = pct >= 80 ? "text-green-600" : pct >= 60 ? "text-yellow-600" : "text-red-600";
  return <span className={`font-bold text-sm ${color}`}>{pct}%</span>;
}

function TimeBadge({ secs }: { secs: number }) {
  const color = secs <= 20 ? "text-green-600" : secs <= 35 ? "text-yellow-600" : "text-red-600";
  return <span className={`text-xs ${color}`}>{secs}s</span>;
}

interface SubjectSectionProps {
  category: Category;
  icon: string;
  color: string;
  barColor: string;
  catStat?: CategoryStats;
  subStats: SubcategoryStats[];
  onPractice: (cat: Category, sub?: string) => void;
}

function SubjectSection({ category, icon, color, barColor, catStat, subStats, onPractice }: SubjectSectionProps) {
  const [open, setOpen] = useState(true);

  if (!catStat) return null;

  return (
    <div className={`rounded-2xl border ${color} overflow-hidden mb-4`}>
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 cursor-pointer hover:brightness-95 transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="text-left">
            <div className="font-bold text-gray-800">{CATEGORY_LABELS[category]}</div>
            <div className="text-gray-500 text-xs">{catStat.total} questions attempted</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <ScoreBadge pct={catStat.percentage} />
            <div className="text-gray-400 text-xs">{catStat.correct}/{catStat.total}</div>
          </div>
          <div className="w-20 bg-white/60 rounded-full h-2.5 hidden sm:block">
            <div
              className={`${barColor} h-2.5 rounded-full`}
              style={{ width: `${catStat.percentage}%` }}
            />
          </div>
          <span className="text-gray-400 text-sm">{open ? "▲" : "▼"}</span>
        </div>
      </button>

      {/* Subtopics */}
      {open && subStats.length > 0 && (
        <div className="border-t border-white/60 divide-y divide-white/40">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-2 px-4 py-1.5 text-xs text-gray-400 font-medium">
            <span className="col-span-5">Topic</span>
            <span className="col-span-2 text-center">Score</span>
            <span className="col-span-2 text-center">Avg time</span>
            <span className="col-span-1 text-center">⏰</span>
            <span className="col-span-2 text-center"></span>
          </div>
          {subStats.map((s) => (
            <div key={s.subcategory} className="grid grid-cols-12 gap-2 items-center px-4 py-2.5 hover:bg-white/30 transition-colors">
              <span className="col-span-5 text-gray-700 text-sm font-medium truncate">{s.subcategory}</span>
              <span className="col-span-2 text-center"><ScoreBadge pct={s.percentage} /></span>
              <span className="col-span-2 text-center"><TimeBadge secs={s.avgTimeSecs} /></span>
              <span className="col-span-1 text-center text-xs text-red-400">
                {s.timedOutCount > 0 ? s.timedOutCount : "—"}
              </span>
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => onPractice(category, s.subcategory)}
                  className={`text-xs px-2 py-1 rounded-lg cursor-pointer font-medium transition-colors ${
                    s.percentage < 60
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-white/70 hover:bg-white text-gray-600"
                  }`}
                >
                  {s.percentage < 60 ? "Drill →" : "Practise"}
                </button>
              </div>
            </div>
          ))}
          {/* Practice whole subject */}
          <div className="px-4 py-3 flex justify-end">
            <button
              onClick={() => onPractice(category)}
              className="text-xs bg-white/70 hover:bg-white text-gray-600 rounded-lg px-3 py-1.5 cursor-pointer font-medium transition-colors"
            >
              Practise all {CATEGORY_LABELS[category]} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ onBack, onTargetedPractice }: Props) {
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

  // Weak areas across all subjects
  const weakAreas = subStats.filter((s) => s.total >= 2 && s.percentage < 60)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 5);

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-3xl mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-white/80 hover:text-white transition-colors cursor-pointer">
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Progress Dashboard</h1>
          <button onClick={handleClear} className="text-white/50 hover:text-red-300 text-sm transition-colors cursor-pointer">
            Reset
          </button>
        </div>

        {/* Overall summary */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">{overallPct}%</div>
              <div className="text-gray-500 text-sm">Overall Score</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-800">{totalAnswered}</div>
              <div className="text-gray-500 text-sm">Questions Done</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-800">{sessionCount}</div>
              <div className="text-gray-500 text-sm">Sessions</div>
            </div>
          </div>
        </div>

        {/* Top weak areas callout */}
        {weakAreas.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="font-bold text-red-700 mb-2 text-sm">🔴 Focus on these first</div>
            <div className="flex flex-wrap gap-2">
              {weakAreas.map((s) => {
                const cat = subCategoryToCategory[s.subcategory] ?? "mixed";
                return (
                  <button
                    key={s.subcategory}
                    onClick={() => onTargetedPractice(cat, s.subcategory)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs rounded-full px-3 py-1.5 cursor-pointer transition-colors font-medium"
                  >
                    {s.subcategory} ({s.percentage}%) →
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* No data state */}
        {catStats.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 mb-6">
            No data yet — complete some practice sessions first!
          </div>
        )}

        {/* Per-subject sections */}
        {SUBJECT_CONFIG.map(({ category, icon, color, barColor }) => {
          const catStat = catStats.find((s) => s.category === category);
          const subs = subStats.filter((s) => subCategoryToCategory[s.subcategory] === category);
          return (
            <SubjectSection
              key={category}
              category={category}
              icon={icon}
              color={color}
              barColor={barColor}
              catStat={catStat}
              subStats={subs}
              onPractice={onTargetedPractice}
            />
          );
        })}

        {/* Legend */}
        {totalAnswered > 0 && (
          <div className="bg-white/10 rounded-xl p-3 mb-6 flex flex-wrap gap-4 text-xs text-white/70">
            <span>Score: <span className="text-green-300">green ≥80%</span> · <span className="text-yellow-300">yellow ≥60%</span> · <span className="text-red-300">red &lt;60%</span></span>
            <span>Time: <span className="text-green-300">green ≤20s</span> · <span className="text-yellow-300">yellow ≤35s</span> · <span className="text-red-300">red &gt;35s</span></span>
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full bg-white/20 hover:bg-white/30 text-white rounded-2xl p-4 font-semibold transition-all cursor-pointer"
        >
          Start Practising
        </button>
      </div>
    </div>
  );
}
