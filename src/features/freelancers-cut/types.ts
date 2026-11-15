export interface PerkEntry {
	perk: Perk;
	position: Position;
}

export enum PerkType {
	Minor = 0,
	Major = 1,
}

export interface Position {
	x: number;
	y: number;
}

export interface Perk {
	name: string;
	perkType: PerkType;
	icon: string;
	description: Description;
}

export interface Prerequisite {
	perk: Perk;
	count: number;
}

export interface Specialization {
	name: string;
	prerequisites: Prerequisite[];
	description: string;
	icon: string;
}

export enum RootNode {
	AdvancedProtocols = "0",
	ElectricalEngineering = "65",
	Intimidation = "84",
	LockArtist = "87",
	SocialEngineering = "126",
}

export type Description = (level: number) => string;
