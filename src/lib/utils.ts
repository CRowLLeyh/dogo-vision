import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type StatFormat = "decimal1" | "decimal2" | "percent0" | "int" | "auto";

export function formatStatValue(value: number, format: StatFormat = "auto") {
  if (!Number.isFinite(value)) return "-";

  switch (format) {
    case "int":
      return String(Math.round(value));
    case "percent0":
      return `${Math.round(value)}%`;
    case "decimal1":
      return (Math.round(value * 10) / 10).toFixed(1);
    case "decimal2":
      return (Math.round(value * 100) / 100).toFixed(2);
    case "auto":
    default: {
      // Avoid ugly float artifacts (e.g. 76.80000000000001)
      const rounded0 = Math.round(value);
      if (Math.abs(value - rounded0) < 1e-6) return String(rounded0);

      const rounded1 = Math.round(value * 10) / 10;
      return rounded1.toFixed(1);
    }
  }
}

