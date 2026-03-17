import { memo } from 'react';

function DotCircle({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#2563eb" />
      <circle cx={cx} cy={cy} r={r * 0.65} fill="white" />
      <circle cx={cx} cy={cy} r={r * 0.3} fill="#1e40af" />
    </g>
  );
}

const CX = 50, CY = 70;

const RADII: Record<number, number> = {
  1: 28, 2: 20, 3: 17, 4: 16, 5: 14, 6: 13, 7: 11, 8: 11, 9: 10,
};

const POSITIONS: Record<number, [number, number][]> = {
  1: [[CX, CY]],
  2: [[CX, CY - 22], [CX, CY + 22]],
  3: [[CX - 18, CY - 22], [CX, CY], [CX + 18, CY + 22]],
  4: [[CX - 17, CY - 18], [CX + 17, CY - 18],
      [CX - 17, CY + 18], [CX + 17, CY + 18]],
  5: [[CX - 18, CY - 22], [CX + 18, CY - 22],
      [CX, CY],
      [CX - 18, CY + 22], [CX + 18, CY + 22]],
  6: [[CX - 16, CY - 28], [CX + 16, CY - 28],
      [CX - 16, CY],      [CX + 16, CY],
      [CX - 16, CY + 28], [CX + 16, CY + 28]],
  7: [[CX - 22, CY - 34], [CX, CY - 24], [CX + 22, CY - 14],
      [CX - 14, CY + 10], [CX + 14, CY + 10],
      [CX - 14, CY + 34], [CX + 14, CY + 34]],
  8: [[CX - 15, CY - 36], [CX + 15, CY - 36],
      [CX - 15, CY - 12], [CX + 15, CY - 12],
      [CX - 15, CY + 12], [CX + 15, CY + 12],
      [CX - 15, CY + 36], [CX + 15, CY + 36]],
  9: [[CX - 22, CY - 26], [CX, CY - 26], [CX + 22, CY - 26],
      [CX - 22, CY],      [CX, CY],      [CX + 22, CY],
      [CX - 22, CY + 26], [CX, CY + 26], [CX + 22, CY + 26]],
};

export const DotPattern = memo(function DotPattern({ count, size }: { count: number; size: 'sm' | 'md' | 'lg' }) {
  const w = { sm: 24, md: 36, lg: 44 }[size];
  const h = { sm: 34, md: 50, lg: 60 }[size];

  const dots = POSITIONS[count] || [];
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="-my-1">
      {dots.map(([x, y], i) => (
        <DotCircle key={i} cx={x} cy={y} r={RADII[count]} />
      ))}
    </svg>
  );
});
