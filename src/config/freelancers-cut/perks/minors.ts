import { PerkType, type Perk } from "@/types/freelancers-cut";
import { multiplicativeAbility } from "../descriptions";

const AmmoReservesIcon = "/freelancers-cut/minors/AmmoReserves.webp";
const AppliedForceIcon = "/freelancers-cut/minors/AppliedForce.webp";
const ConditioningIcon = "/freelancers-cut/minors/Conditioning.webp";
const DataCompressionIcon = "/freelancers-cut/minors/DataCompression.webp";
const DiscretionIcon = "/freelancers-cut/minors/Discretion.webp";
const EfficientAlgorithmsIcon =
  "/freelancers-cut/minors/EfficientAlgorithms.webp";
const FastHandsIcon = "/freelancers-cut/minors/FastHands.webp";
const LowProfileIcon = "/freelancers-cut/minors/LowProfile.webp";
const MasqueradeIcon = "/freelancers-cut/minors/Masquerade.webp";
const QuickSwapIcon = "/freelancers-cut/minors/QuickSwap.webp";
const TechnicalExpertIcon = "/freelancers-cut/minors/TechnicalExpert.webp";
const VitalTargetsIcon = "/freelancers-cut/minors/VitalTargets.webp";
const VitalityIcon = "/freelancers-cut/minors/Vitality.webp";
const WeakPointsIcon = "/freelancers-cut/minors/WeakPoints.webp";

const AmmoReserves: Perk = {
  name: "Ammo Reserves",
  perkType: PerkType.Minor,
  icon: AmmoReservesIcon,
  description: multiplicativeAbility("Carry {}% more ammo in reserve.", 5),
} as const;

const AppliedForce: Perk = {
  name: "Applied Force",
  perkType: PerkType.Minor,
  icon: AppliedForceIcon,
  description: multiplicativeAbility("Drilling speed is increased by {}%.", 5),
} as const;

const Conditioning: Perk = {
  name: "Conditioning",
  perkType: PerkType.Minor,
  icon: ConditioningIcon,
  description: multiplicativeAbility(
    "Increase your maximum stamina by {}%.",
    10,
  ),
} as const;

const CriticalInsights: Perk = {
  name: "Data CriticalInsights",
  perkType: PerkType.Minor,
  icon: DataCompressionIcon,
  description: multiplicativeAbility(
    "Network resource cost of hacks is reduced by {}%.",
    5,
  ),
} as const;

const Discretion: Perk = {
  name: "Discretion",
  perkType: PerkType.Minor,
  icon: DiscretionIcon,
  description: multiplicativeAbility(
    "Suspicious activities are detected {}% slower.",
    5,
  ),
} as const;

const EfficientAlgorithms: Perk = {
  name: "Efficient Algorithms",
  perkType: PerkType.Minor,
  icon: EfficientAlgorithmsIcon,
  description: multiplicativeAbility(
    "Increase hack speed and decrease hack detection risk by {}%.",
    5,
  ),
} as const;

const FastHands: Perk = {
  name: "Fast Hands",
  perkType: PerkType.Minor,
  icon: FastHandsIcon,
  description: multiplicativeAbility(
    "Lockpicking speed is increased by {}%.",
    5,
  ),
} as const;

const LowProfile: Perk = {
  name: "Low Profile",
  perkType: PerkType.Minor,
  icon: LowProfileIcon,
  description: multiplicativeAbility(
    "When crouched, {}% slower detection and {}% dodge chance.",
    4,
    3,
  ),
} as const;

const Masquerade: Perk = {
  name: "Masquerade",
  perkType: PerkType.Minor,
  icon: MasqueradeIcon,
  description: multiplicativeAbility(
    "Detection against disguises is {}% slower.",
    5,
  ),
} as const;

const QuickSwap: Perk = {
  name: "Quick Swap",
  perkType: PerkType.Minor,
  icon: QuickSwapIcon,
  description: multiplicativeAbility("Reload all weapons {}% faster.", 4),
} as const;

const TechnicalExpert: Perk = {
  name: "Technical Expert",
  perkType: PerkType.Minor,
  icon: TechnicalExpertIcon,
  description: multiplicativeAbility(
    "All tech items are {}% faster to use/deploy.",
    5,
  ),
} as const;

const VitalTargets: Perk = {
  name: "Vital Targets",
  perkType: PerkType.Minor,
  icon: VitalTargetsIcon,
  description: multiplicativeAbility("All damage is increased by {}%.", 4),
} as const;

const Vitality: Perk = {
  name: "Vitality",
  perkType: PerkType.Minor,
  icon: VitalityIcon,
  description: multiplicativeAbility("Increase your maximum health by {}%.", 5),
} as const;

const WeakPoints: Perk = {
  name: "Weak Points",
  perkType: PerkType.Minor,
  icon: WeakPointsIcon,
  description: multiplicativeAbility("Your shots ignore {}% of armor.", 6),
} as const;

export const minors = {
  AppliedForce,
  Conditioning,
  CriticalInsights,
  Discretion,
  EfficientAlgorithms,
  FastHands,
  LowProfile,
  Masquerade,
  QuickSwap,
  TechnicalExpert,
  WeakPoints,
};
