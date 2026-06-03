import { Perks } from "@/config/perks";
import type { Perk } from "@/types";

const rolePerks = {
  Infiltrator: [Perks.TheArtOfTheSteal, Perks.Prodigy],
  Breacher: [Perks.TheArtOfTheSteal, Perks.DemolitionsExpert],
  Commando: [Perks.TheArtOfTheSteal, Perks.CombatMastery],
  Technician: [Perks.Prodigy, Perks.DemolitionsExpert],
  Specialist: [Perks.Prodigy, Perks.CombatMastery],
  Juggernaut: [Perks.DemolitionsExpert, Perks.CombatMastery],

  Thief: [Perks.TheArtOfTheSteal],
  Mercenary: [Perks.CombatMastery],
  Hacker: [Perks.Prodigy],
  Engineer: [Perks.DemolitionsExpert],
} as const;

export function getClassPerksTitle(classes: Set<Perk>): string {
  const role = Object.entries(rolePerks).find(
    ([, perks]) =>
      perks.length === classes.size && perks.every((perk) => classes.has(perk)),
  );

  return role?.[0] ?? "Unknown";
}
