"use client";
import type { JSX } from "react";

const BL = "#3b82f6";
const BF = "#dbeafe";
const OR = "#f97316";
const OF = "#ffedd5";
const GR = "#374151";
const DIM = "#6b7280";
const GN = "#16a34a";
const GNF = "#dcfce7";
const PU = "#7c3aed";
const PUF = "#ede9fe";

function T(x: number, y: number, s: string, anchor: "middle" | "start" | "end" = "middle", size = 12, color = GR) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color} fontFamily="sans-serif">{s}</text>;
}
function Dim(x1: number, y1: number, x2: number, y2: number, label: string, offset = 14, labelSize = 11) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1);
  const lx = horiz ? mx : mx + offset;
  const ly = horiz ? my - offset + 6 : my;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={DIM} strokeWidth="1"/>
      <line x1={x1 - 3} y1={y1} x2={x1 + 3} y2={y1} stroke={DIM} strokeWidth="1"/>
      <line x1={x2 - 3} y1={y2} x2={x2 + 3} y2={y2} stroke={DIM} strokeWidth="1"/>
      {T(lx, ly, label, horiz ? "middle" : "start", labelSize)}
    </g>
  );
}
function Dash(x1: number, y1: number, x2: number, y2: number, color = DIM) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="5,3"/>;
}
function RA(x: number, y: number, s = 7, dir: "br" | "bl" | "tr" | "tl" = "br") {
  const [sx, sy] = dir === "br" ? [s, -s] : dir === "bl" ? [-s, -s] : dir === "tr" ? [s, s] : [-s, s];
  return <polyline points={`${x},${y + sy} ${x + sx},${y + sy} ${x + sx},${y}`} fill="none" stroke={GR} strokeWidth="1.5"/>;
}
function RegPoly(cx: number, cy: number, r: number, n: number, fill: string, stroke: string, startDeg = -90) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = ((i * 360 / n) + startDeg) * Math.PI / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth="2"/>;
}

const DIAGRAMS: Record<string, () => JSX.Element> = {

  /* ── mr-007: Rectangle 12 × 7 ─────────────────────────────────────── */
  "mr-007": () => (
    <svg viewBox="0 0 210 130" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="20" y="15" width="140" height="80" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(20, 105, 160, 105, "12 cm")}
      {Dim(168, 15, 168, 95, "7 cm", 14)}
    </svg>
  ),

  /* ── mr-008: Circle radius 7 ───────────────────────────────────────── */
  "mr-008": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="95" cy="82" r="68" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="95" cy="82" r="3" fill={BL}/>
      {Dash(95, 82, 163, 82, BL)}
      {T(129, 74, "r = 7 cm")}
    </svg>
  ),

  /* ── mr-009: Triangle base 10, height 6 ────────────────────────────── */
  "mr-009": () => (
    <svg viewBox="0 0 210 150" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="20,125 180,125 100,35" fill={OF} stroke={OR} strokeWidth="2"/>
      {Dim(20, 136, 180, 136, "10 cm")}
      {Dash(100, 35, 100, 125, OR)}
      {RA(100, 125, 7, "bl")}
      {T(116, 85, "6 cm", "start")}
    </svg>
  ),

  /* ── mr-036: Square perimeter 36 ───────────────────────────────────── */
  "mr-036": () => (
    <svg viewBox="0 0 190 155" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="40" y="15" width="105" height="105" fill={BF} stroke={BL} strokeWidth="2"/>
      {T(92, 138, "P = 36 cm")}
      {T(92, 68, "s = ?", "middle", 13)}
    </svg>
  ),

  /* ── mr-037: Triangle ratio 1:2:3 ──────────────────────────────────── */
  "mr-037": () => (
    <svg viewBox="0 0 210 150" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="20,128 185,128 185,28" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(185, 128, 8, "tl")}
      {T(30, 120, "30°", "start", 11)}
      {T(100, 142, "60°", "middle", 11)}
      {T(190, 38, "90°", "start", 11)}
    </svg>
  ),

  /* ── mr-043: Parallelogram 8×5 ─────────────────────────────────────── */
  "mr-043": () => (
    <svg viewBox="0 0 210 140" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="20,110 160,110 145,35 5,35" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(20, 121, 160, 121, "8 cm")}
      {Dash(20, 35, 20, 110)}
      {RA(20, 110, 7, "tr")}
      {T(35, 76, "5 cm", "start")}
    </svg>
  ),

  /* ── mr-061: Rectangular wall diagram ──────────────────────────────── */
  "mr-061": () => (
    <svg viewBox="0 0 220 140" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="15" y="15" width="175" height="100" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(15, 125, 190, 125, "43.2 m")}
      {Dim(200, 15, 200, 115, "29.1 m", 12)}
      {T(102, 68, "Area = ?", "middle", 13)}
    </svg>
  ),

  /* ── mr-072: Grid square 1.44 cm² ──────────────────────────────────── */
  "mr-072": () => (
    <svg viewBox="0 0 185 155" className="w-full max-w-xs mx-auto my-3 block">
      {[0,1,2,3].flatMap(col => [0,1,2].map(row => (
        <rect key={`${col}-${row}`} x={20 + col * 35} y={20 + row * 35} width="35" height="35"
          fill={col === 1 && row === 1 ? BF : "white"} stroke="#9ca3af" strokeWidth="1"/>
      )))}
      {T(72, 58, "1.44 cm²", "middle", 10)}
      {T(90, 120, "side = √1.44 = ?", "middle")}
    </svg>
  ),

  /* ── mr-073: Right triangle on grid 4×2 ────────────────────────────── */
  "mr-073": () => (
    <svg viewBox="0 0 220 175" className="w-full max-w-xs mx-auto my-3 block">
      {[0,1,2,3,4].flatMap(col => [0,1,2,3].map(row => (
        <rect key={`${col}-${row}`} x={15 + col * 35} y={15 + row * 35} width="35" height="35"
          fill="white" stroke="#d1d5db" strokeWidth="1"/>
      )))}
      <polygon points="15,155 155,155 15,85" fill={OF} stroke={OR} strokeWidth="2.5" fillOpacity="0.8"/>
      {T(85, 170, "4 squares", "middle")}
      {T(7, 120, "2", "middle")}
      {RA(15, 155, 7, "tr")}
    </svg>
  ),

  /* ── mr-074: Circle on grid, diameter 3 squares ─────────────────────── */
  "mr-074": () => (
    <svg viewBox="0 0 210 195" className="w-full max-w-xs mx-auto my-3 block">
      {[0,1,2,3,4].flatMap(col => [0,1,2,3,4].map(row => (
        <rect key={`${col}-${row}`} x={15 + col * 36} y={15 + row * 36} width="36" height="36"
          fill="white" stroke="#d1d5db" strokeWidth="1"/>
      )))}
      <circle cx="87" cy="87" r="54" fill={BF} stroke={BL} strokeWidth="2.5" fillOpacity="0.7"/>
      {Dash(33, 87, 141, 87, BL)}
      {T(87, 105, "3 squares", "middle", 11)}
    </svg>
  ),

  /* ── mr-080: Rectangular prism 2×5×7 ───────────────────────────────── */
  "mr-080": () => (
    <svg viewBox="0 0 210 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="45,50 110,50 110,120 45,120" fill={BF} stroke={BL} strokeWidth="2"/>
      <polygon points="45,50 110,50 132,34 67,34" fill="#93c5fd" stroke={BL} strokeWidth="2"/>
      <polygon points="110,50 132,34 132,104 110,120" fill="#bfdbfe" stroke={BL} strokeWidth="2"/>
      {T(77, 138, "5 cm")}
      {T(26, 86, "7 cm")}
      {T(140, 70, "2 cm", "start")}
    </svg>
  ),

  /* ── mr-083: Flag length = 3w ───────────────────────────────────────── */
  "mr-083": () => (
    <svg viewBox="0 0 210 120" className="w-full max-w-xs mx-auto my-3 block">
      <line x1="40" y1="5" x2="40" y2="115" stroke={GR} strokeWidth="2"/>
      <rect x="40" y="15" width="140" height="75" fill={BF} stroke={BL} strokeWidth="2"/>
      {T(175, 57, "w", "start")}
      {T(110, 106, "length = 3w")}
    </svg>
  ),

  /* ── mr-084: Flag P=32, w=4, l=12 ──────────────────────────────────── */
  "mr-084": () => (
    <svg viewBox="0 0 210 120" className="w-full max-w-xs mx-auto my-3 block">
      <line x1="40" y1="5" x2="40" y2="115" stroke={GR} strokeWidth="2"/>
      <rect x="40" y="20" width="130" height="70" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(178, 20, 178, 90, "4 cm", 14)}
      {Dim(40, 98, 170, 98, "12 cm")}
    </svg>
  ),

  /* ── mr-086: Isosceles right-angle triangle cut along axis ──────────── */
  "mr-086": () => (
    <svg viewBox="0 0 210 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,20 20,148 180,148" fill={OF} stroke={OR} strokeWidth="2"/>
      <line x1="100" y1="20" x2="100" y2="148" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4"/>
      <polyline points="88,33 100,33 100,20" fill="none" stroke={GR} strokeWidth="1.5"/>
      {T(32, 140, "45°", "start", 11)}
      {T(165, 140, "45°", "end", 11)}
      {T(100, 12, "90°", "middle", 11)}
      {T(100, 158, "axis of symmetry", "middle", 10)}
    </svg>
  ),

  /* ── mr-097: Compass directions (rotation) ──────────────────────────── */
  "mr-097": () => (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="100" r="78" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5"/>
      <line x1="100" y1="22" x2="100" y2="178" stroke="#e2e8f0" strokeWidth="1"/>
      <line x1="22" y1="100" x2="178" y2="100" stroke="#e2e8f0" strokeWidth="1"/>
      {T(100, 16, "N", "middle", 14)} {T(100, 192, "S", "middle", 14)}
      {T(194, 104, "E", "start", 14)} {T(6, 104, "W", "end", 14)}
      <defs>
        <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#ef4444"/>
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#16a34a"/>
        </marker>
      </defs>
      <line x1="100" y1="100" x2="100" y2="165" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed)"/>
      <line x1="100" y1="100" x2="100" y2="35" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrowGreen)"/>
      {T(118, 152, "Start: S", "start", 10)} {T(115, 48, "End: N", "start", 10)}
    </svg>
  ),

  /* ── mr-109: Two lines + transversal 91° & 123° ─────────────────────── */
  "mr-109": () => (
    <svg viewBox="0 0 210 160" className="w-full max-w-xs mx-auto my-3 block">
      <line x1="65" y1="10" x2="65" y2="150" stroke={GR} strokeWidth="1.5"/>
      <line x1="10" y1="35" x2="165" y2="98" stroke={GR} strokeWidth="1.5"/>
      <line x1="10" y1="128" x2="165" y2="98" stroke={GR} strokeWidth="1.5"/>
      <polygon points="65,45 165,98 65,120" fill={OF} stroke={OR} strokeWidth="1.5" fillOpacity="0.5"/>
      {T(76, 60, "91°", "start", 11)} {T(76, 118, "123°", "start", 11)} {T(148, 92, "x°", "start", 13)}
    </svg>
  ),

  /* ── mr-110: Circle 45% arc = 60 cm ─────────────────────────────────── */
  "mr-110": () => (
    <svg viewBox="0 0 200 180" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="95" r="72" fill={BF} stroke={BL} strokeWidth="2"/>
      <path d="M 100,23 A 72,72 0 0,1 122,163" fill="none" stroke="#2563eb" strokeWidth="7" strokeLinecap="round"/>
      {T(143, 78, "45% = 60 cm", "start", 11)} {T(50, 155, "60% = ?", "start", 11)}
    </svg>
  ),

  /* ── mr-113: Composite shape rect + triangle ─────────────────────────── */
  "mr-113": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="40" y="85" width="120" height="65" fill={BF} stroke={BL} strokeWidth="2"/>
      <polygon points="40,85 160,85 100,25" fill="#bfdbfe" stroke={BL} strokeWidth="2"/>
      {T(100, 122, "y (width)", "middle", 11)} {T(22, 120, "x", "middle", 13)} {T(170, 58, "z", "middle", 13)}
      {Dash(35, 85, 35, 150)} {Dash(165, 25, 165, 85)}
    </svg>
  ),

  /* ── mr-119: Square pyramid 18×12 ───────────────────────────────────── */
  "mr-119": () => (
    <svg viewBox="0 0 220 170" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="110,145 40,115 110,85 180,115" fill="#bfdbfe" stroke={BL} strokeWidth="1.5"/>
      <line x1="110" y1="145" x2="110" y2="30" stroke={BL} strokeWidth="1.5"/>
      <line x1="40" y1="115" x2="110" y2="30" stroke={BL} strokeWidth="1.5"/>
      <line x1="180" y1="115" x2="110" y2="30" stroke={BL} strokeWidth="1.5"/>
      <line x1="110" y1="85" x2="110" y2="30" stroke={BL} strokeWidth="1.5" strokeDasharray="5,3"/>
      {Dash(110, 30, 110, 115)}
      {RA(110, 115, 7, "br")}
      {T(75, 138, "18 cm", "middle", 11)} {T(122, 75, "12 cm", "start", 11)}
    </svg>
  ),

  /* ── mr-123: Trapezium parallel 14 & 26, height 16 ──────────────────── */
  "mr-123": () => (
    <svg viewBox="0 0 230 145" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="20,115 185,115 139,25 50,25" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(20, 126, 185, 126, "26 cm")}
      {T(94, 18, "14 cm")}
      {Dash(50, 25, 50, 115)}
      {RA(50, 115, 7, "tr")}
      {T(62, 73, "16 cm", "start")}
    </svg>
  ),

  /* ── mr-126: Pentagon interior angles 540° ───────────────────────────── */
  "mr-126": () => {
    return (
      <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
        {RegPoly(100, 88, 72, 5, OF, OR)}
        {T(100, 90, "108° each", "middle", 12)} {T(100, 105, "sum = 540°", "middle", 11)}
      </svg>
    );
  },

  /* ── mr-128: Transversal 53° & 101° ─────────────────────────────────── */
  "mr-128": () => (
    <svg viewBox="0 0 210 160" className="w-full max-w-xs mx-auto my-3 block">
      <line x1="65" y1="10" x2="65" y2="150" stroke={GR} strokeWidth="1.5"/>
      <line x1="10" y1="38" x2="165" y2="98" stroke={GR} strokeWidth="1.5"/>
      <line x1="10" y1="128" x2="165" y2="98" stroke={GR} strokeWidth="1.5"/>
      <polygon points="65,48 165,98 65,122" fill={OF} stroke={OR} strokeWidth="1.5" fillOpacity="0.5"/>
      {T(76, 63, "53°", "start", 11)} {T(76, 120, "101°", "start", 11)} {T(148, 92, "x°", "start", 13)}
    </svg>
  ),

  /* ── mr-130: Equilateral triangle cut along altitude ────────────────── */
  "mr-130": () => (
    <svg viewBox="0 0 210 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,18 15,150 185,150" fill={OF} stroke={OR} strokeWidth="2"/>
      <line x1="100" y1="18" x2="100" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4"/>
      {RA(100, 150, 7, "bl")}
      <polygon points="100,18 15,150 100,150" fill="#fde68a" fillOpacity="0.5"/>
      {T(100, 11, "60°", "middle", 11)} {T(22, 143, "60°", "start", 11)} {T(170, 143, "60°", "end", 11)}
      {T(72, 143, "30°", "end", 10)} {T(122, 143, "30°", "start", 10)}
    </svg>
  ),

  /* ── mr-133: Composite stepped shape ────────────────────────────────── */
  "mr-133": () => (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="20,17 92,17 92,53 155,53 155,100 20,100" fill={BF} stroke={BL} strokeWidth="2"/>
      <rect x="83" y="44" width="9" height="9" fill="white" stroke={BL} strokeWidth="1.5"/>
      {Dim(20, 110, 155, 110, "15 (bottom)")}
      {Dim(20, 6, 92, 6, "8 (top)")}
      {Dim(7, 17, 7, 100, "7", -2)}
      {Dim(162, 53, 162, 100, "3", 14)}
    </svg>
  ),

  /* ── mr-144: Semi-circle diameter 16 ────────────────────────────────── */
  "mr-144": () => (
    <svg viewBox="0 0 200 120" className="w-full max-w-xs mx-auto my-3 block">
      <path d="M 20,92 A 80,80 0 0,1 180,92" fill={BF} stroke={BL} strokeWidth="2"/>
      <line x1="20" y1="92" x2="180" y2="92" stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="92" r="3" fill={BL}/>
      {Dash(100, 92, 180, 92, BL)}
      {T(140, 87, "r = 8", "middle", 11)} {T(100, 108, "d = 16 cm")}
    </svg>
  ),

  /* ── mr-149: Parallel lines + transversal 25° ───────────────────────── */
  "mr-149": () => (
    <svg viewBox="0 0 220 170" className="w-full max-w-xs mx-auto my-3 block">
      <line x1="10" y1="50" x2="210" y2="50" stroke={GR} strokeWidth="1.5"/>
      <line x1="10" y1="130" x2="210" y2="130" stroke={GR} strokeWidth="1.5"/>
      {T(205, 46, "→", "end", 14)} {T(205, 126, "→", "end", 14)}
      <line x1="70" y1="15" x2="140" y2="165" stroke={GR} strokeWidth="1.5"/>
      <line x1="155" y1="50" x2="75" y2="130" stroke={GR} strokeWidth="1.5"/>
      <polygon points="88,50 155,50 115,130" fill={OF} stroke={OR} strokeWidth="1.5" fillOpacity="0.45"/>
      <polygon points="88,50 115,130 75,130" fill={BF} stroke={BL} strokeWidth="1.5" fillOpacity="0.45"/>
      {T(78, 44, "25°", "end", 11)} {T(138, 94, "x°", "start", 13)}
    </svg>
  ),

  /* ── mr-161: Cube 3×3×3 ─────────────────────────────────────────────── */
  "mr-161": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="50,55 115,55 115,120 50,120" fill={BF} stroke={BL} strokeWidth="2"/>
      <polygon points="50,55 115,55 136,34 71,34" fill="#93c5fd" stroke={BL} strokeWidth="2"/>
      <polygon points="115,55 136,34 136,99 115,120" fill="#bfdbfe" stroke={BL} strokeWidth="2"/>
      {T(82, 138, "3 cm")} {T(30, 88, "3 cm")} {T(144, 68, "3 cm", "start")}
    </svg>
  ),

  /* ── mr-168/169/170: Annulus outer r=5 inner r=3 ────────────────────── */
  "mr-168": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="88" r="78" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
      <circle cx="100" cy="88" r="46" fill="white" stroke="#4f46e5" strokeWidth="2"/>
      <circle cx="100" cy="88" r="3" fill="#4f46e5"/>
      {Dash(100, 88, 178, 88, "#4f46e5")}
      {T(139, 83, "OA = 5", "start", 11)}
      {Dash(100, 88, 100, 42, "#ef4444")}
      {T(104, 65, "OB = 3", "start", 11)}
      {T(100, 170, "shaded = annular region", "middle", 10)}
    </svg>
  ),
  "mr-169": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="88" r="78" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
      <circle cx="100" cy="88" r="46" fill={BF} stroke="#4f46e5" strokeWidth="2"/>
      <circle cx="100" cy="88" r="3" fill="#4f46e5"/>
      {Dash(100, 88, 100, 42, "#ef4444")}
      {T(104, 65, "r = 3", "start", 11)}
      {T(100, 170, "small circle area = ?", "middle", 10)}
    </svg>
  ),
  "mr-170": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="88" r="78" fill="#818cf8" stroke="#4f46e5" strokeWidth="2" fillOpacity="0.5"/>
      <circle cx="100" cy="88" r="46" fill="white" stroke="#4f46e5" strokeWidth="2"/>
      <circle cx="100" cy="88" r="3" fill="#4f46e5"/>
      {Dash(100, 88, 178, 88, "#4f46e5")}
      {T(139, 83, "5", "start", 11)}
      {Dash(100, 88, 100, 42, "#ef4444")}
      {T(104, 65, "3", "start", 11)}
      {T(100, 170, "shaded area = ?", "middle", 10)}
    </svg>
  ),

  /* ── mr-172: Octagon (8 matchsticks) ─────────────────────────────────── */
  "mr-172": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 88, 72, 8, OF, OR)}
      {T(100, 88, "8 sides", "middle", 13)} {T(100, 104, "= Octagon", "middle", 11)}
    </svg>
  ),

  /* ── mr-178: Pentagon interior angles sum ────────────────────────────── */
  "mr-178": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 88, 72, 5, OF, OR)}
      {T(100, 88, "5 sides", "middle", 13)} {T(100, 103, "sum = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-180: Two squares A > B ───────────────────────────────────────── */
  "mr-180": () => (
    <svg viewBox="0 0 220 160" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="15" y="20" width="100" height="100" fill={BF} stroke={BL} strokeWidth="2"/>
      <rect x="135" y="45" width="60" height="60" fill={GNF} stroke={GN} strokeWidth="2"/>
      {T(65, 132, "Square A", "middle", 11)} {T(165, 118, "Square B", "middle", 11)}
      {T(65, 75, "P = 2×P(B)", "middle", 12)}
    </svg>
  ),

  /* ── mr-195: Circle area ≈113 cm² ────────────────────────────────────── */
  "mr-195": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="85" r="72" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="85" r="3" fill={BL}/>
      {T(100, 85, "Area ≈ 113 cm²", "middle", 11)} {T(100, 100, "C = ?", "middle", 13)}
    </svg>
  ),

  /* ── mr-201: Right triangle DE=2 AE=3 ────────────────────────────────── */
  "mr-201": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="30,130 110,130 30,50" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(30, 130, 7, "tr")}
      {Dim(30, 140, 110, 140, "DE = 2 cm")}
      {Dim(14, 50, 14, 130, "AE = 3 cm", -10)}
      {T(105, 60, "A", "start")} {T(115, 134, "E", "start")} {T(22, 44, "A", "end")}
    </svg>
  ),

  /* ── mr-203/204: Isosceles trapezoid AB=4 DC=8 h=3 ──────────────────── */
  "mr-203": () => (
    <svg viewBox="0 0 220 140" className="w-full max-w-xs mx-auto my-3 block">
      {/* DC=8 bottom, AB=4 top, isosceles so equal overhang */}
      <polygon points="30,110 170,110 150,35 50,35" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(30, 122, 170, 122, "DC = 8 cm")}
      {T(100, 28, "AB = 4 cm")}
      {Dash(50, 35, 50, 110)}
      {RA(50, 110, 7, "tr")}
      {T(62, 75, "h = 3", "start")}
      {T(30, 33, "D", "end", 11)} {T(175, 33, "C", "start", 11)}
      {T(45, 123, "A", "end", 11)} {T(175, 123, "B", "start", 11)}
    </svg>
  ),
  "mr-204": () => (
    <svg viewBox="0 0 220 145" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="30,110 170,110 150,35 50,35" fill={BF} stroke={BL} strokeWidth="2"/>
      {/* E on DC at x=30+2*scale, scale=(170-30)/8=17.5, E at DE=2 → x=30+35=65 */}
      <polygon points="150,35 65,110 170,110" fill={OF} stroke={OR} strokeWidth="1.5" fillOpacity="0.6"/>
      {T(30, 32, "D", "end", 11)} {T(155, 32, "C", "start", 11)}
      {T(25, 118, "A", "end", 11)} {T(175, 118, "B", "start", 11)}
      {T(65, 120, "E", "middle", 11)}
      {T(140, 85, "△BEC", "middle", 11, OR)}
    </svg>
  ),

  /* ── mr-206: Quadrilateral angles 80°+70°+110°+x=360° ───────────────── */
  "mr-206": () => (
    <svg viewBox="0 0 210 170" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="40,140 170,140 185,45 20,60" fill={PUF} stroke={PU} strokeWidth="2"/>
      {T(28, 68, "80°", "start", 11)} {T(180, 50, "70°", "start", 11)}
      {T(162, 148, "110°", "end", 11)} {T(50, 148, "x°", "start", 14, OR)}
      {T(105, 100, "sum = 360°", "middle", 11)}
    </svg>
  ),

  /* ── mr-210: Pentagon diagonals ──────────────────────────────────────── */
  "mr-210": () => {
    const pts = Array.from({ length: 5 }, (_, i) => {
      const a = (i * 72 - 90) * Math.PI / 180;
      return [100 + 72 * Math.cos(a), 88 + 72 * Math.sin(a)] as [number, number];
    });
    const diags: JSX.Element[] = [];
    for (let i = 0; i < 5; i++)
      for (let j = i + 2; j < 5; j++)
        if (!(i === 0 && j === 4))
          diags.push(<line key={`${i}-${j}`} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]} stroke={OR} strokeWidth="1.5" strokeDasharray="4,3"/>);
    return (
      <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
        {RegPoly(100, 88, 72, 5, OF, OR)}
        {diags}
        {T(100, 160, "5 diagonals shown", "middle", 10)}
      </svg>
    );
  },

  /* ── mr-212: Rectangle area 20 ──────────────────────────────────────── */
  "mr-212": () => (
    <svg viewBox="0 0 220 140" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="20" y="25" width="160" height="80" fill={BF} stroke={BL} strokeWidth="2"/>
      {T(100, 73, "Area = 20 m²", "middle", 13)} {T(100, 120, "l × w = 20", "middle", 11)}
    </svg>
  ),

  /* ── mr-220/221: Cylinder r=3 h=10 ──────────────────────────────────── */
  "mr-220": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <ellipse cx="100" cy="35" rx="55" ry="15" fill="#bfdbfe" stroke={BL} strokeWidth="2"/>
      <rect x="45" y="35" width="110" height="110" fill={BF} stroke={BL} strokeWidth="0"/>
      <line x1="45" y1="35" x2="45" y2="145" stroke={BL} strokeWidth="2"/>
      <line x1="155" y1="35" x2="155" y2="145" stroke={BL} strokeWidth="2"/>
      <ellipse cx="100" cy="145" rx="55" ry="15" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="35" r="3" fill={BL}/>
      {Dash(100, 35, 155, 35, BL)}
      {T(127, 28, "r = 3", "start", 11)}
      {Dim(162, 35, 162, 145, "h = 10", 14)}
      {T(100, 163, "lateral SA = 2πrh", "middle", 10)}
    </svg>
  ),
  "mr-221": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <ellipse cx="100" cy="35" rx="55" ry="15" fill="#bfdbfe" stroke={BL} strokeWidth="2"/>
      <line x1="45" y1="35" x2="45" y2="145" stroke={BL} strokeWidth="2"/>
      <line x1="155" y1="35" x2="155" y2="145" stroke={BL} strokeWidth="2"/>
      <ellipse cx="100" cy="145" rx="55" ry="15" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dash(100, 35, 155, 35, BL)}
      {T(127, 28, "r = 3 cm", "start", 11)}
      {Dim(162, 35, 162, 145, "h = 10", 14)}
      {T(100, 163, "wrap = lateral SA", "middle", 10)}
    </svg>
  ),

  /* ── mr-224: Shapes with perpendicular diagonals ─────────────────────── */
  "mr-224": () => (
    <svg viewBox="0 0 220 120" className="w-full max-w-xs mx-auto my-3 block">
      {/* rhombus */}
      <polygon points="45,10 75,60 45,110 15,60" fill={GNF} stroke={GN} strokeWidth="2"/>
      <line x1="45" y1="10" x2="45" y2="110" stroke={GN} strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="15" y1="60" x2="75" y2="60" stroke={GN} strokeWidth="1" strokeDasharray="4,3"/>
      {RA(45, 60, 5, "br")}
      {T(45, 120, "rhombus", "middle", 10)}
      {/* kite */}
      <polygon points="155,10 195,60 155,100 115,60" fill={PUF} stroke={PU} strokeWidth="2"/>
      <line x1="155" y1="10" x2="155" y2="100" stroke={PU} strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="115" y1="60" x2="195" y2="60" stroke={PU} strokeWidth="1" strokeDasharray="4,3"/>
      {RA(155, 60, 5, "br")}
      {T(155, 112, "kite", "middle", 10)}
    </svg>
  ),

  /* ── mr-227/228/229: Isosceles triangle DAB, ∠ABC=120° ───────────────── */
  "mr-227": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      {/* B at bottom, A above-left, D above-right. AB=DA isosceles. C extends right of B */}
      <polygon points="60,140 100,40 160,140" fill={OF} stroke={OR} strokeWidth="2"/>
      {/* Tick marks AB=DA */}
      <line x1="72" y1="97" x2="78" y2="103" stroke={OR} strokeWidth="2"/>
      <line x1="128" y1="97" x2="122" y2="103" stroke={OR} strokeWidth="2"/>
      {/* Line DBC extended right */}
      <line x1="60" y1="140" x2="190" y2="140" stroke={GR} strokeWidth="1.5"/>
      {T(55, 152, "B", "middle", 12)} {T(55, 38, "A", "middle", 12)} {T(165, 152, "D/C", "middle", 12)}
      {T(100, 40, "A", "middle", 12, OR)}
      {T(68, 148, "120°", "start", 11)}
      {T(100, 160, "∠BAC = ?", "middle", 11)}
    </svg>
  ),
  "mr-228": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="60,140 100,40 160,140" fill={OF} stroke={OR} strokeWidth="2"/>
      <line x1="20" y1="140" x2="190" y2="140" stroke={GR} strokeWidth="1.5"/>
      {T(100, 36, "A", "middle", 12)} {T(55, 152, "B", "middle", 12)} {T(165, 152, "C", "middle", 12)}
      {T(68, 148, "120°", "start", 11)}
      {T(28, 148, "∠ABD=?", "start", 11, OR)}
    </svg>
  ),
  "mr-229": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="60,140 100,40 160,140" fill={OF} stroke={OR} strokeWidth="2"/>
      <line x1="20" y1="140" x2="190" y2="140" stroke={GR} strokeWidth="1.5"/>
      {/* diagonal AC */}
      <line x1="100" y1="40" x2="160" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3"/>
      {T(100, 36, "A", "middle", 12)} {T(55, 152, "B", "middle", 12)} {T(165, 152, "C", "middle", 12)}
      {T(68, 148, "120°", "start", 11)}
      {T(100, 160, "∠DAC = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-237: Circle circumference 62.8 cm → area ────────────────────── */
  "mr-237": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="85" r="72" fill={BF} stroke={BL} strokeWidth="2"/>
      {T(100, 82, "C = 62.8 cm", "middle", 12)} {T(100, 98, "Area = ?", "middle", 13)}
    </svg>
  ),

  /* ── mr-241/242/243/244: Isosceles triangle ADE, ∠ADE=∠AED=50° ──────── */
  "mr-241": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,25 30,140 170,140" fill={OF} stroke={OR} strokeWidth="2"/>
      {/* tick marks AD=AE */}
      <line x1="60" y1="77" x2="68" y2="83" stroke={OR} strokeWidth="2"/>
      <line x1="140" y1="77" x2="132" y2="83" stroke={OR} strokeWidth="2"/>
      {T(100,18,"A","middle",12)} {T(22,148,"D","middle",12)} {T(178,148,"E","middle",12)}
      {T(38,138,"50°","start",11)} {T(158,138,"50°","end",11)}
      {T(100,155,"∠DAE = ?","middle",11)}
    </svg>
  ),
  "mr-242": () => (
    <svg viewBox="0 0 220 175" className="w-full max-w-xs mx-auto my-3 block">
      {/* B below-left of D, line BDE straight */}
      <line x1="15" y1="140" x2="185" y2="140" stroke={GR} strokeWidth="1.5"/>
      <polygon points="100,25 60,140 170,140" fill={OF} stroke={OR} strokeWidth="2"/>
      <line x1="60" y1="140" x2="15" y2="140" stroke={GR} strokeWidth="1.5"/>
      {T(100,18,"A","middle",12)} {T(55,152,"D","middle",12)} {T(175,152,"E","middle",12)} {T(12,152,"B","middle",12)}
      {T(38,136,"30°","start",11)} {T(68,136,"50°","start",11)}
      {T(100,165,"∠ADB = ?","middle",11)}
    </svg>
  ),
  "mr-243": () => (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs mx-auto my-3 block">
      <line x1="15" y1="145" x2="200" y2="145" stroke={GR} strokeWidth="1.5"/>
      <polygon points="100,25 60,145 175,145" fill={OF} stroke={OR} strokeWidth="2"/>
      {/* AC line */}
      <line x1="100" y1="25" x2="175" y2="145" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3"/>
      {T(100,18,"A","middle",12)} {T(55,157,"D","middle",12)} {T(62,157,"","middle",12)}
      {T(55,157,"B","middle",12)} {T(180,157,"E/C","middle",12)}
      {T(38,141,"30°","start",10)} {T(68,141,"50°","start",10)}
      {T(100,170,"∠BAC = ?","middle",11)}
    </svg>
  ),
  "mr-244": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,25 60,145 140,145" fill={PUF} stroke={PU} strokeWidth="2"/>
      {/* tick marks BD=AD */}
      <line x1="72" y1="92" x2="80" y2="98" stroke={PU} strokeWidth="2"/>
      <line x1="128" y1="92" x2="120" y2="98" stroke={PU} strokeWidth="2"/>
      {T(100,18,"A","middle",12)} {T(52,155,"B","middle",12)} {T(145,155,"D","middle",12)}
      {T(100,160,"BD = AD → ?","middle",11)}
    </svg>
  ),

  /* ── mr-245/246: Square 4×4 and rectangle 2×6 ───────────────────────── */
  "mr-245": () => (
    <svg viewBox="0 0 220 145" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="15" y="25" width="80" height="80" fill={BF} stroke={BL} strokeWidth="2"/>
      {T(55, 120, "4m × 4m", "middle", 11)}
      <rect x="120" y="45" width="80" height="55" fill={GNF} stroke={GN} strokeWidth="2"/>
      {T(160, 120, "2m × 6m", "middle", 11)}
      {T(110, 135, "P₁ : P₂ = ?", "middle", 11)}
    </svg>
  ),
  "mr-246": () => (
    <svg viewBox="0 0 220 145" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="15" y="25" width="80" height="80" fill={BF} stroke={BL} strokeWidth="2"/>
      {T(55, 73, "4×4=16 m²", "middle", 11)}
      <rect x="120" y="45" width="80" height="55" fill={GNF} stroke={GN} strokeWidth="2"/>
      {T(160, 73, "2×6=12 m²", "middle", 11)}
      {T(110, 135, "Area ratio = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-252: Equilateral triangle ABC side 10 ───────────────────────── */
  "mr-252": () => (
    <svg viewBox="0 0 210 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,20 15,152 185,152" fill={OF} stroke={OR} strokeWidth="2"/>
      {Dim(15, 160, 185, 160, "10 cm")}
      {Dash(100, 20, 100, 152, OR)}
      {RA(100, 152, 7, "bl")}
      {T(10,160,"A","end",12)} {T(190,160,"B","start",12)} {T(100,13,"C","middle",12)}
      {T(105,95,"h","start",11)}
    </svg>
  ),

  /* ── mr-253: Triangular prism equilateral base 10, length 2 ─────────── */
  "mr-253": () => (
    <svg viewBox="0 0 220 170" className="w-full max-w-xs mx-auto my-3 block">
      {/* front equilateral triangle */}
      <polygon points="60,145 135,145 97,75" fill={OF} stroke={OR} strokeWidth="2"/>
      {/* back triangle offset */}
      <polygon points="80,115 155,115 117,45" fill="#fde68a" stroke={OR} strokeWidth="1.5" strokeDasharray="4,3"/>
      {/* connect front to back */}
      <line x1="60" y1="145" x2="80" y2="115" stroke={OR} strokeWidth="1.5"/>
      <line x1="135" y1="145" x2="155" y2="115" stroke={OR} strokeWidth="1.5"/>
      <line x1="97" y1="75" x2="117" y2="45" stroke={OR} strokeWidth="1.5"/>
      {Dim(60, 155, 135, 155, "10 cm")}
      {T(148, 132, "length = 2 cm", "start", 10)}
    </svg>
  ),

  /* ── mr-260/261: Circle radius 3 ────────────────────────────────────── */
  "mr-260": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="82" r="65" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="82" r="3" fill={BL}/>
      {Dash(100, 82, 165, 82, BL)}
      {T(132, 74, "r = 3 cm")} {T(100, 150, "C = 2πr = ?", "middle", 11)}
    </svg>
  ),
  "mr-261": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="82" r="65" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="82" r="3" fill={BL}/>
      {Dash(100, 82, 165, 82, BL)}
      {T(132, 74, "r = 3 cm")} {T(100, 150, "A = πr² = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-262/263: Equilateral triangle OAB side 3 ────────────────────── */
  "mr-262": () => (
    <svg viewBox="0 0 200 155" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,22 25,148 175,148" fill={OF} stroke={OR} strokeWidth="2"/>
      {Dim(25, 156, 175, 156, "3 cm")}
      {T(20,156,"O","end",12)} {T(180,156,"A","start",12)} {T(100,15,"B","middle",12)}
      {T(100,108,"equilateral","middle",10)}
    </svg>
  ),
  "mr-263": () => (
    <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,22 25,148 175,148" fill={OF} stroke={OR} strokeWidth="2"/>
      {Dash(100, 22, 100, 148, OR)}
      {RA(100, 148, 7, "bl")}
      {Dim(25, 156, 175, 156, "3 cm")}
      {T(20,156,"O","end",12)} {T(180,156,"A","start",12)} {T(100,15,"B","middle",12)}
      {T(100,145,"Area = (√3/4)s² = ?","middle",10)}
    </svg>
  ),

  /* ── mr-264: Triangle inscribed in circle ───────────────────────────── */
  "mr-264": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="88" r="72" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5"/>
      {/* equilateral triangle inscribed, vertices at 90°, 210°, 330° */}
      <polygon points="100,16 162,124 38,124" fill={OF} stroke={OR} strokeWidth="2"/>
      <circle cx="100" cy="88" r="3" fill="#64748b"/>
      <line x1="100" y1="88" x2="100" y2="16" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3"/>
      <line x1="100" y1="88" x2="38" y2="124" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,3"/>
      {T(100,8,"B","middle",12)} {T(32,134,"O","end",12)} {T(168,134,"A","start",12)}
      {T(100,170,"∠AOB = 60°, r = 3","middle",10)}
    </svg>
  ),

  /* ── mr-265: Shaded region sector minus triangle ────────────────────── */
  "mr-265": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="88" r="72" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
      {/* sector OAB 60° — from O(100,88) to A(38,124) and B(162,124) */}
      <path d="M 100,88 L 38,124 A 72,72 0 0,1 162,124 Z" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.5"/>
      {/* triangle inside sector */}
      <polygon points="100,88 38,124 162,124" fill={OF} stroke={OR} strokeWidth="1.5"/>
      <circle cx="100" cy="88" r="3" fill="#4f46e5"/>
      {T(100,88,"O","middle",11)} {T(32,134,"A","end",12)} {T(168,134,"B","start",12)}
      {T(100,155,"shaded = sector − triangle","middle",10)}
    </svg>
  ),

  /* ── mr-267: Regular nonagon each angle ─────────────────────────────── */
  "mr-267": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 88, 70, 9, OF, OR)}
      {T(100, 85, "9 sides", "middle", 12)} {T(100, 100, "each angle = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-270: Cube side 1 cm, total SA ───────────────────────────────── */
  "mr-270": () => (
    <svg viewBox="0 0 200 155" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="55,55 110,55 110,110 55,110" fill={BF} stroke={BL} strokeWidth="2"/>
      <polygon points="55,55 110,55 126,39 71,39" fill="#93c5fd" stroke={BL} strokeWidth="2"/>
      <polygon points="110,55 126,39 126,94 110,110" fill="#bfdbfe" stroke={BL} strokeWidth="2"/>
      {T(82,128,"1 cm")} {T(38,83,"1 cm")} {T(134,63,"1 cm","start")}
    </svg>
  ),

  /* ── mr-276: L-shaped cross-section ─────────────────────────────────── */
  "mr-276": () => (
    <svg viewBox="0 0 220 150" className="w-full max-w-xs mx-auto my-3 block">
      {/* Upper rect: x=25..75 y=15..55 (4×4 scaled) */}
      {/* Lower rect extending: x=25..90 y=55..120 (7×5 scaled at 13px/unit roughly) */}
      <polygon points="25,15 75,15 75,55 90,55 90,120 25,120" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dim(25,130,90,130,"bottom")}
      {Dim(7,15,7,120,"total h",-2)}
      {T(50,37,"4×4","middle",10)} {T(57,88,"2×5","middle",10)}
    </svg>
  ),

  /* ── mr-311: Nonagon interior angle sum ─────────────────────────────── */
  "mr-311": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 88, 70, 9, OF, OR)}
      {T(100, 85, "9 sides", "middle", 12)} {T(100, 100, "sum = (n−2)×180 = ?", "middle", 10)}
    </svg>
  ),

  /* ── mr-403: Circle radius +50% → area change ───────────────────────── */
  "mr-403": () => (
    <svg viewBox="0 0 210 160" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="65" cy="85" r="40" fill={BF} stroke={BL} strokeWidth="2"/>
      {Dash(65, 85, 105, 85, BL)}
      {T(85, 78, "r", "middle", 11)}
      <circle cx="155" cy="85" r="60" fill="#bfdbfe" stroke={BL} strokeWidth="2" fillOpacity="0.6"/>
      {Dash(155, 85, 215, 85, BL)}
      {T(185, 78, "1.5r", "middle", 11)}
      {T(65, 138, "original", "middle", 10)} {T(155, 152, "r × 150%", "middle", 10)}
    </svg>
  ),

  /* ── mr-411: Circle circumference formula ───────────────────────────── */
  "mr-411": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="85" r="68" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="85" r="3" fill={BL}/>
      {Dash(100, 85, 168, 85, BL)}
      {T(134, 78, "r", "middle", 12)}
      {T(100, 160, "C = 2πr = πd", "middle", 11)}
    </svg>
  ),

  /* ── mr-421: Hexagon angles ratio 2:3:5:5:2:3 ───────────────────────── */
  "mr-421": () => (
    <svg viewBox="0 0 200 175" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 90, 72, 6, PUF, PU)}
      {["A","B","C","D","E","F"].map((lbl, i) => {
        const a = (i * 60 - 90) * Math.PI / 180;
        return T(100 + 86 * Math.cos(a), 90 + 86 * Math.sin(a) + 4, lbl, "middle", 12, PU);
      })}
      {T(100, 90, "2:3:5:5:2:3", "middle", 11)}
      {T(100, 165, "∠A + ∠B = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-431: Triangle angle sets ────────────────────────────────────── */
  "mr-431": () => (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,25 25,135 175,135" fill={OF} stroke={OR} strokeWidth="2"/>
      {T(100,18,"?°","middle",13)} {T(22,143,"?°","start",13)} {T(172,143,"?°","end",13)}
      {T(100,155,"sum must = 180°","middle",10)}
    </svg>
  ),

  /* ── mr-435: Circle and square same perimeter ───────────────────────── */
  "mr-435": () => (
    <svg viewBox="0 0 220 145" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="60" cy="72" r="50" fill={BF} stroke={BL} strokeWidth="2"/>
      <rect x="130" y="22" width="75" height="75" fill={GNF} stroke={GN} strokeWidth="2"/>
      {T(60, 132, "circle", "middle", 11)} {T(168, 110, "square", "middle", 11)}
      {T(110, 140, "same perimeter → area ratio = ?", "middle", 10)}
    </svg>
  ),

  /* ── mr-473: Quadrilateral ratio 1:2:3:4 ────────────────────────────── */
  "mr-473": () => (
    <svg viewBox="0 0 210 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="40,140 170,140 185,45 20,60" fill={PUF} stroke={PU} strokeWidth="2"/>
      {T(28,68,"∠A","start",12,PU)} {T(180,50,"∠B","start",12)} {T(162,148,"∠C","end",12)} {T(50,148,"∠D","start",12)}
      {T(105,100,"1:2:3:4 → sum=360°","middle",10)}
    </svg>
  ),

  /* ── mr-506: Max obtuse angles in quadrilateral ─────────────────────── */
  "mr-506": () => (
    <svg viewBox="0 0 210 160" className="w-full max-w-xs mx-auto my-3 block">
      {/* quadrilateral with 3 obtuse angles */}
      <polygon points="30,130 180,130 190,55 20,45" fill={PUF} stroke={PU} strokeWidth="2"/>
      {T(22,50,"95°","start",11)} {T(182,50,"100°","start",11)} {T(170,138,"110°","end",11)} {T(38,138,"55°","start",11)}
      {T(105,100,"max obtuse = ?","middle",11)}
    </svg>
  ),

  /* ── mr-517: Circle diameter 12 cm ──────────────────────────────────── */
  "mr-517": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <circle cx="100" cy="85" r="68" fill={BF} stroke={BL} strokeWidth="2"/>
      <line x1="32" y1="85" x2="168" y2="85" stroke={BL} strokeWidth="1.5"/>
      <circle cx="100" cy="85" r="3" fill={BL}/>
      {T(100, 78, "d = 12 cm")} {T(100, 155, "A = π(d/2)² = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-568: Rectangular paddock 90m × ? m, area 0.45 ha ────────────── */
  "mr-568": () => (
    <svg viewBox="0 0 220 135" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="20" y="18" width="175" height="90" fill={GNF} stroke={GN} strokeWidth="2"/>
      {Dim(20, 118, 195, 118, "90 m")}
      {Dim(202, 18, 202, 108, "? m", 14)}
      {T(107, 68, "0.45 ha", "middle", 12)}
    </svg>
  ),

  /* ── mr-598: Octagon interior angle sum ─────────────────────────────── */
  "mr-598": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 88, 72, 8, OF, OR)}
      {T(100, 85, "8 sides", "middle", 12)} {T(100, 100, "sum = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-634: Isosceles MN=MO, ∠NMO=26°, find ∠MOP ─────────────────── */
  "mr-634": () => (
    <svg viewBox="0 0 220 165" className="w-full max-w-xs mx-auto my-3 block">
      {/* M at top, N bottom-left, O bottom-right, P extending right of O */}
      <polygon points="100,25 40,145 160,145" fill={OF} stroke={OR} strokeWidth="2"/>
      <line x1="40" y1="145" x2="195" y2="145" stroke={GR} strokeWidth="1.5"/>
      {/* tick marks MN=MO */}
      <line x1="64" y1="80" x2="72" y2="87" stroke={OR} strokeWidth="2"/>
      <line x1="136" y1="80" x2="128" y2="87" stroke={OR} strokeWidth="2"/>
      {T(100,17,"M","middle",12)} {T(32,155,"N","middle",12)} {T(163,155,"O","middle",12)} {T(200,155,"P","middle",12)}
      {T(100,35,"26°","middle",11)} {T(165,140,"∠MOP = ?","start",11,OR)}
    </svg>
  ),

  /* ── mr-638: Equilateral triangle perimeter 30 ──────────────────────── */
  "mr-638": () => (
    <svg viewBox="0 0 200 155" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,22 20,148 180,148" fill={OF} stroke={OR} strokeWidth="2"/>
      {T(100,148,"P = 30 cm","middle",13)} {T(100,108,"side = ?","middle",13)}
    </svg>
  ),

  /* ── mr-651/652: Cylinder top circle r=5 ────────────────────────────── */
  "mr-651": () => (
    <svg viewBox="0 0 200 115" className="w-full max-w-xs mx-auto my-3 block">
      <ellipse cx="100" cy="58" rx="80" ry="40" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="58" r="3" fill={BL}/>
      {Dash(100, 58, 180, 58, BL)}
      {T(140, 50, "r = 5", "middle", 12)} {T(100, 98, "C = 2πr = ?", "middle", 11)}
    </svg>
  ),
  "mr-652": () => (
    <svg viewBox="0 0 200 115" className="w-full max-w-xs mx-auto my-3 block">
      <ellipse cx="100" cy="58" rx="80" ry="40" fill={BF} stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="58" r="3" fill={BL}/>
      {Dash(100, 58, 180, 58, BL)}
      {T(140, 50, "r = 5", "middle", 12)} {T(100, 98, "A = πr² = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-655: Semi-circle diameter 10 ────────────────────────────────── */
  "mr-655": () => (
    <svg viewBox="0 0 200 120" className="w-full max-w-xs mx-auto my-3 block">
      <path d="M 25,90 A 75,75 0 0,1 175,90" fill={BF} stroke={BL} strokeWidth="2"/>
      <line x1="25" y1="90" x2="175" y2="90" stroke={BL} strokeWidth="2"/>
      <circle cx="100" cy="90" r="3" fill={BL}/>
      {Dash(100, 90, 175, 90, BL)}
      {T(137, 84, "r = 5", "middle", 11)} {T(100, 108, "d = 10 cm")}
    </svg>
  ),

  /* ── mr-663: Triangle ∠A = 2∠B ─────────────────────────────────────── */
  "mr-663": () => (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="60,130 175,130 100,25" fill={OF} stroke={OR} strokeWidth="2"/>
      {T(55,140,"A","middle",12)} {T(180,140,"B","middle",12)} {T(100,17,"C","middle",12)}
      {T(65,128,"2∠B","start",11,OR)} {T(162,128,"∠B","end",11)}
      {T(100,148,"∠A = 2∠B, find ∠B","middle",10)}
    </svg>
  ),

  /* ── mr-683/684/685/686: Right triangle ODA, OD=3, ∠DOA=60°, ∠ADO=90° */
  "mr-683": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      {/* O top-left, D bottom-left (right angle), A bottom-right */}
      <polygon points="35,35 35,140 150,140" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(35, 140, 8, "tr")}
      {Dim(14, 35, 14, 140, "OD = 3", -10)}
      {T(35,24,"O","middle",12)} {T(28,150,"D","middle",12)} {T(155,150,"A","middle",12)}
      {T(48,42,"60°","start",11)} {T(100,150,"AO = ?","middle",11)}
    </svg>
  ),
  "mr-684": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="35,35 35,140 150,140" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(35, 140, 8, "tr")}
      <circle cx="35" cy="35" r="45" fill="none" stroke={BL} strokeWidth="1.5" strokeDasharray="5,3"/>
      {Dim(14, 35, 14, 140, "r=OD=3", -12)}
      {T(35,24,"O","middle",12)} {T(28,150,"D","middle",12)} {T(155,150,"A","middle",12)}
      {T(100,150,"C = 2πr = ?","middle",10)}
    </svg>
  ),
  "mr-685": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="35,35 35,140 150,140" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(35, 140, 8, "tr")}
      {Dim(14, 35, 14, 140, "3", -10)}
      {Dim(35, 152, 150, 152, "3√3")}
      {T(100, 80, "AO = 6", "middle", 11)}
      {T(35,24,"O","middle",12)} {T(28,150,"D","middle",12)} {T(155,150,"A","middle",12)}
    </svg>
  ),
  "mr-686": () => (
    <svg viewBox="0 0 200 165" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="35,35 35,140 150,140" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(35, 140, 8, "tr")}
      {Dim(14, 35, 14, 140, "OD=3", -12)}
      {Dim(35, 152, 150, 152, "DA=3√3")}
      {T(35,24,"O","middle",12)} {T(28,150,"D","middle",12)} {T(155,150,"A","middle",12)}
      {T(100,105,"Area = ½·OD·DA","middle",10)}
    </svg>
  ),

  /* ── mr-692: Quadrilateral — perpendicular diagonals ────────────────── */
  "mr-692": () => (
    <svg viewBox="0 0 220 135" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="40,10 90,10 125,120 10,65" fill={PUF} stroke={PU} strokeWidth="2"/>
      {/* diagonals */}
      <line x1="40" y1="10" x2="125" y2="120" stroke={PU} strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="90" y1="10" x2="10" y2="65" stroke={PU} strokeWidth="1" strokeDasharray="4,3"/>
      {T(110,80,"not ⊥","middle",11,OR)}
      {T(110,128,"Which shape CANNOT have ⊥ diagonals?","middle",9)}
    </svg>
  ),

  /* ── mr-696: Land 300×200 in hectares ───────────────────────────────── */
  "mr-696": () => (
    <svg viewBox="0 0 220 130" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="15" y="15" width="185" height="90" fill={GNF} stroke={GN} strokeWidth="2"/>
      {Dim(15, 115, 200, 115, "300 m")}
      {Dim(208, 15, 208, 105, "200 m", 14)}
      {T(107, 65, "Area in hectares = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-697: Triangle side lengths ──────────────────────────────────── */
  "mr-697": () => (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="100,25 25,135 175,135" fill={OF} stroke={OR} strokeWidth="2"/>
      {T(100,18,"c","middle",13)} {T(22,143,"a","start",13)} {T(173,143,"b","end",13)}
      {T(100,148,"a + b > c ?","middle",11)}
    </svg>
  ),

  /* ── mr-699: Pentagon lines of symmetry ─────────────────────────────── */
  "mr-699": () => {
    const pts = Array.from({ length: 5 }, (_, i) => {
      const a = (i * 72 - 90) * Math.PI / 180;
      return [100 + 72 * Math.cos(a), 88 + 72 * Math.sin(a)] as [number, number];
    });
    return (
      <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
        {RegPoly(100, 88, 72, 5, OF, OR)}
        {pts.map(([x, y], i) => (
          <line key={i} x1={100} y1={88} x2={x} y2={y} stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3"/>
        ))}
        {T(100, 160, "lines of symmetry = ?", "middle", 11)}
      </svg>
    );
  },

  /* ── mr-700: Rectangle length +20%, width +30% → perimeter change ───── */
  "mr-700": () => (
    <svg viewBox="0 0 220 145" className="w-full max-w-xs mx-auto my-3 block">
      <rect x="15" y="20" width="100" height="70" fill={BF} stroke={BL} strokeWidth="2" strokeDasharray="5,3"/>
      <rect x="15" y="20" width="120" height="91" fill="#bfdbfe" stroke={BL} strokeWidth="2" fillOpacity="0.5"/>
      {T(65, 57, "original", "middle", 10)} {T(75, 125, "+20% l, +30% w", "middle", 10)}
      {T(110, 140, "P change = ?", "middle", 11)}
    </svg>
  ),

  /* ── mr-714: Triangle ratio 1:2:3 → find ∠B ────────────────────────── */
  "mr-714": () => (
    <svg viewBox="0 0 210 150" className="w-full max-w-xs mx-auto my-3 block">
      <polygon points="20,128 185,128 185,28" fill={OF} stroke={OR} strokeWidth="2"/>
      {RA(185, 128, 8, "tl")}
      {T(30, 120, "∠A=30°", "start", 11)} {T(100, 142, "∠B=60°", "middle", 11)} {T(190, 38, "∠C=90°", "start", 11)}
      {T(100, 60, "ratio 1:2:3", "middle", 13)}
    </svg>
  ),

  /* ── mr-743: Regular polygon, each angle 140° ───────────────────────── */
  "mr-743": () => (
    <svg viewBox="0 0 200 170" className="w-full max-w-xs mx-auto my-3 block">
      {RegPoly(100, 88, 72, 9, OF, OR)}
      {T(100, 85, "each angle", "middle", 11)} {T(100, 100, "= 140°", "middle", 13)} {T(100, 160, "n = ?", "middle", 12)}
    </svg>
  ),
};

export function getDiagram(id: string): JSX.Element | null {
  const fn = DIAGRAMS[id];
  return fn ? fn() : null;
}
