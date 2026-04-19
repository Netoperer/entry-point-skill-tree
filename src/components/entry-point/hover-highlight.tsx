import { useEffect } from "react";
import { useEntryPointStore } from "store/entry-point";
import { EntryPointGraph } from "core/entry-point/graph";
import { getUnlockableNodes } from "core/entry-point/can-unlock-node";
import { getNodesToRemove } from "core/entry-point/handle-click";

export function HoverHighlight() {
  const hoveredNode = useEntryPointStore((s) => s.hoveredNode);
  const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
  const starterClass = useEntryPointStore((s) => s.starterClass);
  const perkLimit = useEntryPointStore((s) => s.perkLimit);
  const setSelectedNodes = useEntryPointStore((s) => s.setSelectedNodes);
  const removeSelection = useEntryPointStore((s) => s.removeSelection);

  useEffect(() => {
    if (!hoveredNode || hoveredNode === starterClass) {
      removeSelection();
      return;
    }

    const isLocked = !unlockedNodes.has(hoveredNode);

    if (isLocked) {
      const path = EntryPointGraph.pathToClosestUnlocked(
        hoveredNode,
        unlockedNodes,
        perkLimit,
      );
      if (!path) {
        removeSelection();
        return;
      }

      const unlockableNodes = getUnlockableNodes(
        unlockedNodes,
        perkLimit,
        path,
      );

      setSelectedNodes(new Set(unlockableNodes));
    } else {
      const nodesToLock = getNodesToRemove(
        hoveredNode,
        unlockedNodes,
        starterClass,
      );
      setSelectedNodes(nodesToLock);
    }
  }, [
    hoveredNode,
    unlockedNodes,
    starterClass,
    setSelectedNodes,
    removeSelection,
    perkLimit,
  ]);

  return null;
}
