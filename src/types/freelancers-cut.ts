export interface PerkEntry {
  perk: Perk;
  position: Position;
}

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
  icon: string;
  description: Description;
}

export type Description = (level: number, ownedPerks: Perk[]) => string;
