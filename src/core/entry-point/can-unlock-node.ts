import { useEntryPointStore } from "store/entry-point";

export default function CanUnlockNode(id: string): boolean {
  const { unlockedNodes } = useEntryPointStore.getState();

  return true;
}
