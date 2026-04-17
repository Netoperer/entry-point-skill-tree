import { CONNECTIONS } from "../../config/connections";
import * as graph from "../../lib/graph";
import { useStore } from "../../store";

export const ADJACENCY_LIST = graph.buildAdjacencyList(CONNECTIONS);

export namespace EntryPointGraph {
  export const shortestPath = (start: string, end: string): string[] | null =>
    graph.shortestPath(ADJACENCY_LIST, start, end);

  export const reachableNodes = (start: string): Set<string> =>
    graph.reachableNodes(ADJACENCY_LIST, start);

  export const wouldDisconnect = (nodeToRemove: string) =>
    graph.wouldDisconnect(
      ADJACENCY_LIST,
      useStore.getState().unlockedNodes,
      nodeToRemove,
      useStore.getState().starterClass,
    );

  export const isAdjacentToUnlocked = (nodeId: string) =>
    graph.isAdjacentToUnlocked(
      ADJACENCY_LIST,
      useStore.getState().unlockedNodes,
      nodeId,
    );

  export const pathToClosestUnlocked = (nodeId: string) =>
    graph.pathToClosestUnlocked(
      ADJACENCY_LIST,
      useStore.getState().unlockedNodes,
      nodeId,
    );
}
