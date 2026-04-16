import { type Perk, PerkType } from "../../types";

const interference = "/public/entry-point/uniques/Interference.webp";
const surveillanceState = "/public/entry-point/uniques/SurveillanceState.webp";
const precisionDrilling = "/public/entry-point/uniques/PrecisionDrilling.webp";
const deception = "/public/entry-point/uniques/Deception.webp";
const innerPockets = "/public/entry-point/uniques/InnerPockets.webp";
const hiddenWeapons = "/public/entry-point/uniques/HiddenWeapons.webp";
const hiddenReserves = "/public/entry-point/uniques/HiddenReserves.webp";
const dexterity = "/public/entry-point/uniques/Dexterity.webp";
const steadyAim = "/public/entry-point/uniques/SteadyAim.webp";
const firebug = "/public/entry-point/uniques/Firebug.webp";
const explosiveEntry = "/public/entry-point/uniques/ExplosiveEntry.webp";
const advancedDeterrent = "/public/entry-point/uniques/AdvancedDeterrent.webp";

export const Interference: Perk = {
  perkType: PerkType.Unique,
  name: "Interference",
  icon: interference,
  description:
    "Interference: Enables looping Camera feeds for bullet cameras and lets you disable dome cameras.",
} as const;

export const SurveillanceState: Perk = {
  perkType: PerkType.Unique,
  name: "Surveillance State",
  icon: surveillanceState,
  description:
    "Surveillance State: The last camera you viewed will automatically mark people every two seconds. Additionally, you can purchase Microcams and Trackers.",
};

export const PrecisionDrilling: Perk = {
  perkType: PerkType.Unique,
  name: "Precision Drilling",
  icon: precisionDrilling,
  description:
    "Precision Drilling: You can close doors that were drilled open, and they do not appear broken from a distance, however if an NPC opens a drilled door they will be alerted.",
};

export const Deception: Perk = {
  perkType: PerkType.Unique,
  name: "Deception",
  icon: deception,
  description:
    "Deception: Enables 2 radios to be answered without sounding the alarm instead of 1.",
};

export const InnerPockets: Perk = {
  perkType: PerkType.Unique,
  name: "Inner Pockets",
  icon: innerPockets,
  description: "Inner Pockets: +1 Concealment limit.",
};

export const HiddenWeapons: Perk = {
  perkType: PerkType.Unique,
  name: "Hidden Weapons",
  icon: hiddenWeapons,
  description:
    "Hidden Weapons: Unlocks Concealed Holsters (+1 Concealment limit)",
};

export const HiddenReserves: Perk = {
  perkType: PerkType.Unique,
  name: "Hidden Reserves",
  icon: hiddenReserves,
  description:
    "Hidden Reserves: Unlocks Concealed Ammo Vest (+50% ammo capacity)",
};

export const Dexterity: Perk = {
  perkType: PerkType.Unique,
  name: "Dexterity",
  icon: dexterity,
  description:
    "Dexterity: Ability to run and reload with a mastered weapon type.",
} as const;

export const SteadyAim: Perk = {
  perkType: PerkType.Unique,
  name: "Steady Aim",
  icon: steadyAim,
  description:
    "Steady Aim: Ability to run and shoot with a mastered weapon type.",
};

export const Firebug: Perk = {
  perkType: PerkType.Unique,
  name: "Firebug",
  icon: firebug,
  description: "Firebug: Can purchase and use Blowtorches.",
};

export const ExplosiveEntry: Perk = {
  perkType: PerkType.Unique,
  name: "Explosive Entry",
  icon: explosiveEntry,
  description: "Explosive Entry: Can purchase Breaching Charges.",
};

export const AdvancedDeterrent: Perk = {
  perkType: PerkType.Unique,
  name: "Advanced Deterrent",
  icon: advancedDeterrent,
  description: "Advanced Deterrent: Can purchase Proximity Mines.",
};

export const uniques = {
  Interference: Interference,
  SurveillanceState: SurveillanceState,
  PrecisionDrilling: PrecisionDrilling,
  Deception: Deception,
  InnerPockets: InnerPockets,
  HiddenWeapons: HiddenWeapons,
  HiddenReserves: HiddenReserves,
  Dexterity: Dexterity,
  SteadyAim: SteadyAim,
  Firebug: Firebug,
  ExplosiveEntry: ExplosiveEntry,
  AdvancedDeterrent: AdvancedDeterrent,
} as const;
