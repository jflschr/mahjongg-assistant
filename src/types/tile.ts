export type Suit = 'dot' | 'bam' | 'crak';
export type SuitRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Wind = 'N' | 'E' | 'W' | 'S';
export type Dragon = 'red' | 'green' | 'white';

export type TileValue =
  | { kind: 'suited'; suit: Suit; rank: SuitRank }
  | { kind: 'wind'; wind: Wind }
  | { kind: 'dragon'; dragon: Dragon }
  | { kind: 'flower' }
  | { kind: 'joker' };

// Compact notation: "1d"-"9d" Dots, "1b"-"9b" Bams, "1c"-"9c" Craks,
// "wn","we","ww","ws" Winds, "dr","dg","dw" Dragons, "fl" Flower, "jk" Joker
export type TileCode = string;

export interface TileInstance {
  id: string;
  value: TileValue;
  code: TileCode;
}

export const SUIT_LABELS: Record<Suit, string> = {
  dot: 'Dot',
  bam: 'Bam',
  crak: 'Crak',
};

export const WIND_LABELS: Record<Wind, string> = {
  N: 'North',
  E: 'East',
  W: 'West',
  S: 'South',
};

export const DRAGON_LABELS: Record<Dragon, string> = {
  red: 'Red',
  green: 'Green',
  white: 'Soap',
};

export const SUIT_COLORS: Record<Suit, string> = {
  dot: '#2563eb',  // blue
  bam: '#16a34a',  // green
  crak: '#dc2626', // red
};
