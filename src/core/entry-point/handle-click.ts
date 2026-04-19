import { useEntryPointStore } from "store/entry-point";
import { EntryPointGraph } from "./graph";
import canUnlockNode, { getUnlockableNodes } from "./can-unlock-node";

// FIXME: removing the Combat Mastery class while having 2 weapon masteries unlocked
// is not being handled and will result in an illegal tree
// Also current implementation does not look for shortest **possible** path
export function handleClick(id: string) {
  const { wouldDisconnect, isAdjacentToUnlocked, getDisconnectedNodes } =
    EntryPointGraph;

  const {
    unlockedNodes,
    starterClass,
    unlockNode,
    lockNode,
    unlockNodes,
    lockNodes,
    perkLimit,
  } = useEntryPointStore.getState();

  const isLocked = !unlockedNodes.has(id);

  if (!isLocked) {
    if (starterClass == id) {
      return;
    }

    if (wouldDisconnect(id, unlockedNodes, starterClass)) {
      const nodes = getDisconnectedNodes(id, unlockedNodes, starterClass);
      lockNodes([...nodes, id]);
    } else {
      lockNode(id);
    }
  } else {
    if (!isAdjacentToUnlocked(id, unlockedNodes)) {
      const path = EntryPointGraph.pathToClosestUnlocked(id, unlockedNodes);
      if (!path) {
        return;
      }

      const nodesToUnlock = getUnlockableNodes(
        unlockedNodes,
        perkLimit,
        path.reverse(),
      );
      unlockNodes(nodesToUnlock);
    } else {
      if (!canUnlockNode(unlockedNodes, perkLimit, id)) {
        return;
      }

      unlockNode(id);
    }
  }
}
