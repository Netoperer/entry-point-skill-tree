import type { RootNode } from "@/features/freelancers-cut/types";
import { FreelancersCutGraph } from "./graph";

export function getNodesToRemove(
  id: string,
  unlockedNodes: Set<string>,
  rootNode: RootNode,
): Set<string> {
  const { getDisconnectedNodes } = FreelancersCutGraph;

  const nodesToLock = new Set<string>();
  const nextUnlockedNodes = new Set(unlockedNodes);
  const queue = [id];

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    if (nodesToLock.has(nodeId)) continue;

    const currentNodes = new Set(nextUnlockedNodes);
    nodesToLock.add(nodeId);
    nextUnlockedNodes.delete(nodeId);

    const disconnected = getDisconnectedNodes(currentNodes, nodeId, rootNode);
    for (const d of disconnected) {
      queue.push(d);
    }

    // const invalid = getInvalidNodes(nextUnlockedNodes);
    // for (const i of invalid) {
    //   queue.push(i);
    // }
  }

  return nodesToLock;
}

