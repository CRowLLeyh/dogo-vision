export type MultikillCount = 2 | 3 | 4 | 5;

const multikillLabelsPt: Record<MultikillCount, string> = {
  2: "DOUBLE KILL",
  3: "TRIPLE KILL",
  4: "QUADRA KILL",
  5: "PENTAKILL",
};

const multikillTooltipPt: Record<MultikillCount, string> = {
  2: "Double Kill = 2 abates rápidos",
  3: "Triple Kill = 3 abates rápidos",
  4: "Quadra Kill = 4 abates rápidos",
  5: "Pentakill = 5 abates rápidos",
};

export function getMultikillLabelPt(largestMultikill?: number): string | undefined {
  if (!largestMultikill || largestMultikill < 2) return undefined;
  return multikillLabelsPt[largestMultikill as MultikillCount];
}

export function getMultikillTooltipPt(largestMultikill?: number): string | undefined {
  if (!largestMultikill || largestMultikill < 2) return undefined;
  return multikillTooltipPt[largestMultikill as MultikillCount];
}
