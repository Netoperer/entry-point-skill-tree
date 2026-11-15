import { createSelector } from "reselect";
import { getUnlockableNodes } from "@/features/freelancers-cut/core/can-unlock-node";
import { getNodesToRemove } from "@/features/freelancers-cut/core/get-nodes-to-remove";
import { FreelancersCutGraph } from "@/features/freelancers-cut/core/graph";
import type { StoreState } from "../index";

const getHoveredNode = (state: StoreState) => state.hoveredNode;
const getUnlockedNodes = (state: StoreState) => state.unlockedNodes;
const getRootNode = (state: StoreState) => state.rootNode;
const getPerkLimit = (state: StoreState) => state.perkLimit;
const getDisconnectInduvidually = (state: StoreState) =>
	state.disconnectInduvidually;

export const selectSelectedNodes = createSelector(
	[
		getHoveredNode,
		getUnlockedNodes,
		getRootNode,
		getPerkLimit,
		getDisconnectInduvidually,
	],
	// biome-ignore lint/complexity/useMaxParams: need it
	(hoveredNode, unlockedNodes, rootNode, perkLimit, disconnectInduvidually) => {
		if (!hoveredNode || hoveredNode === rootNode) {
			return new Set<string>();
		}

		const isLocked = !unlockedNodes.has(hoveredNode);

		if (isLocked) {
			const path = FreelancersCutGraph.pathToClosestUnlocked(
				hoveredNode,
				unlockedNodes,
				perkLimit,
			);
			if (!path) {
				return new Set<string>();
			}

			const unlockableNodes = getUnlockableNodes(
				unlockedNodes,
				perkLimit,
				path,
			);

			return new Set(unlockableNodes);
		}

		if (disconnectInduvidually) {
			return new Set<string>([hoveredNode]);
		}

		const nodesToLock = getNodesToRemove(hoveredNode, unlockedNodes, rootNode);
		return nodesToLock;
	},
);
