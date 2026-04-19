import { CONNECTIONS } from "../../config/connections";
import * as graph from "../shared/graph";
import { StarterClass } from "../../types";

export const ADJACENCY_LIST = graph.buildAdjacencyList(CONNECTIONS);

export namespace EntryPointGraph {
  export const shortestPath = (start: string, end: string): string[] | null =>
    graph.shortestPath(ADJACENCY_LIST, start, end);

  export const reachableNodes = (start: string): Set<string> =>
    graph.reachableNodes(ADJACENCY_LIST, start);

  export function wouldDisconnect(
    nodeToRemove: string,
    unlockedNodes: Set<string>,
    starterClass: StarterClass,
  ) {
    return graph.wouldDisconnect(
      ADJACENCY_LIST,
      unlockedNodes,
      nodeToRemove,
      starterClass,
    );
  }

  export function isAdjacentToUnlocked(
    nodeId: string,
    unlockedNodes: Set<string>,
  ) {
    return graph.isAdjacentToUnlocked(ADJACENCY_LIST, unlockedNodes, nodeId);
  }

  export function pathToClosestUnlocked(
    nodeId: string,
    unlockedNodes: Set<string>,
  ) {
    return graph.pathToClosestUnlocked(ADJACENCY_LIST, unlockedNodes, nodeId);
  }

  export function getDisconnectedNodes(
    nodeToRemove: string,
    unlockedNodes: Set<string>,
    starterClass: StarterClass,
  ) {
    return graph.getDisconnectedNodes(
      ADJACENCY_LIST,
      unlockedNodes,
      nodeToRemove,
      starterClass,
    );
  }
}
