import { PerkType, type Perk } from "@/types/freelancers-cut";
import { multiplicativeAbility } from "../descriptions";

const AppliedForceIcon = "/freelancers-cut/minors/AppliedForce.png";
const ConditioningIcon = "/freelancers-cut/minors/Conditioning.png";
const DataCompressionIcon = "/freelancers-cut/minors/CriticalInsights.png";
const DiscretionIcon = "/freelancers-cut/minors/Discretion.png";
const EfficientAlgorithmsIcon =
  "/freelancers-cut/minors/EfficientAlgorithms.png";
const FastHandsIcon = "/freelancers-cut/minors/FastHands.png";
const LowProfileIcon = "/freelancers-cut/minors/LowProfile.png";
const MasqueradeIcon = "/freelancers-cut/minors/Masquerade.png";
const SignalDisruptionIcon = "/freelancers-cut/minors/SignalDisruption.png";
const TechnicalExpertIcon = "/freelancers-cut/minors/TechnicalExpert.png";

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

const SignalDisruption: Perk = {
  name: "Signal Disruption",
  perkType: PerkType.Specialisation,
  icon: SignalDisruptionIcon,
  description: multiplicativeAbility(
    "Cameras detect you slower. Effect is increased on intercepted cameras.",
    4,
  ),
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

export const minors = {
  AppliedForce,
  Conditioning,
  CriticalInsights,
  Discretion,
  EfficientAlgorithms,
  FastHands,
  LowProfile,
  Masquerade,
  SignalDisruption,
  TechnicalExpert,
};
