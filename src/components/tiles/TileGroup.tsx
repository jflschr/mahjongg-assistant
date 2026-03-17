import type { TileGroup as TileGroupType, PatternTile, SuitVariable } from '../../types/hand';
import type { Suit, TileCode } from '../../types/tile';
import { SUIT_CHAR } from '../../lib/tileUtils';
import { TileDisplay } from './TileDisplay';

interface TileGroupDisplayProps {
  group: TileGroupType;
  suitAssignment?: Partial<Record<SuitVariable, Suit>>;
}

function patternTileToCode(pt: PatternTile, assignment: Partial<Record<SuitVariable, Suit>>): TileCode {
  switch (pt.kind) {
    case 'flower': return 'fl';
    case 'joker': return 'jk';
    case 'suited': {
      const suit = assignment[pt.suitVar];
      if (!suit) {
        // Show placeholder based on suit variable
        const varColors: Record<SuitVariable, string> = { X: '1c', Y: '1d', Z: '1b' };
        const suitChar = { X: 'c', Y: 'd', Z: 'b' }[pt.suitVar];
        return `${pt.rank}${suitChar}`;
      }
      return `${pt.rank}${SUIT_CHAR[suit]}`;
    }
    case 'wind': {
      if (pt.wind === 'any') return 'wn'; // placeholder
      return `w${pt.wind.toLowerCase()}`;
    }
    case 'dragon': {
      if (pt.dragon === 'matchSuit') return 'dr'; // placeholder
      return `d${pt.dragon[0]}`;
    }
  }
}

export function TileGroupDisplay({ group, suitAssignment = {} }: TileGroupDisplayProps) {
  return (
    <div className="flex items-center gap-0.5">
      {group.exposure === 'concealed' && (
        <span className="text-xs text-gray-400 dark:text-gray-500 mr-0.5">[</span>
      )}
      {group.tiles.map((tile, i) => (
        <TileDisplay
          key={i}
          code={patternTileToCode(tile, suitAssignment)}
          size="sm"
        />
      ))}
      {group.exposure === 'concealed' && (
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-0.5">]</span>
      )}
    </div>
  );
}
