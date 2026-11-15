/** biome-ignore-all lint/style/noMagicNumbers: everything is documented */

// Uhh so the current url encoding is terrible, i've beeen getting around fixing it for
// a few months now,
// 2 way sync is terrible but i can't move to nuqs completly because of zustand's features so uhhhh idk

// TODO: migrate to this url encoding

import { base58 } from "@scure/base";
import { BitInputStream, BitOutputStream } from "@thi.ng/bitstream";
import { RootNode } from "../types";

// so the idea is encode the url:
//
// 4 bits for the version (i dont even think ill make a version 2 but sure, just to be safe)
// 3 bits for the root node
// 8 bits for the max perk count (0-255), 255 is enough even for custom values as there are around ~140 perks?
// 3 bits for the specialization   // TODO: (oh wait lol now i realised i'd need some more space for the combat tree, i found my version 2)
// 145 bits for unlocked nodes
//
// and then compress it via base64 or base58 (i don't even remember why i used base58 in my previous
// websites, i think base64 looked ugly lol)

const VERSION = 1;
const NODE_COUNT = 145;

// TODO: fix the root node internally, not just here :/
function encodeRootNode(rootNode: RootNode) {
	switch (rootNode) {
		case RootNode.AdvancedProtocols:
			return "0";
		case RootNode.ElectricalEngineering:
			return "1";
		case RootNode.Intimidation:
			return "2";
		case RootNode.LockArtist:
			return "3";
		case RootNode.SocialEngineering:
			return "5";
		default:
			throw new Error("nuhuh");
	}
}

function decodeRootNode(id: number): RootNode {
	switch (id) {
		case 0:
			return RootNode.AdvancedProtocols;
		case 1:
			return RootNode.ElectricalEngineering;
		case 2:
			return RootNode.Intimidation;
		case 3:
			return RootNode.LockArtist;
		case 5:
			return RootNode.SocialEngineering;
		default:
			throw new Error(`Unknown root node id ${id}`);
	}
}

interface Encode {
	/// "0" ..= "5"
	rootNode: RootNode;

	/// number 0-255
	maxPerkCount: number;

	/// "0" ..= "6"
	specialization: string;

	/// Set<"0" ..= "145">
	unlockedNodes: Set<string>;
}

export function encode({
	rootNode: oldRootNode,
	maxPerkCount,
	specialization: specializationId,
	unlockedNodes,
}: Encode) {
	const out = new BitOutputStream();
	out.write(VERSION, 4);

	const rootNode = Number.parseInt(encodeRootNode(oldRootNode), 10);
	const specialization = Number.parseInt(specializationId, 10);

	if (rootNode < 0 || rootNode > 7) {
		throw new Error("Root node is out of bounds");
	}

	if (maxPerkCount > 255 || maxPerkCount < 0) {
		throw new Error("Max perk count is out of bounds");
	}

	if (specialization > 7 || specialization < 0) {
		throw new Error("Specialization is out of bounds");
	}

	out.write(rootNode, 3);
	out.write(maxPerkCount, 8);
	out.write(specialization, 3);

	const unlocked = new Set<number>();

	for (const nodeId of unlockedNodes) {
		const node = Number(nodeId);
		if (!Number.isInteger(node) || node < 0 || node > NODE_COUNT) {
			throw new Error(`Invalid node id "${node}"`);
		}

		unlocked.add(node);
	}

	for (let i = 0; i < NODE_COUNT; i++) {
		out.writeBit(unlocked.has(i) ? 1 : 0);
	}

	return base58.encode(out.bytes());
}

export function decode(encoded: string): Encode {
	const bytes = base58.decode(encoded);

	const input = new BitInputStream(bytes);

	// TODO: stop ignoring the version
	input.read(4);

	const rootNode = input.read(3);
	const maxPerkCount = input.read(8);
	const specialization = input.read(3);

	const unlockedNodes = new Set<string>();
	for (let i = 0; i < NODE_COUNT; i++) {
		if (input.readBit()) {
			unlockedNodes.add(String(i));
		}
	}

	return {
		rootNode: decodeRootNode(rootNode),
		maxPerkCount,
		specialization: String(specialization),
		unlockedNodes,
	};
}
