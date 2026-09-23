import { CONNECTIONS } from "@/features/freelancers-cut/config/perks/connections";
import {
	buildAdjacencyList,
	getDisconnectedNodes as graphGetDisconnectedNodes,
	isAdjacentToUnlocked as graphIsAdjacentToUnlocked,
	reachableNodes as graphReachableNodes,
	shortestPath as graphShortestPath,
	wouldDisconnect as graphWouldDisconnect,
	shortestValidPath,
} from "@/shared/graph";
import { withAdjacency } from "@/shared/withAdjacency";
import { canUnlockNode } from "./can-unlock-node";

function pathToClosestUnlocked(
	nodeId: string,
	unlockedNodes: Set<string>,
	perkLimit: number,
) {
	return shortestValidPath(
		ADJACENCY_LIST,
		unlockedNodes,
		nodeId,
		(current, id) => canUnlockNode(current, perkLimit, id),
	);
}

export const ADJACENCY_LIST = buildAdjacencyList(CONNECTIONS);

export const FreelancersCutGraph = {
	shortestPath: withAdjacency(ADJACENCY_LIST, graphShortestPath),
	reachableNodes: withAdjacency(ADJACENCY_LIST, graphReachableNodes),
	wouldDisconnect: withAdjacency(ADJACENCY_LIST, graphWouldDisconnect),
	isAdjacentToUnlocked: withAdjacency(
		ADJACENCY_LIST,
		graphIsAdjacentToUnlocked,
	),
	getDisconnectedNodes: withAdjacency(
		ADJACENCY_LIST,
		graphGetDisconnectedNodes,
	),
	pathToClosestUnlocked,
};
