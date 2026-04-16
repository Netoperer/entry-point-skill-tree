export type PerkEntry = {
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  perk: Perk;
};

export enum PerkType {
  Class = "class",
  Unique = "unique",
  WeaponMastery = "weaponMastery",
  Minor = "minor",
}

export type Perk = {
  perkType: PerkType;
  name: string;
  description: string;
  icon: string;
};

export enum StarterClass {
  Prodigy = "0",
  TheArtOfTheSteal = "1",
  DemolitionsExpert = "2",
  CombatMastery = "3",
}
