import { memo } from 'react';
import clsx from 'clsx';

function BamStick({ cx, cy, h, w, angle }: { cx: number; cy: number; h: number; w: number; angle?: number }) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  const transform = angle ? `rotate(${angle} ${cx} ${cy})` : undefined;
  return (
    <g transform={transform}>
      <rect x={x} y={y} width={w} height={h} rx={w / 2} fill="#15803d" />
      <ellipse cx={cx} cy={cy} rx={w * 0.75} ry={w * 0.4} fill="#166534" />
      <line x1={cx} y1={y + 1} x2={cx} y2={y + h - 1} stroke="#22c55e" strokeWidth={0.5} opacity={0.4} />
    </g>
  );
}

const CX = 50, CY = 70;

const STICK_W: Record<number, number> = { 2: 14, 3: 12, 4: 12, 5: 10, 6: 9, 7: 8, 8: 9, 9: 7 };
const STICK_H: Record<number, number> = { 2: 40, 3: 40, 4: 40, 5: 32, 6: 38, 7: 26, 8: 22, 9: 24 };

const POSITIONS: Record<number, [number, number][]> = {
  2: [[CX, CY - 25], [CX, CY + 25]],
  3: [[CX, CY - 26], [CX - 18, CY + 26], [CX + 18, CY + 26]],
  4: [[CX - 16, CY - 24], [CX + 16, CY - 24],
      [CX - 16, CY + 24], [CX + 16, CY + 24]],
  5: [[CX - 16, CY - 28], [CX + 16, CY - 28],
      [CX, CY],
      [CX - 16, CY + 28], [CX + 16, CY + 28]],
  6: [[CX - 18, CY - 24], [CX, CY - 24], [CX + 18, CY - 24],
      [CX - 18, CY + 24], [CX, CY + 24], [CX + 18, CY + 24]],
  7: [[CX, CY - 32],
      [CX - 18, CY + 0],  [CX, CY + 0],  [CX + 18, CY + 0],
      [CX - 18, CY + 26], [CX, CY + 26], [CX + 18, CY + 26]],
  8: [],
  9: [[CX - 22, CY - 28], [CX, CY - 28], [CX + 22, CY - 28],
      [CX - 22, CY],      [CX, CY],      [CX + 22, CY],
      [CX - 22, CY + 28], [CX, CY + 28], [CX + 22, CY + 28]],
};

export const BamPattern = memo(function BamPattern({ count, size }: { count: number; size: 'sm' | 'md' | 'lg' }) {
  if (count === 1) {
    const fontSize = { sm: 'text-sm', md: 'text-lg', lg: 'text-xl' }[size];
    return <span className={clsx(fontSize)}>🐦</span>;
  }

  const w = { sm: 24, md: 36, lg: 44 }[size];
  const h = { sm: 34, md: 50, lg: 60 }[size];

  // Special case: 8-bam — W on top + M on bottom
  if (count === 8) {
    const sw = 7;
    const sh = 38;
    const topY = CY - 28;
    const botY = CY + 28;
    return (
      <svg width={w} height={h} viewBox="0 0 100 140" className="-my-1">
        {/* W top: outer sticks vertical, inner sticks angled inward */}
        <BamStick cx={CX - 24} cy={topY} h={sh} w={sw} />
        <BamStick cx={CX - 8}  cy={topY} h={sh} w={sw} angle={40} />
        <BamStick cx={CX + 8}  cy={topY} h={sh} w={sw} angle={-40} />
        <BamStick cx={CX + 24} cy={topY} h={sh} w={sw} />
        {/* M bottom: outer sticks vertical, inner sticks angled inward */}
        <BamStick cx={CX - 24} cy={botY} h={sh} w={sw} />
        <BamStick cx={CX - 8}  cy={botY} h={sh} w={sw} angle={-40} />
        <BamStick cx={CX + 8}  cy={botY} h={sh} w={sw} angle={40} />
        <BamStick cx={CX + 24} cy={botY} h={sh} w={sw} />
      </svg>
    );
  }

  const sticks = POSITIONS[count] || [];
  return (
    <svg width={w} height={h} viewBox="0 0 100 140" className="-my-1">
      {sticks.map(([x, y], i) => (
        <BamStick key={i} cx={x} cy={y} h={STICK_H[count]} w={STICK_W[count]} />
      ))}
    </svg>
  );
});
