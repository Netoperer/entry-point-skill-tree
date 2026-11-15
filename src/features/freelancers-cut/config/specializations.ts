import type { Specialization } from "../types";
import { Perks } from "./perks";

const NetworkTechIcon = "/freelancers-cut/specializations/NetworkTech.png";
const ChameleonIcon = "/freelancers-cut/specializations/Chameleon.png";
const EnforcerIcon = "/freelancers-cut/specializations/Enforcer.png";
const SentinelIcon = "/freelancers-cut/specializations/Sentinel.png";
const BlackHatIcon = "/freelancers-cut/specializations/BlackHat.png";
const ElectricianIcon = "/freelancers-cut/specializations/Electrician.png";

export const SPECIALIZATION_ENTRIES: { [key: string]: Specialization } = {
	"0": {
		name: "Network Tech",
		description:
			"The Pineapple can now be deployed on any flat surface and can connect to laptops and computers (not servers) connected to Access Points. Also increases how far players can traverse from a node compromised by a Pineapple by 1 node.",
		prerequisites: [
			{ count: 3, perk: Perks.RemoteAccess },
			{ count: 3, perk: Perks.Triangulation },
		],
		icon: NetworkTechIcon,
	},
	"1": {
		name: "Chameleon",
		description:
			"Grants Inconspicuous 2, Masquerade 6, and Discretion 6 to any operative that does not have those ranks or higher.",
		prerequisites: [
			{ count: 3, perk: Perks.SocialEngineering },
			{ count: 3, perk: Perks.Inconspicuous },
		],
		icon: ChameleonIcon,
	},
	"2": {
		name: "Enforcer",
		description:
			"Grants one extra rank of Intimidation to any operative that already has Intimidation (cannot exceed Intimidation 3). Additionally, armed hostages take 8 seconds longer to fight back, and unarmed hostages take 25 seconds longer to flee.",
		prerequisites: [
			{ count: 3, perk: Perks.Intimidation },
			{ count: 3, perk: Perks.BruteStrength },
		],
		icon: EnforcerIcon,
	},
	"3": {
		name: "Sentinel",
		description:
			"Grants the ability to loop any nearby intercepted camera, which requires a Hacking Tablet. Looping a camera this way generates a fixed 5 points of risk and takes 3 seconds. Only one camera can be looped at a time through this specialization.",
		prerequisites: [
			{ count: 3, perk: Perks.RemoteAccess },
			{ count: 3, perk: Perks.Awareness },
		],
		icon: SentinelIcon,
	},
	"4": {
		name: "Black Hat",
		description:
			"Grants the ability to view the network menu without requiring a Hacking Tablet.",
		prerequisites: [
			{ count: 3, perk: Perks.AdvancedProtocols },
			{ count: 3, perk: Perks.EquipmentSpecialist },
		],
		icon: BlackHatIcon,
	},
	"5": {
		name: "Electrician",
		description:
			"Grants one extra charge to the Rewire Kit, and makes the EMP free and removes its Electrical Engineering 2 requirement.",
		prerequisites: [
			{ count: 3, perk: Perks.EquipmentSpecialist },
			{ count: 3, perk: Perks.ElectricalEngineering },
		],
		icon: ElectricianIcon,
	},
};
