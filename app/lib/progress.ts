import { Category } from "@/app/data/questions";

export interface QuestionResult {
  questionId: string;
  category: Category;
  subcategory: string;
  correct: boolean;
  timeTaken: number; // seconds
  timestamp: number;
}

export interface SessionSummary {
  id: string;
  date: number;
  category: Category | "mixed";
  totalQuestions: number;
  correct: number;
  timeTaken: number;
}

const RESULTS_KEY = "exam_results";
const SESSIONS_KEY = "exam_sessions";

export function saveResult(result: QuestionResult): void {
  const existing = getResults();
  existing.push(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(existing));
}

export function getResults(): QuestionResult[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(RESULTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveSession(session: SessionSummary): void {
  const existing = getSessions();
  existing.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(existing));
}

export function getSessions(): SessionSummary[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearProgress(): void {
  localStorage.removeItem(RESULTS_KEY);
  localStorage.removeItem(SESSIONS_KEY);
}

export interface CategoryStats {
  category: Category;
  total: number;
  correct: number;
  percentage: number;
}

export interface SubcategoryStats {
  subcategory: string;
  total: number;
  correct: number;
  percentage: number;
}

export function getCategoryStats(results: QuestionResult[]): CategoryStats[] {
  const map: Record<string, { total: number; correct: number }> = {};
  for (const r of results) {
    if (!map[r.category]) map[r.category] = { total: 0, correct: 0 };
    map[r.category].total++;
    if (r.correct) map[r.category].correct++;
  }
  return Object.entries(map).map(([category, stats]) => ({
    category: category as Category,
    ...stats,
    percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
  }));
}

export function getSubcategoryStats(results: QuestionResult[]): SubcategoryStats[] {
  const map: Record<string, { total: number; correct: number }> = {};
  for (const r of results) {
    if (!map[r.subcategory]) map[r.subcategory] = { total: 0, correct: 0 };
    map[r.subcategory].total++;
    if (r.correct) map[r.subcategory].correct++;
  }
  return Object.entries(map)
    .map(([subcategory, stats]) => ({
      subcategory,
      ...stats,
      percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }))
    .sort((a, b) => a.percentage - b.percentage);
}
