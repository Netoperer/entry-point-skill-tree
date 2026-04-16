import { type Perk, PerkType } from "../../types";

const theArtOfTheSteal = "/entry-point/classes/TheArtOfTheSteal.webp";
const prodigy = "/entry-point/classes/Prodigy.webp";
const combatMastery = "/entry-point/classes/CombatMastery.webp";
const demolitionsExpert = "/entry-point/classes/DemolitionsExpert.webp";

export const Prodigy: Perk = {
  perkType: PerkType.Class,
  name: "Prodigy",
  icon: prodigy,
  description:
    "Prodigy: Starter perk for Hacker. Allows you to hack computers and cameras and unlocks the Keycard Scrambler.",
};

export const TheArtOfTheSteal: Perk = {
  perkType: PerkType.Class,
  name: "The Art of the Steal",
  icon: theArtOfTheSteal,
  description:
    "The Art of the Steal: Starter perk for Thief. Allows you to pick locks with a Lockpick Kit, crack safes, and increases disguise effectiveness by 50%.",
} as const;

export const CombatMastery: Perk = {
  perkType: PerkType.Class,
  name: "Combat Mastery",
  icon: combatMastery,
  description:
    "Combat Mastery: Starter perk for Mercenary. Allows you to take up to 2 Weapon Mastery perks, instead of 1. Health and stamina are also increased by 40%. You can also hostage elite guards in Concept with this perk.",
} as const;

export const DemolitionsExpert: Perk = {
  perkType: PerkType.Class,
  name: "Demolitions Expert",
  icon: demolitionsExpert,
  description:
    "Demolitions Expert: Starter perk for Engineer. Allows you to purchase C4, disable sensors, bypass chip readers, and the speed penalty from armor is reduced by 40%.",
} as const;

export const classes = {
  Prodigy: Prodigy,
  TheArtOfTheSteal: TheArtOfTheSteal,
  CombatMastery: CombatMastery,
  DemolitionsExpert: DemolitionsExpert,
} satisfies Record<string, Perk>;
