import { useMemo } from 'react';
import { useHandTrackerStore } from '../../stores/handTrackerStore';
import { CARD_2025 } from '../../data/card';
import { matchAllHands } from '../../lib/matching';
import { TileDisplay } from '../tiles/TileDisplay';
import { TileInputPanel } from './TileInputPanel';
import { MatchResultCard } from './MatchResultCard';
import { Trash2 } from 'lucide-react';

export function HandTrackerPage() {
  const { tiles, addTile, removeTile, clearHand } = useHandTrackerStore();

  const matches = useMemo(
    () => matchAllHands(tiles, CARD_2025.categories),
    [tiles]
  );

  const topMatches = useMemo(
    () => matches.filter((m) => m.percentage > 0),
    [matches]
  );

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Your Hand ({tiles.length}/14)
          </h2>
          {tiles.length > 0 && (
            <button
              onClick={clearHand}
              className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
            >
              <Trash2 size={14} />
              Clear
            </button>
          )}
        </div>

        {tiles.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">Tap tiles below to add them to your hand</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 flex flex-wrap gap-1.5 min-h-[60px]">
            {tiles.map((code, i) => (
              <TileDisplay
                key={`${i}-${code}`}
                code={code}
                size="md"
                onClick={() => removeTile(i)}
              />
            ))}
          </div>
        )}
        {tiles.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">Tap a tile to remove it</p>
        )}
      </div>

      <TileInputPanel onAdd={addTile} disabled={tiles.length >= 14} />

      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {topMatches.length > 0
            ? `Matching Hands (${topMatches.length})`
            : 'Matching Hands'}
        </h2>
        {tiles.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add tiles to see which hands you could be working toward.
          </p>
        ) : topMatches.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No matching hands found. Try adding more tiles.
          </p>
        ) : (
          <div className="space-y-3">
            {topMatches.map((progress) => (
              <MatchResultCard key={progress.hand.id} progress={progress} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
