import type { HandPattern } from '../../types/hand';
import { TileGroupDisplay } from '../tiles/TileGroup';
import clsx from 'clsx';

interface HandCardProps {
  hand: HandPattern;
}

export function HandCard({ hand }: HandCardProps) {
  const isConcealed = hand.groups.every((g) => g.exposure === 'concealed');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{hand.name}</h3>
          {hand.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{hand.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={clsx(
              'text-xs px-2 py-0.5 rounded-full font-medium',
              hand.value >= 40
                ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                : hand.value === 30
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            )}
          >
            {hand.value}pts
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {hand.groups.map((group, i) => (
          <TileGroupDisplay key={i} group={group} />
        ))}
      </div>

      <div className="mt-2 flex gap-1.5">
        {!hand.jokerPermitted && (
          <span className="bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
            No Jokers
          </span>
        )}
        {isConcealed && (
          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-[10px] font-medium">
            Concealed
          </span>
        )}
      </div>
    </div>
  );
}
