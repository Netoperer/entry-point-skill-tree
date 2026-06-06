import { setAbility, type Description } from "../descriptions";
import { PERKS, PerkType, type Perk } from ".";

const AdvancedProtocolsIcon = "/freelancers-cut/major/AdvancedProtocols.webp";
const AgilityIcon = "/freelancers-cut/major/Agility.webp";
const ArmorProficiencyIcon = "/freelancers-cut/major/ArmorProficiency.webp";
const AwarenessIcon = "/freelancers-cut/major/Awareness.webp";
const BruteStrengthIcon = "/freelancers-cut/major/BruteStrength.webp";
const ClimberIcon = "/freelancers-cut/major/Climber.webp";
const ElectricalEngineeringIcon =
  "/freelancers-cut/major/ElectricalEngineering.webp";
const GunsmithIcon = "/freelancers-cut/major/Gunsmith.webp";
const IntimidationIcon = "/freelancers-cut/major/Intimidation.webp";
const LockArtistIcon = "/freelancers-cut/major/LockArtist.webp";
const MobileAttackerIcon = "/freelancers-cut/major/MobileAttacker.webp";
const OrdnanceSupplyIcon = "/freelancers-cut/major/OrdnanceSupply.webp";
const PerseveranceIcon = "/freelancers-cut/major/Perseverance.webp";
const PickpocketIcon = "/freelancers-cut/major/Pickpocket.webp";
const ReliableContactsIcon = "/freelancers-cut/major/ReliableContacts.webp";
const RemoteAccessIcon = "/freelancers-cut/major/RemoteAccess.webp";
const SocialEngineeringIcon = "/freelancers-cut/major/SocialEngineering.webp";
const TraversalIcon = "/freelancers-cut/major/Traversal.webp";
const TriangulationIcon = "/freelancers-cut/major/Triangulation.webp";
const UndertakerIcon = "/freelancers-cut/major/Undertaker.webp";

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

const ArmorProficiency: Perk = {
  name: "Armor Proficiency",
  perkType: PerkType.Major,
  icon: ArmorProficiencyIcon,
  description: setAbility([
    "Armor has a lower impact on your encumbrance level.",
    "All armor also protects from explosive damage.",
    "Concealed items can be used with heavy armor.",
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

const Gunsmith: Perk = {
  name: "Gunsmith",
  perkType: PerkType.Major,
  icon: GunsmithIcon,
  description: setAbility([
    "All weapon modifications are free.",
    "Certain guns can be rechambered, switching the type of ammo they fire.",
    "Certain guns can have their fire modes modified.",
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

const MobileAttacker: Perk = {
  name: "Mobile Attacker",
  perkType: PerkType.Major,
  icon: MobileAttackerIcon,
  description: setAbility([
    "Move faster while aiming down sights.",
    "Able to shoot while sprinting or sliding.",
    "Able to reload while sprinting or sliding.",
  ]),
} as const;

const OrdnanceSupply: Perk = {
  name: "Ordnance Supply",
  perkType: PerkType.Major,
  icon: OrdnanceSupplyIcon,
  description: setAbility([
    "Can bring an extra C4 to missions",
    "Loading costs for explosives are reduced by 25%.",
    "Can bring one extra of all explosives.",
  ]),
} as const;

const Perseverance: Perk = {
  name: "Perseverance",
  perkType: PerkType.Major,
  icon: PerseveranceIcon,
  description: (level, ownedNodes) => {
    const vitalityNodeCount = ownedNodes.filter(
      (perk) => perk === PERKS.Vitality,
    ).length;
    const array = [
      "Increases the amount of health you can regenerate.",
      "Shortens the amount of time it takes for health to start regenerating.",
      `Each two 'Vitality' (you have ${vitalityNodeCount}) perks you have increases the amount your health regenerates.`,
    ];

    return setAbility(array)(level, ownedNodes);
  },
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

const Undertaker: Perk = {
  name: "Undertaker",
  perkType: PerkType.Major,
  icon: UndertakerIcon,
  description: setAbility([
    "Automatically search bodies when picking them up. Both actions are also faster.",
    "Movement speed penalty for maximum encumbrance is reduced.",
    "Enemies drop more ammo and restore a small amount of health when killed.",
  ]),
} as const;

export const MAJOR_PERKS = {
  AdvancedProtocols,
  Agility,
  ArmorProficiency,
  Awareness,
  BruteStrength,
  Climber,
  ElectricalEngineering,
  Gunsmith,
  Intimidation,
  LockArtist,
  MobileAttacker,
  OrdnanceSupply,
  Perseverance,
  Pickpocket,
  ReliableContacts,
  RemoteAccess,
  SocialEngineering,
  Traversal,
  Triangulation,
  Undertaker,
};
