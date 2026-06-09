import { CONNECTIONS } from "@/config/entry-point/connections";
import * as graph from "../shared/graph";
import canUnlockNode from "./can-unlock-node";
import { withAdjacency } from "../shared/withAdjacency";

export const ADJACENCY_LIST = graph.buildAdjacencyList(CONNECTIONS);

export namespace EntryPointGraph {
  export const shortestPath = withAdjacency(ADJACENCY_LIST, graph.shortestPath);
  export const reachableNodes = withAdjacency(
    ADJACENCY_LIST,
    graph.reachableNodes,
  );
  export const wouldDisconnect = withAdjacency(
    ADJACENCY_LIST,
    graph.wouldDisconnect,
  );
  export const isAdjacentToUnlocked = withAdjacency(
    ADJACENCY_LIST,
    graph.isAdjacentToUnlocked,
  );
  export const getDisconnectedNodes = withAdjacency(
    ADJACENCY_LIST,
    graph.getDisconnectedNodes,
  );

  export function pathToClosestUnlocked(
    nodeId: string,
    unlockedNodes: Set<string>,
    perkLimit: number,
  ) {
    return graph.shortestValidPath(
      ADJACENCY_LIST,
      unlockedNodes,
      nodeId,
      (current, id) => canUnlockNode(current, perkLimit, id),
    );
  }
}
