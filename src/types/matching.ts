import type { PatternTile, HandPattern, HandCategory } from './hand';
import type { Suit, TileCode } from './tile';
import type { SuitVariable } from './hand';

export interface TileMatch {
  patternTile: PatternTile;
  matchedWith: TileCode | null;
  isJokerSub: boolean;
}

export interface HandProgress {
  hand: HandPattern;
  category: HandCategory;
  matchedCount: number;
  totalRequired: number;
  percentage: number;
  tileMatches: TileMatch[];
  suitAssignment: Partial<Record<SuitVariable, Suit>>;
  unmatchedUserTiles: TileCode[];
  neededTiles: TileCode[];
}
