export interface PerkEntry {
  perk: Perk;
  position: Position;
}

export enum PerkType {
  Minor,
  Major,
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

export enum RootNode {
  AdvancedProtocols = "0",
  ElectricalEngineering = "65",
  Intimidation = "84",
  LockArtist = "87",
  SocialEngineering = "126",
}

export type Description = (level: number, ownedPerks: Perk[]) => string;

