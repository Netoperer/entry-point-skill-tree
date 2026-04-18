import { useEntryPointStore } from "../../store/entry-point";
import { EntryPointGraph } from "./use-graph";

export function handleClick(id: string) {
  const { wouldDisconnect, isAdjacentToUnlocked } = EntryPointGraph;

  const { unlockedNodes, starterClass, unlockNode, lockNode } =
    useEntryPointStore.getState();

  const isLocked = !unlockedNodes.has(id);
  console.log(`Handling click for ${id}. Locked: ${isLocked}`);

  if (!isLocked) {
    if (wouldDisconnect(id)) {
      console.log("Cannot lock: would disconnect graph");
      return;
    }

    if (starterClass == id) {
      console.log("Cannot lock: starter class");
      return;
    }

    console.log(`Locking ${id}`);
    lockNode(id);
    return;
  }

  if (!isAdjacentToUnlocked(id)) {
    console.log(`Cannot unlock ${id}: not adjacent to unlocked`);
    return;
  }

  console.log(`Unlocking ${id}`);
  unlockNode(id);
}
