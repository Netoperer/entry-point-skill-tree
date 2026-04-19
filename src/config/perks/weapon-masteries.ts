import { type Perk, PerkType } from "types";

export const pistolMastery = "/entry-point/weapon-masteries/PistolMastery.webp";
export const smgMastery = "/entry-point/weapon-masteries/SMGMastery.webp";
export const rifleMastery = "/entry-point/weapon-masteries/RifleMastery.webp";
export const shotgunMastery =
  "/entry-point/weapon-masteries/ShotgunMastery.webp";
export const heavyWeaponsMastery =
  "/entry-point/weapon-masteries/HeavyWeaponsMastery.webp";
export const sniperMastery = "/entry-point/weapon-masteries/SniperMastery.webp";

export const PistolMastery: Perk = {
  perkType: PerkType.WeaponMastery,
  name: "Pistol Mastery",
  icon: pistolMastery,
  description:
    "Pistol Mastery: Dual wield if you have two matching pistols equipped and +25% reload speed with pistols.",
};

export const SmgMastery: Perk = {
  perkType: PerkType.WeaponMastery,
  name: "SMG Mastery",
  icon: smgMastery,
  description: "SMG Mastery: -2 Concealment cost.",
};

export const RifleMastery: Perk = {
  perkType: PerkType.WeaponMastery,
  name: "Rifle Mastery",
  icon: rifleMastery,
  description: "Rifle Mastery: -40% Spread.",
};

export const ShotgunMastery: Perk = {
  perkType: PerkType.WeaponMastery,
  name: "Shotgun Mastery",
  icon: shotgunMastery,
  description:
    "Shotgun Mastery: Intended to grant +50% Intimidation range, but instead does nothing.",
};

export const HeavyWeaponsMastery: Perk = {
  perkType: PerkType.WeaponMastery,
  name: "Heavy Weapons Mastery",
  icon: heavyWeaponsMastery,
  description:
    "Heavy Weapons Mastery: Intended to grant -50% Speed penalty, but instead sets the Speed penalty of heavy weapons to 10%.",
};

export const SniperMastery: Perk = {
  perkType: PerkType.WeaponMastery,
  name: "Sniper Mastery",
  icon: sniperMastery,
  description:
    "Sniper Mastery: Increases surface penetration, and allows for penetration of enemy shields, enemies and bulletproof glass.",
};

export const weaponMasteries = {
  PistolMastery: PistolMastery,
  SmgMastery: SmgMastery,
  RifleMastery: RifleMastery,
  ShotgunMastery: ShotgunMastery,
  HeavyWeaponsMastery: HeavyWeaponsMastery,
  SniperMastery: SniperMastery,
} as const;
