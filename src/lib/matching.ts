import type { Suit, TileCode } from '../types/tile';
import type { HandPattern, HandCategory, PatternTile, SuitVariable, TileGroup } from '../types/hand';
import type { HandProgress, TileMatch } from '../types/matching';
import { buildFrequencyMap, SUIT_CHAR, WIND_CHAR } from './tileUtils';
import { canUseJokerInGroup, handPermitsJokers } from './jokerRules';

const SUITS: Suit[] = ['dot', 'bam', 'crak'];

// Dragon that "matches" a suit (used on the NMJL card)
const SUIT_TO_DRAGON: Record<Suit, string> = {
  crak: 'dr',
  dot: 'dw', // Soap / White dragon for dots
  bam: 'dg',
};

type SuitAssignment = Partial<Record<SuitVariable, Suit>>;

function getSuitVariables(hand: HandPattern): SuitVariable[] {
  const vars = new Set<SuitVariable>();
  for (const group of hand.groups) {
    for (const tile of group.tiles) {
      if (tile.kind === 'suited') vars.add(tile.suitVar);
      if (tile.kind === 'dragon' && tile.dragon === 'matchSuit') {
        // matchSuit dragons imply a suit variable, but we handle via assignment
      }
    }
  }
  return Array.from(vars);
}

const permutationCache = new Map<string, SuitAssignment[]>();

function generateSuitPermutations(vars: SuitVariable[]): SuitAssignment[] {
  if (vars.length === 0) return [{}];

  const key = vars.join(',');
  const cached = permutationCache.get(key);
  if (cached) return cached;

  const results: SuitAssignment[] = [];

  function permute(idx: number, used: Set<Suit>, current: SuitAssignment) {
    if (idx === vars.length) {
      results.push({ ...current });
      return;
    }
    for (const suit of SUITS) {
      if (used.has(suit)) continue;
      used.add(suit);
      current[vars[idx]] = suit;
      permute(idx + 1, used, current);
      delete current[vars[idx]];
      used.delete(suit);
    }
  }

  permute(0, new Set(), {});
  permutationCache.set(key, results);
  return results;
}

function resolvePatternTile(pt: PatternTile, assignment: SuitAssignment): TileCode | null {
  switch (pt.kind) {
    case 'flower': return 'fl';
    case 'joker': return 'jk';
    case 'suited': {
      const suit = assignment[pt.suitVar];
      if (!suit) return null;
      return `${pt.rank}${SUIT_CHAR[suit]}`;
    }
    case 'wind': {
      if (pt.wind === 'any') return null; // handled specially
      return `w${WIND_CHAR[pt.wind]}`;
    }
    case 'dragon': {
      if (pt.dragon === 'matchSuit') {
        // Find which suit variable this dragon corresponds to
        // For simplicity, use the first suit variable's assignment
        // In practice, this should be context-dependent
        const firstVar = Object.keys(assignment)[0] as SuitVariable | undefined;
        if (firstVar && assignment[firstVar]) {
          return SUIT_TO_DRAGON[assignment[firstVar]!];
        }
        return null;
      }
      const dragonChar = { red: 'r', green: 'g', white: 'w' }[pt.dragon];
      return `d${dragonChar}`;
    }
  }
}

function matchWithAssignment(
  userTiles: TileCode[],
  hand: HandPattern,
  assignment: SuitAssignment
): { matchedCount: number; tileMatches: TileMatch[]; neededTiles: TileCode[]; unmatchedUserTiles: TileCode[] } {
  const userFreq = buildFrequencyMap(userTiles);
  const jokerCount = userFreq.get('jk') || 0;
  userFreq.delete('jk'); // handle jokers separately

  const tileMatches: TileMatch[] = [];
  const neededTiles: TileCode[] = [];
  let matchedCount = 0;
  let jokersAvailable = jokerCount;
  const allowJokers = handPermitsJokers(hand);

  for (const group of hand.groups) {
    const groupCanUseJoker = allowJokers && canUseJokerInGroup(group);

    for (const pt of group.tiles) {
      const resolved = resolvePatternTile(pt, assignment);

      if (pt.kind === 'wind' && pt.wind === 'any') {
        // Try to match any wind the user has
        const winds: TileCode[] = ['wn', 'we', 'ww', 'ws'];
        let found = false;
        for (const w of winds) {
          const count = userFreq.get(w) || 0;
          if (count > 0) {
            userFreq.set(w, count - 1);
            tileMatches.push({ patternTile: pt, matchedWith: w, isJokerSub: false });
            matchedCount++;
            found = true;
            break;
          }
        }
        if (!found) {
          if (groupCanUseJoker && jokersAvailable > 0) {
            jokersAvailable--;
            tileMatches.push({ patternTile: pt, matchedWith: 'jk', isJokerSub: true });
            matchedCount++;
          } else {
            tileMatches.push({ patternTile: pt, matchedWith: null, isJokerSub: false });
            neededTiles.push('wn'); // approximate
          }
        }
        continue;
      }

      if (!resolved) {
        tileMatches.push({ patternTile: pt, matchedWith: null, isJokerSub: false });
        neededTiles.push('??');
        continue;
      }

      const count = userFreq.get(resolved) || 0;
      if (count > 0) {
        userFreq.set(resolved, count - 1);
        tileMatches.push({ patternTile: pt, matchedWith: resolved, isJokerSub: false });
        matchedCount++;
      } else if (groupCanUseJoker && jokersAvailable > 0) {
        jokersAvailable--;
        tileMatches.push({ patternTile: pt, matchedWith: 'jk', isJokerSub: true });
        matchedCount++;
      } else {
        tileMatches.push({ patternTile: pt, matchedWith: null, isJokerSub: false });
        neededTiles.push(resolved);
      }
    }
  }

  // Collect unmatched user tiles
  const unmatchedUserTiles: TileCode[] = [];
  for (const [code, count] of userFreq) {
    for (let i = 0; i < count; i++) {
      unmatchedUserTiles.push(code);
    }
  }
  // Add unused jokers
  for (let i = 0; i < jokersAvailable; i++) {
    unmatchedUserTiles.push('jk');
  }

  return { matchedCount, tileMatches, neededTiles, unmatchedUserTiles };
}

function getUserSuits(userTiles: TileCode[]): Set<Suit> {
  const suits = new Set<Suit>();
  const suitMap: Record<string, Suit> = { d: 'dot', b: 'bam', c: 'crak' };
  for (const code of userTiles) {
    const s = suitMap[code[1]];
    if (s) suits.add(s);
  }
  return suits;
}

export function matchHand(
  userTiles: TileCode[],
  hand: HandPattern,
  category: HandCategory
): HandProgress {
  const suitVars = getSuitVariables(hand);
  const permutations = generateSuitPermutations(suitVars);
  const totalRequired = hand.groups.reduce((sum, g) => sum + g.tiles.length, 0);
  const userSuits = getUserSuits(userTiles);

  let best: HandProgress | null = null;

  for (const assignment of permutations) {
    // Prune: skip assignments where every assigned suit is absent from user tiles
    if (suitVars.length > 0) {
      const assignedSuits = suitVars.map(v => assignment[v]!);
      if (assignedSuits.every(s => !userSuits.has(s))) continue;
    }

    const result = matchWithAssignment(userTiles, hand, assignment);
    const percentage = totalRequired > 0 ? Math.round((result.matchedCount / totalRequired) * 100) : 0;

    const progress: HandProgress = {
      hand,
      category,
      matchedCount: result.matchedCount,
      totalRequired,
      percentage,
      tileMatches: result.tileMatches,
      suitAssignment: assignment,
      unmatchedUserTiles: result.unmatchedUserTiles,
      neededTiles: result.neededTiles,
    };

    if (!best || progress.matchedCount > best.matchedCount) {
      best = progress;
    }
  }

  // If no permutations or all pruned, run once with empty/first assignment
  if (!best) {
    const fallbackAssignment = permutations[0] || {};
    const result = matchWithAssignment(userTiles, hand, fallbackAssignment);
    best = {
      hand,
      category,
      matchedCount: result.matchedCount,
      totalRequired,
      percentage: totalRequired > 0 ? Math.round((result.matchedCount / totalRequired) * 100) : 0,
      tileMatches: result.tileMatches,
      suitAssignment: fallbackAssignment,
      unmatchedUserTiles: result.unmatchedUserTiles,
      neededTiles: result.neededTiles,
    };
  }

  return best;
}

export function matchAllHands(
  userTiles: TileCode[],
  categories: HandCategory[]
): HandProgress[] {
  if (userTiles.length === 0) return [];

  const results: HandProgress[] = [];

  for (const category of categories) {
    for (const hand of category.hands) {
      const progress = matchHand(userTiles, hand, category);
      results.push(progress);
    }
  }

  // Sort by percentage descending, then by hand value descending
  results.sort((a, b) => {
    if (b.percentage !== a.percentage) return b.percentage - a.percentage;
    return b.hand.value - a.hand.value;
  });

  return results;
}
