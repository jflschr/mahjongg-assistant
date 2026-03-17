import type { TileCode, TileValue, Suit, SuitRank, Wind, Dragon } from '../types/tile';

export const SUIT_CHAR: Record<Suit, string> = { dot: 'd', bam: 'b', crak: 'c' };
export const WIND_CHAR: Record<string, string> = { N: 'n', E: 'e', W: 'w', S: 's' };

export function parseTileCode(code: TileCode): TileValue | null {
  if (code === 'fl') return { kind: 'flower' };
  if (code === 'jk') return { kind: 'joker' };

  if (code.length === 2) {
    const first = code[0];
    const second = code[1];

    // Suited tiles: "1d" through "9d", "1b"-"9b", "1c"-"9c"
    const rank = parseInt(first);
    if (rank >= 1 && rank <= 9) {
      const suitMap: Record<string, Suit> = { d: 'dot', b: 'bam', c: 'crak' };
      const suit = suitMap[second];
      if (suit) return { kind: 'suited', suit, rank: rank as SuitRank };
    }

    // Wind tiles: "wn","we","ww","ws"
    if (first === 'w') {
      const windMap: Record<string, Wind> = { n: 'N', e: 'E', w: 'W', s: 'S' };
      const wind = windMap[second];
      if (wind) return { kind: 'wind', wind };
    }

    // Dragon tiles: "dr","dg","dw"
    if (first === 'd') {
      const dragonMap: Record<string, Dragon> = { r: 'red', g: 'green', w: 'white' };
      const dragon = dragonMap[second];
      if (dragon) return { kind: 'dragon', dragon };
    }
  }

  return null;
}

export function buildFrequencyMap(codes: TileCode[]): Map<TileCode, number> {
  const map = new Map<TileCode, number>();
  for (const code of codes) {
    map.set(code, (map.get(code) || 0) + 1);
  }
  return map;
}
