import { useEntryPointStore } from "../../store/entry-point";

export function useUnlockedNodes() {
  const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
  const unlockNode = useEntryPointStore((s) => s.unlockNode);
  const lockNode = useEntryPointStore((s) => s.lockNode);

  return { unlockedNodes, unlockNode, lockNode };
}
