import {
	createParser,
	parseAsInteger,
	parseAsStringEnum,
	useQueryState,
} from "nuqs";
import { useEffect, useRef } from "react";
import { areSetsEqual } from "@/shared/utils/are-sets-equal";
import { decode, encode } from "@/shared/utils/compress-url";
import { useFreelancersCutStore } from "../store";
import { RootNode } from "../types";

const parseAsSet = createParser({
	parse(queryValue) {
		return decode(queryValue);
	},
	serialize(value) {
		return encode(value);
	},
});

// Yes i know this file is a mess
// biome-ignore lint/complexity/noExcessiveLinesPerFunction: war crimes are happening in there
export function UrlSync() {
	const [unlockedQuery, setUnlockedQuery] = useQueryState(
		"unlocked",
		parseAsSet.withDefault(new Set<string>([RootNode.LockArtist])),
	);

	const [rootNodeQuery, setRootNodeQuery] = useQueryState(
		"rootNode",
		parseAsStringEnum<RootNode>(Object.values(RootNode)).withDefault(
			RootNode.LockArtist,
		),
	);

	const [perkLimitQuery, setPerkLimitQuery] = useQueryState(
		"perkLimit",
		parseAsInteger.withDefault(50),
	);

	const unlockedNodes = useFreelancersCutStore((s) => s.unlockedNodes);
	const starterClass = useFreelancersCutStore((s) => s.rootNode);
	const perkLimit = useFreelancersCutStore((s) => s.perkLimit);
	const setUnlocked = useFreelancersCutStore((s) => s.setUnlocked);
	const setRootNode = useFreelancersCutStore((s) => s.setRootNode);
	const setPerkLimit = useFreelancersCutStore((s) => s.setPerkLimit);

	// Track the state that we last successfully synced to both URL and Store
	const lastSyncedNodes = useRef<Set<string>>(unlockedNodes);
	const lastSyncedClass = useRef<string>(starterClass);
	const lastSyncedLimit = useRef<number>(perkLimit);

	// 1. URL -> Store
	useEffect(() => {
		if (rootNodeQuery !== lastSyncedClass.current) {
			lastSyncedClass.current = rootNodeQuery;

			if (!unlockedQuery.has(rootNodeQuery)) {
				setUnlocked(new Set([rootNodeQuery]));
			}

			setRootNode(rootNodeQuery);
		}
		if (!areSetsEqual(unlockedQuery, lastSyncedNodes.current)) {
			lastSyncedNodes.current = unlockedQuery;
			setUnlocked(unlockedQuery);
		}
		if (perkLimitQuery !== lastSyncedLimit.current) {
			lastSyncedLimit.current = perkLimitQuery;
			setPerkLimit(perkLimitQuery);
		}
	}, [
		unlockedQuery,
		rootNodeQuery,
		perkLimitQuery,
		setUnlocked,
		setRootNode,
		setPerkLimit,
	]);

	// 2. Store -> URL
	useEffect(() => {
		if (starterClass !== lastSyncedClass.current) {
			lastSyncedClass.current = starterClass;
			setRootNodeQuery(starterClass, { shallow: true });
		}
		if (!areSetsEqual(unlockedNodes, lastSyncedNodes.current)) {
			lastSyncedNodes.current = unlockedNodes;
			setUnlockedQuery(unlockedNodes, { shallow: true });
		}
		if (perkLimit !== lastSyncedLimit.current) {
			lastSyncedLimit.current = perkLimit;
			setPerkLimitQuery(perkLimit, { shallow: true });
		}
	}, [
		unlockedNodes,
		starterClass,
		perkLimit,
		setUnlockedQuery,
		setRootNodeQuery,
		setPerkLimitQuery,
	]);

	return null;
}
