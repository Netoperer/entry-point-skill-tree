import { type Description } from "../descriptions";
import { MAJOR_PERKS } from "./majors";
import { MINOR_PERKS } from "./minors";
import { SPECIALISATION_PERKS } from "./specialisations";

export const ROOT_NODES = [173, 129, 2, 84, 27];

export enum PerkType {
  Minor,
  Major,
  Specialisation,
}

export interface Position {
  x: number;
  y: number;
}

export interface Perk {
  name: string;
  perkType: PerkType;
  icon?: string;
  description: Description;
}

export const PERKS = {
  ...MINOR_PERKS,
  ...MAJOR_PERKS,
  ...SPECIALISATION_PERKS,
} as const;

export type PERKS = keyof typeof PERKS;
