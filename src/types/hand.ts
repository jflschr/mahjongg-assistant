import type { Wind, Dragon, SuitRank } from './tile';

export type SuitVariable = 'X' | 'Y' | 'Z';
export type ExposureType = 'concealed' | 'exposed';

export type PatternTile =
  | { kind: 'suited'; suitVar: SuitVariable; rank: SuitRank }
  | { kind: 'wind'; wind: Wind | 'any' }
  | { kind: 'dragon'; dragon: Dragon | 'matchSuit' }
  | { kind: 'flower' }
  | { kind: 'joker' };

export interface TileGroup {
  tiles: PatternTile[];
  exposure: ExposureType;
}

export interface HandPattern {
  id: string;
  name: string;
  groups: TileGroup[];
  value: 25 | 30 | 40 | 45 | 50;
  jokerPermitted: boolean;
  description?: string;
}

export interface HandCategory {
  id: string;
  name: string;
  hands: HandPattern[];
}

export interface CardYear {
  year: number;
  categories: HandCategory[];
}
