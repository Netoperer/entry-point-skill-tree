import { CONNECTIONS } from "../../config/connections";
import * as graph from "../../lib/graph";
import { useEntryPointStore } from "../../store/entry-point";

export const ADJACENCY_LIST = graph.buildAdjacencyList(CONNECTIONS);

export namespace EntryPointGraph {
  export const shortestPath = (start: string, end: string): string[] | null =>
    graph.shortestPath(ADJACENCY_LIST, start, end);

  export const reachableNodes = (start: string): Set<string> =>
    graph.reachableNodes(ADJACENCY_LIST, start);

  export function wouldDisconnect(nodeToRemove: string) {
    const { unlockedNodes, starterClass } = useEntryPointStore.getState();
    return graph.wouldDisconnect(
      ADJACENCY_LIST,
      unlockedNodes,
      nodeToRemove,
      starterClass,
    );
  }

  export function isAdjacentToUnlocked(nodeId: string) {
    const { unlockedNodes } = useEntryPointStore.getState();
    return graph.isAdjacentToUnlocked(ADJACENCY_LIST, unlockedNodes, nodeId);
  }

  export function usePathToClosestUnlocked(nodeId: string) {
    const { unlockedNodes } = useEntryPointStore.getState();
    return graph.pathToClosestUnlocked(ADJACENCY_LIST, unlockedNodes, nodeId);
  }
}
