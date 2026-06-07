import { PerkType, type Perk } from "@/types/freelancers-cut";
import { description } from "../descriptions";

const AmmoEconomyIcon = "/freelancers-cut/specialisations/AmmoEconomy.webp";
const CovertTakeoverIcon =
  "/freelancers-cut/specialisations/CovertTakeover.webp";
const DeadSilenceIcon = "/freelancers-cut/specialisations/DeadSilence.webp";
const EfficientPackingIcon =
  "/freelancers-cut/specialisations/EfficientPacking.webp";
const ExecutionerIcon = "/freelancers-cut/specialisations/Executioner.webp";
const FullArsenalIcon = "/freelancers-cut/specialisations/FullArsenal.webp";
const RefinedCompositionIcon =
  "/freelancers-cut/specialisations/RefinedComposition.webp";
const SafecrackerIcon = "/freelancers-cut/specialisations/Safecracker.webp";
const SharpenedSensesIcon =
  "/freelancers-cut/specialisations/SharpenedSenses.webp";
const SignalDisruptionIcon =
  "/freelancers-cut/specialisations/SignalDisruption.webp";
const ThespianIcon = "/freelancers-cut/specialisations/Thespian.webp";
const WorkshopIcon = "/freelancers-cut/specialisations/Workshop.webp";

const AmmoEconomy: Perk = {
  name: "Ammo Economy",
  perkType: PerkType.Specialisation,
  icon: AmmoEconomyIcon,
  description: description(
    "Ammo drops you can't use are coverted to other ammo types at 40% efficiency.",
  ),
} as const;

const CovertTakeover: Perk = {
  name: "Covert Takeover",
  perkType: PerkType.Specialisation,
  icon: CovertTakeoverIcon,
  description: description(
    "Increase maximum hacking detection risk before the alert level starts rising.",
  ),
} as const;

const DeadSilence: Perk = {
  name: "Dead Silence",
  perkType: PerkType.Specialisation,
  icon: DeadSilenceIcon,
  description: description(
    "Walking is silent and all other noises you make are quieter.",
  ),
} as const;

const EfficientPacking: Perk = {
  name: "Efficient Packing",
  perkType: PerkType.Specialisation,
  icon: EfficientPackingIcon,
  description: description(
    "Two extra space in held item inventory. Conceal weapons one size larger.",
  ),
} as const;

const Executioner: Perk = {
  name: "Executioner",
  perkType: PerkType.Specialisation,
  icon: ExecutionerIcon,
  description: description("Deal bonus damage in stealth and on headshots."),
} as const;

const FullArsenal: Perk = {
  name: "Full Arsenal",
  perkType: PerkType.Specialisation,
  icon: FullArsenalIcon,
  description: description("Another slot for primary weapons is unlocked."),
} as const;

const RefinedComposition: Perk = {
  name: "Refined Composition",
  perkType: PerkType.Specialisation,
  icon: RefinedCompositionIcon,
  description: description("Explosives do more environmental damage."),
} as const;

const Safecracker: Perk = {
  name: "Safecracker",
  perkType: PerkType.Specialisation,
  icon: SafecrackerIcon,
  description: description(
    "Certain safes can be cracked without finding the code.",
  ),
} as const;

const SharpenedSenses: Perk = {
  name: "Sharpened Senses",
  perkType: PerkType.Specialisation,
  icon: SharpenedSensesIcon,
  description: description(
    "Automatically mark people nearby while performing suspicious interactions.",
  ),
} as const;

const SignalDisruption: Perk = {
  name: "Signal Disruption",
  perkType: PerkType.Specialisation,
  icon: SignalDisruptionIcon,
  description: description(
    "Cameras detect you slower. Effect is increased on intercepted cameras.",
  ),
} as const;

const Thespian: Perk = {
  name: "Thespian",
  perkType: PerkType.Specialisation,
  icon: ThespianIcon,
  description: description(
    "Fewer people see through your disguises as the alert level rises.",
  ),
} as const;

const Workshop: Perk = {
  name: "Workshop",
  perkType: PerkType.Specialisation,
  icon: WorkshopIcon,
  description: description("Can use two item mods per item instead of one."),
} as const;

export const specialistaions = {
  AmmoEconomy,
  CovertTakeover,
  DeadSilence,
  EfficientPacking,
  Executioner,
  FullArsenal,
  RefinedComposition,
  Safecracker,
  SharpenedSenses,
  SignalDisruption,
  Thespian,
  Workshop,
};
