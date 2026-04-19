import { useEntryPointStore } from "../../store/entry-point";
import { EntryPointGraph } from "./graph";

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
      if (path) {
        unlockNodes(path);
      }
    } else {
      unlockNode(id);
    }
  }
}
