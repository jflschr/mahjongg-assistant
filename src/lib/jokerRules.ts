import type { TileGroup, HandPattern } from '../types/hand';

// Jokers can only be used in groups of 3+ tiles (pungs, kongs, quints, sextets)
// Jokers cannot substitute in pairs or singles
// Some hands (usually concealed "Singles & Pairs") forbid jokers entirely
export function canUseJokerInGroup(group: TileGroup): boolean {
  return group.tiles.length >= 3;
}

export function handPermitsJokers(hand: HandPattern): boolean {
  return hand.jokerPermitted;
}
