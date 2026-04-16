export const fastHands = "/public/entry-point/minors/FastHands.webp";
export const speedhack = "/public/entry-point/minors/SpeedHack.webp";
export const overdrill = "/public/entry-point/minors/Overdrill.webp";
export const outOfSight = "/public/entry-point/minors/OutOfSight.webp";
export const masquerade = "/public/entry-point/minors/Masquerade.webp";
export const equipmentSpecialist =
  "/public/entry-point/minors/EquipmentSpecialist.webp";
export const deepPockets = "/public/entry-point/minors/DeepPockets.webp";
export const investmentOpportunities =
  "/public/entry-point/minors/InvestmentOpportunities.webp";
export const vitalTargets = "/public/entry-point/minors/VitalTargets.webp";
export const conditioning = "/public/entry-point/minors/Conditioning.webp";
export const quickSwap = "/public/entry-point/minors/QuickSwap.webp";
export const vitality = "/public/entry-point/minors/Vitality.webp";
export const shockPlating = "/public/entry-point/minors/ShockPlating.webp";
export const battlefieldMedicine =
  "/public/entry-point/minors/BattlefieldMedicine.webp";
export const intimidation = "/public/entry-point/minors/Intimidation.webp";
export const pistolMastery = "/public/entry-point/minors/PistolMastery.webp";
export const smgMastery = "/public/entry-point/minors/SMGMastery.webp";
export const rifleMastery = "/public/entry-point/minors/RifleMastery.webp";
export const shotgunMastery = "/public/entry-point/minors/ShotgunMastery.webp";
export const heavyWeaponsMastery =
  "/public/entry-point/minors/HeavyWeaponsMastery.webp";
export const sniperMastery = "/public/entry-point/minors/SniperMastery.webp";

import { type Perk, PerkType } from "../../types";

export const FastHands: Perk = {
  perkType: PerkType.Minor,
  name: "Fast Hands",
  icon: fastHands,
  description:
    "Fast Hands: +10% Lockpicking speed and 5% weapon swap speed (150% and 75% max).",
};

export const Speedhack: Perk = {
  perkType: PerkType.Minor,
  name: "Speed Hack",
  icon: speedhack,
  description: "Speedhack: +10% Hacking speed (100% max).",
};

export const Overdrill: Perk = {
  perkType: PerkType.Minor,
  name: "Overdrill",
  icon: overdrill,
  description: "Overdrill: +10% Drilling speed (100% max).",
};

export const OutOfSight: Perk = {
  perkType: PerkType.Minor,
  name: "Out of Sight",
  icon: outOfSight,
  description:
    "Out of Sight: You are 10% harder to detect (200% max, affects red statuses and trespassing but not armored).",
};

export const Masquerade: Perk = {
  perkType: PerkType.Minor,
  name: "Masquerade",
  icon: masquerade,
  description:
    "Masquerade: +10% Disguise effectiveness (50% max, affects disguised, conspicuous, and armored statuses).",
};

export const EquipmentSpecialist: Perk = {
  perkType: PerkType.Minor,
  name: "Equipment Specialist",
  icon: equipmentSpecialist,
  description:
    "Equipment Specialist: +10% Equipment deployment and interaction speed (100% max).",
};

export const DeepPockets: Perk = {
  perkType: PerkType.Minor,
  name: "Deep Pockets",
  icon: deepPockets,
  description: "Deep Pockets: +5% Maximum ammo capacity (100% max).",
};

export const InvestmentOpportunities: Perk = {
  perkType: PerkType.Minor,
  name: "Investment Opportunities",
  icon: investmentOpportunities,
  description:
    "Investment Opportunities: +5% EXP earned (50% max). The Double XP Gamepass affects this perk.",
};

export const VitalTargets: Perk = {
  perkType: PerkType.Minor,
  name: "Vital Targets",
  icon: vitalTargets,
  description: "Vital Targets: +5% Damage with all weapons (100% max).",
};

export const Conditioning: Perk = {
  perkType: PerkType.Minor,
  name: "Conditioning",
  icon: conditioning,
  description: "Conditioning: +2 Seconds to sprint time (+20 seconds max).",
};

export const QuickSwap: Perk = {
  perkType: PerkType.Minor,
  name: "Quick Swap",
  icon: quickSwap,
  description: "Quick Swap: +5% Weapon reload speed (100% max).",
};

export const Vitality: Perk = {
  perkType: PerkType.Minor,
  name: "Vitality",
  icon: vitality,
  description: "Vitality: +5% Max Health (100% max).",
};

export const ShockPlating: Perk = {
  perkType: PerkType.Minor,
  name: "Shock Plating",
  icon: shockPlating,
  description:
    "Shock Plating: +10% Armor effectiveness (150% max, only affects durability).",
};

export const BattlefieldMedicine: Perk = {
  perkType: PerkType.Minor,
  name: "Battlefield Medicine",
  icon: battlefieldMedicine,
  description:
    "Battlefield Medicine: Heal 10 more HP from medkits (+50 HP max).",
};

export const Intimidation: Perk = {
  perkType: PerkType.Minor,
  name: "Intimidation",
  icon: intimidation,
  description:
    "Intimidation: +10% Intimidation range and interrogation speed (100% max).",
};

export const PistolTraining: Perk = {
  perkType: PerkType.Minor,
  name: "Pistol Training",
  icon: pistolMastery,
  description: "Pistol Training: +10% Damage with Pistols (30% max).",
};

export const SmgTraining: Perk = {
  perkType: PerkType.Minor,
  name: "SMG Training",
  icon: smgMastery,
  description: "SMG Training: +10% Damage with SMGs (30% max).",
};

export const RifleTraining: Perk = {
  perkType: PerkType.Minor,
  name: "Rifle Training",
  icon: rifleMastery,
  description: "Rifle Training: +10% Damage with Rifles (30% max).",
};

export const ShotgunTraining: Perk = {
  perkType: PerkType.Minor,
  name: "Shotgun Training",
  icon: shotgunMastery,
  description: "Shotgun Training: +10% Damage with Shotguns (30% max).",
};

export const HeavyWeaponsTraining: Perk = {
  perkType: PerkType.Minor,
  name: "Heavy Weapons Training",
  icon: heavyWeaponsMastery,
  description:
    "Heavy Weapons Training: +10% Damage with Heavy Weapons (30% max).",
};

export const SniperTraining: Perk = {
  perkType: PerkType.Minor,
  name: "Sniper Training",
  icon: sniperMastery,
  description: "Sniper Training: +10% Damage with Sniper Rifles (30% max).",
};

export const minors = {
  FastHands: FastHands,
  SpeedHack: Speedhack,
  Overdrill: Overdrill,
  OutOfSight: OutOfSight,
  Masquerade: Masquerade,
  EquipmentSpecialist: EquipmentSpecialist,
  DeepPockets: DeepPockets,
  InvestmentOpportunities: InvestmentOpportunities,
  VitalTargets: VitalTargets,
  Conditioning: Conditioning,
  QuickSwap: QuickSwap,
  Vitality: Vitality,
  ShockPlating: ShockPlating,
  BattlefieldMedicine: BattlefieldMedicine,
  Intimidation: Intimidation,
  PistolTraining: PistolTraining,
  SmgTraining: SmgTraining,
  RifleTraining: RifleTraining,
  ShotgunTraining: ShotgunTraining,
  HeavyWeaponsTraining: HeavyWeaponsTraining,
  SniperTraining: SniperTraining,
} as const;
