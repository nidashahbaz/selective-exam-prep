import type { ReactNode } from "react";

// Renders a stacked fraction as inline HTML
function Fraction({ num, den }: { num: string; den: string }) {
  return (
    <span className="inline-flex flex-col items-center align-middle leading-none mx-0.5 text-[0.85em]">
      <span className="border-b border-current px-0.5 leading-tight">{num}</span>
      <span className="px-0.5 leading-tight">{den}</span>
    </span>
  );
}

// Converts:
//   - a/b (where a and b are numbers/simple expressions) → stacked fraction
//   - base^(exp) or base^exp → superscript
export function formatMath(text: string): ReactNode {
  // Match:
  //   - numeric/algebraic fractions: (optional coeff)(letters)(optional coeff) / same
  //     e.g. 3/4, 3x/5, 2AD/B, x/z, 17/12  — but NOT "km/h", "m²", "$3.2" style prose
  //   - superscripts: base^(exp) or base^exp
  // Guard: require at least one digit in numerator or denominator to avoid splitting prose like "km/h"
  const tokenRegex = /((?:\d+[a-zA-Z]*|[a-zA-Z]+\d*)(?:[+\-]\d+)?)\/((?:\d+[a-zA-Z]*|[a-zA-Z]+\d*)(?:[+\-]\d+)?)|(\^(?:\([^)]+\)|[\w\d+\-*/]+))/g;

  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    const num = match[1], den = match[2];
    // Skip if neither side has a digit (pure letter slash like km/h, m/s)
    if (num !== undefined && !/\d/.test(num) && !/\d/.test(den)) {
      continue;
    }
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }

    if (num !== undefined) {
      // fraction
      parts.push(<Fraction key={match.index} num={num} den={den} />);
    } else {
      // superscript
      const exp = match[3].slice(1).replace(/^\(|\)$/g, "");
      parts.push(
        <sup key={match.index} className="text-[0.7em] leading-none">
          {exp}
        </sup>
      );
    }

    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}
