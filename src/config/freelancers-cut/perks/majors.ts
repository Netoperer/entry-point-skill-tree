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
const OrdnanceSupplyIcon = "/freelancers-cut/majors/OrdnanceSupply.png";
const PickpocketIcon = "/freelancers-cut/majors/Pickpocket.png";
const ReliableContactsIcon = "/freelancers-cut/majors/ReliableContacts.png";
const RemoteAccessIcon = "/freelancers-cut/majors/RemoteAccess.png";
const SocialEngineeringIcon = "/freelancers-cut/majors/SocialEngineering.png";
const TraversalIcon = "/freelancers-cut/majors/Traversal.png";
const TriangulationIcon = "/freelancers-cut/majors/Triangulation.png";
const UndertakerIcon = "/freelancers-cut/majors/Undertaker.png";
const EquipmentSpecialistIcon =
  "/freelancers-cut/majors/EquipmentSpecialist.png";

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
    "30% dodge chance while sprinting.",
    "Stamina recovery is faster.",
  ]),
} as const;

const Awareness: Perk = {
  name: "Awareness",
  perkType: PerkType.Major,
  icon: AwarenessIcon,
  description: setAbility([
    "You can mark 4 NPCs at a time instead of 2.",
    "Inventory of marked NPCs is visible.",
    "NPCs stay marked for longer.",
  ]),
} as const;

const BruteStrength: Perk = {
  name: "Brute Strength",
  perkType: PerkType.Major,
  icon: BruteStrengthIcon,
  description: setAbility([
    "Carry more weight before encumbrance penalties start to apply.",
    "Some objects can be moved, opening new routes or blocking enemies.",
    "Certain doors can be kicked open.",
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
    "Makes tech items cost 50% less.",
    "Grants two extra space in the player's main inventory.",
    "Allows the player to use two modifications on a single item rather than just one.",
  ]),
} as const;

const Intimidation: Perk = {
  name: "Intimidation",
  perkType: PerkType.Major,
  icon: IntimidationIcon,
  description: setAbility([
    "Stealthy holdups of NPCs are quieter.",
    "Higher level guards can be taken hostage.",
    "Almost all guards can be taken hostage.",
  ]),
} as const;

const Inconspicuous: Perk = {
  name: "Inconspicuous",
  perkType: PerkType.Major,
  icon: "Inconspicuous",
  description: setAbility([
    "Makes walking silent and the audible range of running is reduced from 25 studs to 10.",
    "Increases the max concealable weapon size by 1 and multiplies the player's visual detection range by 0.85",
    "Multiplies the audible range of the player's non-movement noises by 0.8.",
  ]),
} as const;

const LockArtist: Perk = {
  name: "Lock Artist",
  perkType: PerkType.Major,
  icon: LockArtistIcon,
  description: setAbility([
    "Some lockpicking progress will be recovered if lockpicking is interrupted.",
    "More difficult locks can be picked.",
    "20% faster lockpicking speed while not in combat.",
  ]),
} as const;

const Pickpocket: Perk = {
  name: "Pickpocket",
  perkType: PerkType.Major,
  icon: PickpocketIcon,
  description: setAbility([
    "Allows you to pickpocket certain items from NPCs.",
    "Pickpocketing is faster.",
    "Reduces the detection radius of pickpocketing.",
  ]),
} as const;

const ReliableContacts: Perk = {
  name: "Reliable Contacts",
  perkType: PerkType.Major,
  icon: ReliableContactsIcon,
  description: setAbility([
    "Tech tools and the hacking tablet cost 25% less in loadouts.",
    "Weapons cost 25% less in loadouts.",
    "All loadout items cost an additional 15% less.",
  ]),
} as const;

const RemoteAccess: Perk = {
  name: "Remote Access",
  perkType: PerkType.Major,
  icon: RemoteAccessIcon,
  description: setAbility([
    "You can directly compromise two access points instead of one.",
    "Remote access can also be used on network switches, a more central component of device networks.",
    "Remote access can be used three times.",
  ]),
} as const;

const SocialEngineering: Perk = {
  name: "Social Engineering",
  perkType: PerkType.Major,
  icon: SocialEngineeringIcon,
  description: setAbility([
    "Unlocks extra options for bluffing and lying when talking to certain NPCs.",
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
    "Traversal can travel one node further away from a physically compromised node.",
    "Traversal from a directly compromised node has reduced detection risk.",
  ]),
} as const;

const Triangulation: Perk = {
  name: "Triangulation",
  perkType: PerkType.Major,
  icon: TriangulationIcon,
  description: setAbility([
    "Unlocks the ping hack, allowing certain devices to be easily located.",
    "Unlocks the device scan hack, which automatically marks nearby NPCs.",
    "Increases the distance nodes can be seen from the network menu.",
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
