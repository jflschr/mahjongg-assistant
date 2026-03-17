import { memo, type ReactNode } from 'react';
import { parseTileCode } from '../../lib/tileUtils';
import type { TileCode } from '../../types/tile';
import { DotPattern } from './patterns/DotPattern';
import { BamPattern } from './patterns/BamPattern';
import clsx from 'clsx';

interface TileDisplayProps {
  code: TileCode;
  size?: 'sm' | 'md' | 'lg';
  dimmed?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
}

const CRAK_CHARS: Record<number, string> = {
  1: '一', 2: '二', 3: '三', 4: '四', 5: '五',
  6: '六', 7: '七', 8: '八', 9: '九',
};

const WIND_CHARS: Record<string, string> = {
  N: '北', E: '東', W: '西', S: '南',
};

function getTileContent(code: TileCode, size: 'sm' | 'md' | 'lg'): { content: ReactNode; border: string } {
  const val = parseTileCode(code);
  if (!val) return { content: '?', border: 'border-gray-300' };

  switch (val.kind) {
    case 'suited': {
      switch (val.suit) {
        case 'crak': {
          const charSize = { sm: 'text-sm', md: 'text-lg', lg: 'text-xl' }[size];
          const wanSize = { sm: 'text-[8px]', md: 'text-[11px]', lg: 'text-sm' }[size];
          const numSize = { sm: 'text-[6px]', md: 'text-[7px]', lg: 'text-[8px]' }[size];
          return {
            content: (
              <div className="flex flex-col items-center leading-none">
                <span className={clsx(charSize, 'text-gray-900 font-bold')}>{CRAK_CHARS[val.rank]}</span>
                <span className={clsx(wanSize, 'text-red-600 font-bold -mt-0.5')}>萬</span>
                <span className={clsx(numSize, 'text-gray-400 font-semibold')}>{val.rank}</span>
              </div>
            ),
            border: 'border-emerald-700/30',
          };
        }
        case 'dot': {
          const numSize = { sm: 'text-[6px]', md: 'text-[7px]', lg: 'text-[8px]' }[size];
          return {
            content: (
              <div className="flex flex-col items-center leading-none">
                <DotPattern count={val.rank} size={size} />
                <span className={clsx(numSize, 'text-gray-400 font-semibold')}>{val.rank}</span>
              </div>
            ),
            border: 'border-emerald-700/30',
          };
        }
        case 'bam': {
          const numSize = { sm: 'text-[6px]', md: 'text-[7px]', lg: 'text-[8px]' }[size];
          return {
            content: (
              <div className="flex flex-col items-center leading-none">
                <BamPattern count={val.rank} size={size} />
                <span className={clsx(numSize, 'text-gray-400 font-semibold')}>{val.rank}</span>
              </div>
            ),
            border: 'border-emerald-700/30',
          };
        }
      }
      break;
    }
    case 'wind': {
      const charSize = { sm: 'text-sm', md: 'text-xl', lg: 'text-2xl' }[size];
      const labelSize = { sm: 'text-[6px]', md: 'text-[8px]', lg: 'text-[9px]' }[size];
      const labels: Record<string, string> = { N: 'N', E: 'E', W: 'W', S: 'S' };
      return {
        content: (
          <div className="flex flex-col items-center leading-none">
            <span className={clsx(charSize, 'text-gray-900 font-bold')}>{WIND_CHARS[val.wind]}</span>
            <span className={clsx(labelSize, 'text-gray-400 font-semibold')}>{labels[val.wind]}</span>
          </div>
        ),
        border: 'border-emerald-700/30',
      };
    }
    case 'dragon': {
      const charSize = { sm: 'text-base', md: 'text-2xl', lg: 'text-3xl' }[size];
      if (val.dragon === 'red') {
        return {
          content: <span className={clsx(charSize, 'text-red-600 font-black')}>中</span>,
          border: 'border-emerald-700/30',
        };
      }
      if (val.dragon === 'green') {
        return {
          content: <span className={clsx(charSize, 'text-green-700 font-black')}>發</span>,
          border: 'border-emerald-700/30',
        };
      }
      return {
        content: (
          <div className={clsx(
            'rounded-sm border-2 border-blue-300',
            { sm: 'w-4 h-5', md: 'w-5 h-7', lg: 'w-7 h-9' }[size],
          )} />
        ),
        border: 'border-emerald-700/30',
      };
    }
    case 'flower': {
      const charSize = { sm: 'text-sm', md: 'text-xl', lg: 'text-2xl' }[size];
      return {
        content: <span className={charSize}>🌸</span>,
        border: 'border-pink-300',
      };
    }
    case 'joker': {
      const charSize = { sm: 'text-sm', md: 'text-xl', lg: 'text-2xl' }[size];
      return {
        content: <span className={charSize}>🃏</span>,
        border: 'border-purple-300',
      };
    }
  }
  return { content: '?', border: 'border-gray-300' };
}

const sizes = {
  sm: 'w-7 h-10',
  md: 'w-10 h-14',
  lg: 'w-12 h-16',
};

export const TileDisplay = memo(function TileDisplay({ code, size = 'md', dimmed, highlighted, onClick }: TileDisplayProps) {
  const { content, border } = getTileContent(code, size);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={clsx(
        'rounded-md border-2 flex items-center justify-center transition-all',
        'bg-gradient-to-b from-[#f5f0e8] via-white to-[#ebe6dc]',
        'shadow-[0_2px_4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]',
        border,
        sizes[size],
        dimmed && 'opacity-30',
        highlighted && 'ring-2 ring-emerald-500 ring-offset-1',
        onClick ? 'cursor-pointer hover:scale-105 hover:shadow-md active:scale-95 active:shadow-sm' : 'cursor-default',
      )}
    >
      {content}
    </button>
  );
});
