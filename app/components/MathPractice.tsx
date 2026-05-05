"use client";

import { useMemo } from "react";
import { questions } from "@/app/data/questions";
import { type SubcategoryStats } from "@/app/lib/progress";
import { type Category } from "@/app/data/questions";

interface Props {
  subStats: SubcategoryStats[];
  onStartTopic: (subcategory: string) => void;
  onStartAll: () => void;
  onBack: () => void;
}

// Topic groups for the math practice section
const TOPIC_GROUPS: { label: string; icon: string; color: string; topics: string[] }[] = [
  {
    label: "Numbers & Operations",
    icon: "🔢",
    color: "bg-blue-50 border-blue-200",
    topics: [
      "Number Theory",
      "Fractions",
      "Percentages & Discounts",
      "Simple Interest",
      "Ratios",
    ],
  },
  {
    label: "Algebra",
    icon: "📐",
    color: "bg-purple-50 border-purple-200",
    topics: [
      "Algebra",
      "Factorisation",
      "Exponents & Surds",
      "Coordinate Geometry",
      "Venn Diagrams",
    ],
  },
  {
    label: "Geometry & Measurement",
    icon: "📏",
    color: "bg-green-50 border-green-200",
    topics: [
      "Area & Perimeter",
      "Volume",
      "Angles",
      "Pythagoras & Trigonometry",
    ],
  },
  {
    label: "Data & Chance",
    icon: "📊",
    color: "bg-orange-50 border-orange-200",
    topics: [
      "Statistics",
      "Probability",
    ],
  },
  {
    label: "Applied Maths",
    icon: "⚡",
    color: "bg-rose-50 border-rose-200",
    topics: [
      "Rates & Speed",
    ],
  },
];

function difficultyBar(easy: number, medium: number, hard: number) {
  const total = easy + medium + hard;
  if (total === 0) return null;
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden gap-px mt-2">
      {easy > 0 && <div className="bg-green-400" style={{ width: `${(easy / total) * 100}%` }} />}
      {medium > 0 && <div className="bg-yellow-400" style={{ width: `${(medium / total) * 100}%` }} />}
      {hard > 0 && <div className="bg-red-400" style={{ width: `${(hard / total) * 100}%` }} />}
    </div>
  );
}

export default function MathPractice({ subStats, onStartTopic, onStartAll, onBack }: Props) {
  // Count questions per subcategory from the question bank
  const questionCounts = useMemo(() => {
    const map: Record<string, { total: number; easy: number; medium: number; hard: number }> = {};
    for (const q of questions) {
      if (q.category !== "mathematics") continue;
      if (!map[q.subcategory]) map[q.subcategory] = { total: 0, easy: 0, medium: 0, hard: 0 };
      map[q.subcategory].total++;
      map[q.subcategory][q.difficulty]++;
    }
    return map;
  }, []);

  const totalMathQuestions = Object.values(questionCounts).reduce((s, v) => s + v.total, 0);

  // Collect all topics that exist in the bank (in case new ones were added not in TOPIC_GROUPS)
  const groupedTopics = new Set(TOPIC_GROUPS.flatMap((g) => g.topics));
  const ungrouped = Object.keys(questionCounts).filter((t) => !groupedTopics.has(t));

  const allGroups =
    ungrouped.length > 0
      ? [
          ...TOPIC_GROUPS,
          { label: "Other", icon: "📌", color: "bg-gray-50 border-gray-200", topics: ungrouped },
        ]
      : TOPIC_GROUPS;

  function getStats(topic: string) {
    return subStats.find((s) => s.subcategory === topic);
  }

  function scoreBadge(pct: number) {
    const color = pct >= 80 ? "text-green-600 bg-green-100" : pct >= 60 ? "text-yellow-700 bg-yellow-100" : "text-red-600 bg-red-100";
    return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>{pct}%</span>;
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm">
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">📐 Math Practice</h1>
          <div className="text-white/60 text-sm">{totalMathQuestions} Qs</div>
        </div>

        {/* Practise all button */}
        <button
          onClick={onStartAll}
          className="w-full bg-white text-indigo-700 font-bold rounded-2xl p-4 mb-6 shadow-lg hover:bg-indigo-50 transition-colors cursor-pointer flex items-center justify-between"
        >
          <div>
            <div className="text-base font-bold">Practise All Topics</div>
            <div className="text-sm text-indigo-400 font-normal">Random mix from all {totalMathQuestions} questions</div>
          </div>
          <span className="text-2xl">→</span>
        </button>

        {/* Topic groups */}
        {allGroups.map((group) => {
          const topicsWithQuestions = group.topics.filter((t) => questionCounts[t]);
          if (topicsWithQuestions.length === 0) return null;

          return (
            <div key={group.label} className={`rounded-2xl border ${group.color} overflow-hidden mb-4`}>
              <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                <span className="text-xl">{group.icon}</span>
                <span className="font-bold text-gray-800">{group.label}</span>
              </div>
              <div className="divide-y divide-white/60">
                {topicsWithQuestions.map((topic) => {
                  const counts = questionCounts[topic];
                  const stats = getStats(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => onStartTopic(topic)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/40 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 text-sm">{topic}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400">{counts.total} questions</span>
                          <span className="text-xs text-gray-300 hidden sm:block">
                            <span className="text-green-500">{counts.easy}e</span>{" "}
                            <span className="text-yellow-500">{counts.medium}m</span>{" "}
                            <span className="text-red-500">{counts.hard}h</span>
                          </span>
                        </div>
                        {difficultyBar(counts.easy, counts.medium, counts.hard)}
                      </div>
                      <div className="flex items-center gap-3 ml-4 shrink-0">
                        {stats ? (
                          <>
                            {scoreBadge(stats.percentage)}
                            <span className="text-xs text-gray-400">{stats.total} done</span>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">Not started</span>
                        )}
                        <span className="text-gray-300 text-sm">›</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Difficulty legend */}
        <div className="flex items-center gap-4 text-xs text-white/60 mt-2 mb-6">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Easy</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Medium</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Hard</span>
        </div>
      </div>
    </div>
  );
}
