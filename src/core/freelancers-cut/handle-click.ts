import { useFreelancersCutStore } from "@/store/freelancers-cut";
import { FreelancersCutGraph } from "./graph";
import { getNodesToRemove } from "./get-nodes-to-remove";
import canUnlockNode, { getUnlockableNodes } from "./can-unlock-node";

export function handleClick(id: string) {
  const { isAdjacentToUnlocked } = FreelancersCutGraph;

  const {
    unlockedNodes,
    rootNode,
    unlockNode,
    unlockNodes,
    lockNodes,
    perkLimit,
  } = useFreelancersCutStore.getState();

  const isUnlocked = unlockedNodes.has(id);

  if (isUnlocked) {
    if (rootNode == id) {
      return;
    }

    const nodesToLock = getNodesToRemove(id, unlockedNodes, rootNode);
    lockNodes(Array.from(nodesToLock));
  } else {
    if (!isAdjacentToUnlocked(unlockedNodes, id)) {
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
    } else {
      if (!canUnlockNode(unlockedNodes, perkLimit, id)) {
        return;
      }

      unlockNode(id);
    }
  }
}
