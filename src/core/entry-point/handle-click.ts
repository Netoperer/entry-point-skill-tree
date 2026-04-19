import { useEntryPointStore } from "store/entry-point";
import { EntryPointGraph } from "./graph";
import canUnlockNode, {
  getUnlockableNodes,
  getInvalidNodes,
} from "./can-unlock-node";

export function getNodesToRemove(
  id: string,
  unlockedNodes: Set<string>,
  starterClass: string,
): Set<string> {
  const { getDisconnectedNodes } = EntryPointGraph;
  const nodesToLock = new Set<string>();
  const nextUnlockedNodes = new Set(unlockedNodes);
  const queue = [id];

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (nodesToLock.has(nodeId)) continue;

    const currentNodes = new Set(nextUnlockedNodes);
    nodesToLock.add(nodeId);
    nextUnlockedNodes.delete(nodeId);

    const disconnected = getDisconnectedNodes(
      nodeId,
      currentNodes,
      starterClass,
    );
    for (const d of disconnected) {
      queue.push(d);
    }

    const invalid = getInvalidNodes(nextUnlockedNodes);
    for (const i of invalid) {
      queue.push(i);
    }
  }

  return nodesToLock;
}

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

  const isLocked = !unlockedNodes.has(id);

  if (!isLocked) {
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
