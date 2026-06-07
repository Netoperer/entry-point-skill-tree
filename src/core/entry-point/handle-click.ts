import { useEntryPointStore } from "@/store/entry-point";
import { EntryPointGraph } from "./graph";
import canUnlockNode, { getUnlockableNodes } from "./can-unlock-node";
import { getNodesToRemove } from "./get-nodes-to-remove";

export function handleClick(id: string) {
  const { isAdjacentToUnlocked } = EntryPointGraph;

  const {
    unlockedNodes,
    starterClass,
    unlockNode,
    unlockNodes,
    lockNodes,
    perkLimit,
  } = useEntryPointStore.getState();

  const isUnlocked = unlockedNodes.has(id);

  if (isUnlocked) {
    if (starterClass == id) {
      return;
    }

    const nodesToLock = getNodesToRemove(id, unlockedNodes, starterClass);
    lockNodes(Array.from(nodesToLock));
  } else {
    if (!isAdjacentToUnlocked(id, unlockedNodes)) {
      const path = EntryPointGraph.pathToClosestUnlocked(
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
