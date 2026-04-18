import { useCallback } from "react";
import { useIsAdjacentToUnlocked, useWouldDisconnect } from "./use-graph";
import { useStarterClass } from "./use-starter-class";
import { useUnlockedNodes } from "./use-unlocked-nodes";

export function useHandleClick() {
  const { unlockedNodes, lockNode, unlockNode } = useUnlockedNodes();
  const starterClass = useStarterClass();
  const isAdjacentToUnlocked = useIsAdjacentToUnlocked();
  const wouldDisconnect = useWouldDisconnect();

  return useCallback(
    (id: string) => {
      const isLocked = !unlockedNodes.has(id);
      console.log("click");

      if (!isLocked) {
        if (wouldDisconnect(id)) {
          console.log("click2");
          return;
        }

        if (starterClass == id) {
          console.log("click3");
          return;
        }

        lockNode(id);
        return;
      }

      if (!isAdjacentToUnlocked(id)) {
        console.log("click4");
        return;
      }

      unlockNode(id);
    },
    [unlockedNodes, starterClass],
  );
}
