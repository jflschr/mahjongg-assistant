import { memo } from 'react';
import type { HandProgress } from '../../types/matching';
import { TileGroupDisplay } from '../tiles/TileGroup';
import { ProgressBar } from '../shared/ProgressBar';
import { TileDisplay } from '../tiles/TileDisplay';
import clsx from 'clsx';

interface MatchResultCardProps {
  progress: HandProgress;
}

export const MatchResultCard = memo(function MatchResultCard({ progress }: MatchResultCardProps) {
  const { hand, category, percentage, matchedCount, totalRequired, neededTiles, suitAssignment } = progress;

  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-4 transition-all',
      percentage >= 80 ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/30' :
      percentage >= 50 ? 'border-yellow-200 dark:border-yellow-700' :
      'border-gray-200 dark:border-gray-700'
    )}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {category.name}
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{hand.name}</h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={clsx(
            'text-lg font-bold',
            percentage >= 80 ? 'text-emerald-600' :
            percentage >= 50 ? 'text-yellow-600' :
            'text-gray-400'
          )}>
            {percentage}%
          </span>
          <span className={clsx(
            'text-xs px-2 py-0.5 rounded-full font-medium',
            hand.value >= 40
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
              : hand.value === 30
              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          )}>
            {hand.value}pts
          </span>
        </div>
      </div>

      <ProgressBar percentage={percentage} className="mb-3" />

      <div className="flex flex-wrap gap-1.5 mb-2">
        {hand.groups.map((group, i) => (
          <TileGroupDisplay
            key={i}
            group={group}
            suitAssignment={suitAssignment}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{matchedCount}/{totalRequired} tiles matched</span>
        <div className="flex items-center gap-1">
          {!hand.jokerPermitted && (
            <span className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
              No Jokers
            </span>
          )}
          {hand.groups.some(g => g.exposure === 'concealed') && (
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
              Concealed
            </span>
          )}
        </div>
      </div>

      {neededTiles.length > 0 && neededTiles.length <= 6 && (
        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Need:</span>
          <span className="inline-flex gap-0.5">
            {neededTiles.filter(t => t !== '??').slice(0, 6).map((code, i) => (
              <TileDisplay key={i} code={code} size="sm" dimmed />
            ))}
          </span>
        </div>
      )}
    </div>
  );
});
