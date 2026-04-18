import { useCallback } from "react";
import { CONNECTIONS } from "../../config/connections";
import * as graph from "../../lib/graph";
import { useUnlockedNodes } from "./use-unlocked-nodes";
import { useStarterClass } from "./use-starter-class";

export const ADJACENCY_LIST = graph.buildAdjacencyList(CONNECTIONS);

export namespace EntryPointGraph {
  export const shortestPath = (start: string, end: string): string[] | null =>
    graph.shortestPath(ADJACENCY_LIST, start, end);

  export const reachableNodes = (start: string): Set<string> =>
    graph.reachableNodes(ADJACENCY_LIST, start);
}

export function useWouldDisconnect() {
  const { unlockedNodes } = useUnlockedNodes();
  const starterClass = useStarterClass();

  return useCallback(
    (nodeToRemove: string) => {
      return graph.wouldDisconnect(
        ADJACENCY_LIST,
        unlockedNodes,
        nodeToRemove,
        starterClass,
      );
    },
    [unlockedNodes, starterClass],
  );
}

export function useIsAdjacentToUnlocked() {
  const { unlockedNodes } = useUnlockedNodes();

  return useCallback(
    (nodeId: string) => {
      return graph.isAdjacentToUnlocked(ADJACENCY_LIST, unlockedNodes, nodeId);
    },
    [unlockedNodes],
  );
}

export function usePathToClosestUnlocked() {
  const { unlockedNodes } = useUnlockedNodes();

  return useCallback(
    (nodeId: string) => {
      return graph.pathToClosestUnlocked(ADJACENCY_LIST, unlockedNodes, nodeId);
    },
    [unlockedNodes],
  );
}
