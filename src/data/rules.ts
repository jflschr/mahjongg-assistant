import type { RuleSection } from '../types/rules';

export const RULES: RuleSection[] = [
  {
    id: 'overview',
    title: 'Game Overview',
    tags: ['basics', 'overview', 'introduction', 'setup'],
    content: `American Mah Jongg is played with 152 tiles: three suits (Craks, Dots, Bams) numbered 1-9 with 4 of each, 4 each of the 4 Winds (North, East, South, West), 4 each of 3 Dragons (Red, Green, White/Soap), 8 Flowers, and 8 Jokers.

Four players sit around a table. The goal is to complete a 14-tile hand that matches one of the patterns on the official NMJL (National Mah Jongg League) card, which changes every year.

Each player starts with 13 tiles (except East who gets 14). On your turn, you pick a tile from the wall or claim a discard, then discard one tile. The first player to complete a valid hand declares "Mah Jongg" and wins the round.`,
  },
  {
    id: 'setup',
    title: 'Game Setup',
    tags: ['setup', 'wall', 'deal', 'east', 'seating'],
    content: `1. Mix all 152 tiles face-down on the table.
2. Each player builds a wall of tiles: 19 tiles long, 2 tiles high.
3. Push all four walls together to form a square.
4. Determine East (dealer) by rolling dice or drawing Winds.
5. East rolls dice to determine where to break the wall.
6. Deal tiles: Each player takes 4 tiles at a time, going around 3 times (12 tiles each). Then each player takes 1 more tile, and East takes an extra tile (13 tiles for most, 14 for East).
7. East begins the game by discarding one tile.`,
  },
  {
    id: 'charleston',
    title: 'The Charleston',
    tags: ['charleston', 'passing', 'exchange', 'trading'],
    content: `Before play begins, players exchange unwanted tiles in a ritual called the Charleston:

**First Charleston (mandatory):**
1. Pass 3 tiles to the right
2. Pass 3 tiles across
3. Pass 3 tiles to the left

**Second Charleston (optional — all players must agree):**
4. Pass 3 tiles to the left
5. Pass 3 tiles across
6. Pass 3 tiles to the right

**Courtesy Pass (optional):**
After both Charlestons, you may exchange 1, 2, or 3 tiles with the player across from you (both must agree on the number).

Important: You may "blind pass" — pass tiles you just received without looking at them — during the across pass of each Charleston.`,
  },
  {
    id: 'gameplay',
    title: 'Turn Sequence',
    tags: ['turn', 'pick', 'discard', 'wall', 'gameplay'],
    content: `**On each turn:**
1. Pick a tile from the wall (draw from the right end of the wall), OR claim the most recently discarded tile (see Calling rules).
2. Look at your hand and decide which tile to discard.
3. Place the discard face-up in the center of the table and clearly name it (e.g., "3 Bam").

**Turn order:** Play goes counter-clockwise (to the right) around the table.

**Important rules:**
- You cannot pick a tile from the wall and put it right back (you must discard a different tile if you drew from the wall).
- Discards should be placed in an orderly row so all players can see previously discarded tiles.
- Once you discard, you cannot change your mind.`,
  },
  {
    id: 'calling',
    title: 'Calling for Discards',
    tags: ['calling', 'exposure', 'claim', 'discard', 'pung', 'kong', 'quint'],
    content: `You may claim another player's discard if it completes a group (exposure) in your hand:

**Rules for calling:**
- You must expose (show) the completed group face-up on top of your rack.
- You can call for any discard, regardless of whose turn it is.
- After calling and exposing, you discard a tile and play continues to your right.
- You CANNOT call a discard just to complete a pair (unless it's for Mah Jongg).

**Priority of claims:**
1. Mah Jongg (highest priority — wins over all other claims)
2. Any other exposure (if multiple players want the same discard for an exposure, the player closest in turn order gets it)

**What you can call for:**
- Pungs (3 of a kind) — need 2 in hand, call for the 3rd
- Kongs (4 of a kind) — need 3 in hand, call for the 4th
- Quints (5 of a kind, using jokers) — need 4 in hand, call for the 5th

**You CANNOT call for:**
- A single tile to add to your hand
- A pair (except for Mah Jongg)`,
  },
  {
    id: 'jokers',
    title: 'Joker Rules',
    tags: ['joker', 'wild', 'substitute', 'exchange'],
    content: `Jokers are wild tiles that can substitute for other tiles, with restrictions:

**Where jokers CAN be used:**
- In groups of 3 or more (pungs, kongs, quints, sextets)
- Multiple jokers can be used in the same group

**Where jokers CANNOT be used:**
- In pairs (groups of exactly 2)
- In singles (groups of exactly 1)
- In hands marked as "no jokers" on the card (typically concealed hands in Singles & Pairs)

**Joker exchange:**
If a player has exposed a group containing a joker, any player (on their turn) may exchange the joker with the natural tile it represents. The player making the exchange:
1. Must have the actual tile the joker is replacing
2. Takes the joker into their hand
3. This counts as their pick for the turn
4. They must then discard

**Joker discards:**
- A discarded joker is "dead" — it cannot be claimed by any player.`,
  },
  {
    id: 'mahjongg',
    title: 'Declaring Mah Jongg',
    tags: ['mahjongg', 'win', 'declare', 'winning', 'self-pick', 'wall game'],
    content: `To win, you must complete a hand that exactly matches a pattern on the NMJL card.

**How to declare:**
1. When your 14th tile completes a valid hand, say "Mah Jongg!"
2. You can win by picking from the wall or by claiming a discard.
3. Expose your entire hand for all players to verify.

**Self-pick vs. discard win:**
- If you win by picking from the wall, all three other players pay you.
- If you win by claiming a discard, the player who discarded pays double and the other two players pay single.

**Wall game (no winner):**
If the wall runs out of tiles before anyone declares Mah Jongg, the game is a "wall game" — no one pays.

**Errors:**
- If you declare Mah Jongg incorrectly, you are "dead" for the rest of the round (you continue to discard but cannot win).
- If you make an incorrect exposure during the game, you are also dead.`,
  },
  {
    id: 'scoring',
    title: 'Scoring & Payment',
    tags: ['scoring', 'payment', 'points', 'money', 'value'],
    content: `Each hand on the NMJL card has a point value (typically 25 or 30 points).

**Payment structure:**
- 25-point hand: Standard payout
- 30-point hand: Higher payout (these are harder hands, often concealed)

**Who pays whom:**
- **Discard win:** The discarder pays the winner 2x the hand value. The other two players each pay 1x the hand value.
- **Self-pick (wall) win:** All three players each pay the winner 2x the hand value.
- **Wall game:** No payment.

**Example (25-point hand):**
- Discard win: Discarder pays 50, others pay 25 each. Winner collects 100.
- Self-pick win: Each player pays 50. Winner collects 150.`,
  },
];
