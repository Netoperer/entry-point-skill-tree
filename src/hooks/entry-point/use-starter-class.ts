import { useEntryPointStore } from "../../store/entry-point";

export function useStarterClass() {
  const starterClass = useEntryPointStore((s) => s.starterClass);

  return starterClass;
}
