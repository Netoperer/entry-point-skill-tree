import { areSpecializationPrerequisitesMet } from "@/features/freelancers-cut/core/specializations";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { canUnlockNode, getUnlockableNodes } from "./can-unlock-node";
import { getNodesToRemove } from "./get-nodes-to-remove";
import { FreelancersCutGraph } from "./graph";

function clearSpecializationIfInvalid(
	specialization: string | null,
	unlockedNodes: Set<string>,
	nodesToLock: Set<string>,
	setSpecialization: (id: string | null) => void,
) {
	if (!specialization) {
		return;
	}

	const remainingUnlockedNodes = new Set(unlockedNodes);

	for (const node of nodesToLock) {
		remainingUnlockedNodes.delete(node);
	}

	if (
		!areSpecializationPrerequisitesMet(specialization, remainingUnlockedNodes)
	) {
		setSpecialization(null);
	}
}

export function handleClick(id: string) {
	const { isAdjacentToUnlocked } = FreelancersCutGraph;

	const {
		unlockedNodes,
		rootNode,
		specialization,
		perkLimit,

		unlockNode,
		unlockNodes,
		lockNodes,
		setSpecialization,

		disconnectInduvidually,
	} = useFreelancersCutStore.getState();

	const isUnlocked = unlockedNodes.has(id);

	if (isUnlocked) {
		if (rootNode === id) {
			return;
		}

		if (disconnectInduvidually) {
			lockNodes([id]);
			return;
		}

		const nodesToLock = getNodesToRemove(id, unlockedNodes, rootNode);

		lockNodes(Array.from(nodesToLock));
		clearSpecializationIfInvalid(
			specialization,
			unlockedNodes,
			nodesToLock,
			setSpecialization,
		);
	} else if (isAdjacentToUnlocked(unlockedNodes, id)) {
		if (!canUnlockNode(unlockedNodes, perkLimit, id)) {
			return;
		}

		unlockNode(id);
	} else {
		const path = FreelancersCutGraph.pathToClosestUnlocked(
			id,
			unlockedNodes,
			perkLimit,
		);
		if (!path) {
			return;
		}

		const nodesToUnlock = getUnlockableNodes(unlockedNodes, perkLimit, path);
		unlockNodes(nodesToUnlock);
	}
}
