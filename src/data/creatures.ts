import { CREATURES_PART_1 } from './creaturesPart1';
import { CREATURES_PART_2 } from './creaturesPart2';
import type { CreatureEntry } from '../types';

export const CREATURES: CreatureEntry[] = [...CREATURES_PART_1, ...CREATURES_PART_2];

export const CREATURE_BY_ID: Record<string, CreatureEntry> = Object.fromEntries(
  CREATURES.map((c) => [c.id, c]),
);

export interface LineageGroup {
  lineageId: string;
  lineageName: string;
  entries: CreatureEntry[];
}

export const LINEAGE_GROUPS: LineageGroup[] = (() => {
  const map = new Map<string, LineageGroup>();
  for (const c of CREATURES) {
    const existing = map.get(c.lineageId);
    if (existing) {
      existing.entries.push(c);
    } else {
      map.set(c.lineageId, {
        lineageId: c.lineageId,
        lineageName: c.lineageName,
        entries: [c],
      });
    }
  }
  return Array.from(map.values());
})();

export function getThumbUrl(id: string): string {
  return `./images/thumb/${id}.webp`;
}

export function getFullUrl(id: string): string {
  return `./images/full/${id}.webp`;
}
