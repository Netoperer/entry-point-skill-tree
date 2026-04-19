import { useEntryPointStore } from "store/entry-point";
import { EntryPointGraph } from "./graph";
import canUnlockNode, {
  getUnlockableNodes,
  getInvalidNodes,
} from "./can-unlock-node";

export function handleClick(id: string) {
  const { wouldDisconnect, isAdjacentToUnlocked, getDisconnectedNodes } =
    EntryPointGraph;

  const {
    unlockedNodes,
    starterClass,
    unlockNode,
    unlockNodes,
    lockNodes,
    perkLimit,
  } = useEntryPointStore.getState();

  const isLocked = !unlockedNodes.has(id);

  if (!isLocked) {
    if (starterClass == id) {
      return;
    }

    const nextUnlockedNodes = new Set(unlockedNodes);
    nextUnlockedNodes.delete(id);

    const nodesToLock = [id];

    if (wouldDisconnect(id, unlockedNodes, starterClass)) {
      const disconnected = getDisconnectedNodes(
        id,
        unlockedNodes,
        starterClass,
      );
      for (const n of disconnected) {
        nodesToLock.push(n);
        nextUnlockedNodes.delete(n);
      }
    }

    const invalidNodes = getInvalidNodes(nextUnlockedNodes);
    lockNodes([...nodesToLock, ...invalidNodes]);
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
