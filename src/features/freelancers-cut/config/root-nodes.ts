// export enum RootNode {
// 	AdvancedProtocols = "0",
// 	ElectricalEngineering = "65",
// 	Intimidation = "84",
// 	LockArtist = "87",
// 	SocialEngineering = "126",
// }

export const RootNodes = {
	"0": "0",
	"1": "65",
	"2": "84",
	"3": "87",
	"4": "126",
} as const;

export type RootNode = keyof typeof RootNodes;
