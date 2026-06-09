import { PerkType, type Perk } from "@/types/freelancers-cut";
import { setAbility } from "../descriptions";

const AdvancedProtocolsIcon = "/freelancers-cut/majors/AdvancedProtocols.png";
const AgilityIcon = "/freelancers-cut/majors/Agility.png";
const AwarenessIcon = "/freelancers-cut/majors/Awareness.png";
const BruteStrengthIcon = "/freelancers-cut/majors/BruteStrength.png";
const ClimberIcon = "/freelancers-cut/majors/Climber.png";
const ElectricalEngineeringIcon =
  "/freelancers-cut/majors/ElectricalEngineering.png";
const IntimidationIcon = "/freelancers-cut/majors/Intimidation.png";
const LockArtistIcon = "/freelancers-cut/majors/LockArtist.png";
const PickpocketIcon = "/freelancers-cut/majors/Pickpocket.png";
const ReliableContactsIcon = "/freelancers-cut/majors/ReliableContacts.png";
const RemoteAccessIcon = "/freelancers-cut/majors/RemoteAccess.png";
const SocialEngineeringIcon = "/freelancers-cut/majors/SocialEngineering.png";
const TraversalIcon = "/freelancers-cut/majors/Traversal.png";
const TriangulationIcon = "/freelancers-cut/majors/Triangulation.png";
const EquipmentSpecialistIcon =
  "/freelancers-cut/majors/EquipmentSpecialist.png";
const InconspicuousIcon = "/freelancers-cut/majors/Inconspicuous.png";

const AdvancedProtocols: Perk = {
  name: "Advanced Protocols",
  perkType: PerkType.Major,
  icon: AdvancedProtocolsIcon,
  description: setAbility([
    "Extra hacking options are available in the network menu.",
    "Extra hacking options are unlocked.",
    "All extra hacking options are unlocked.",
  ]),
} as const;

const Agility: Perk = {
  name: "Agility",
  perkType: PerkType.Major,
  icon: AgilityIcon,
  description: setAbility([
    "Crouched movement and sprinting are both faster.",
    "Stamina recovery is faster.",
    "Allows you to crouch sprint keeping low while moving fast.",
  ]),
} as const;

const Awareness: Perk = {
  name: "Awareness",
  perkType: PerkType.Major,
  icon: AwarenessIcon,
  description: setAbility([
    "Marking last longer and reveals inventories.",
    "Automatically mark people nearby when performing suspicious actions.",
    "Increase range of automatic marking and allow manually marking 4 people at once instead of 2.",
  ]),
} as const;

const BruteStrength: Perk = {
  name: "Brute Strength",
  perkType: PerkType.Major,
  icon: BruteStrengthIcon,
  description: setAbility([
    "Pickup bodies faster and move faster while encumbered.",
    "some objects can be moved, opening new router or blocking enemies.",
    "Certain doors can be kicked open and you can perform unarmed takedowns.",
  ]),
} as const;

const Climber: Perk = {
  name: "Climber",
  perkType: PerkType.Major,
  icon: ClimberIcon,
  description: setAbility([
    "Climbing up ladders and ledges is faster.",
    "Pipes can be climbed, opening up new routes.",
    "Jump higher while sprinting and fall further without being incapacitated.",
  ]),
} as const;

const ElectricalEngineering: Perk = {
  name: "Electrical Engineering",
  perkType: PerkType.Major,
  icon: ElectricalEngineeringIcon,
  description: setAbility([
    "Unlocks the rewire kit, used to bypass certain electronic security measures.",
    "Allows you to overload power boxes, permanently killing power without extra suspicion.",
    "The rewire kit can be used on more advanced or uncommon devices.",
  ]),
} as const;

const EquipmentSpecialist: Perk = {
  name: "Equipment Specialist",
  perkType: PerkType.Major,
  icon: EquipmentSpecialistIcon,
  description: setAbility([
    "Tech tools and the hacking tablet cost 50% less in loadouts.",
    "Two extra space available in loadouts.",
    "Allows you to use two item mods per item instead of one.",
  ]),
} as const;

const Intimidation: Perk = {
  name: "Intimidation",
  perkType: PerkType.Major,
  icon: IntimidationIcon,
  description: setAbility([
    "Stealthy holdups are quieter, work on Level 3 guards and can be performed in convertsation.",
    "Disarm faster and search while disarming. Surprise holdups work on Level 2 guards. Conversation holdups in will make civilians temporarily cooperative.",
    "Suprise holdups work on Level 3 guards. Conversation holdups will make Level 1 or 2 guards temporarily cooperative.",
  ]),
} as const;

const Inconspicuous: Perk = {
  name: "Inconspicuous",
  perkType: PerkType.Major,
  icon: InconspicuousIcon,
  description: setAbility([
    "Walking is silent and running makes less noise.",
    "Weapons one size larger can be concealed and people can't detect you from as far away.",
    "All non-movement noises you make are now also quieter.",
  ]),
} as const;

const LockArtist: Perk = {
  name: "Lock Artist",
  perkType: PerkType.Major,
  icon: LockArtistIcon,
  description: setAbility([
    "Some lockpicking progress will be recovered if lockpicking is interrupted.",
    "More difficult locks can be lockpicked.",
    "You can crack safes without the combination.",
  ]),
} as const;

const Pickpocket: Perk = {
  name: "Pickpocket",
  perkType: PerkType.Major,
  icon: PickpocketIcon,
  description: setAbility([
    "Allows you to pickpocket items from most civilians and less aware guards.",
    "Pickpocketing is faster. Items can be pickpocketed from more aware targets.",
    "Reduces the detection radius of pickpocketing. You can steal weapons from guards, but his alerts the target.",
  ]),
} as const;

const RemoteAccess: Perk = {
  name: "Remote Access",
  perkType: PerkType.Major,
  icon: RemoteAccessIcon,
  description: setAbility([
    "You can directly compromise two access points instead of one. The hacking tablet is required to access the network menu.",
    "Remote access can also be used on network switches, a more central component of device networks.",
    "Remote access can be used three times.",
  ]),
} as const;

const SocialEngineering: Perk = {
  name: "Social Engineering",
  perkType: PerkType.Major,
  icon: SocialEngineeringIcon,
  description: setAbility([
    "Unlocks extra options for bluffing and lying when talking with certain NPCs.",
    "More extra options are available in conversations or confrontations.",
    "All extra options are available in conversations or confrontations.",
  ]),
} as const;

const Traversal: Perk = {
  name: "Traversal",
  perkType: PerkType.Major,
  icon: TraversalIcon,
  description: setAbility([
    "Reduce the network resource cost of the Traversal hack by 20%.",
    "Traversal from a directly compromised node has reduced detection risk.",
    "Traversal can travel one node further away from a physically compromised node.",
  ]),
} as const;

const Triangulation: Perk = {
  name: "Triangulation",
  perkType: PerkType.Major,
  icon: TriangulationIcon,
  description: setAbility([
    "Unlocks the ping hack, allowing certain devices to be easily located.",
    "Unlocks the device scan hack, which automatically marks nearby NPCs.",
    "Access Points are automatically revealed at the start of the mission and are automatically marked when nearby.",
  ]),
} as const;

export const majors = {
  AdvancedProtocols,
  Agility,
  Awareness,
  BruteStrength,
  Climber,
  ElectricalEngineering,
  EquipmentSpecialist,
  Intimidation,
  Inconspicuous,
  LockArtist,
  Pickpocket,
  RemoteAccess,
  SocialEngineering,
  Traversal,
  Triangulation,
};
