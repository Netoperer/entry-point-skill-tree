import { useEffect } from "react";
import { useEntryPointStore } from "../../store/entry-point";
import { EntryPointGraph } from "../../core/entry-point/graph";

export function HoverHighlight() {
  const hoveredNode = useEntryPointStore((s) => s.hoveredNode);
  const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
  const starterClass = useEntryPointStore((s) => s.starterClass);
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
      );
      if (!path) {
        removeSelection();
        return;
      }
      setSelectedNodes(new Set(path));
    } else {
      const nodesToDisconnect = EntryPointGraph.getDisconnectedNodes(
        hoveredNode,
        unlockedNodes,
        starterClass,
      );
      const set = new Set(nodesToDisconnect);
      set.add(hoveredNode);
      setSelectedNodes(set);
    }
  }, [
    hoveredNode,
    unlockedNodes,
    starterClass,
    setSelectedNodes,
    removeSelection,
  ]);

  return null;
}
