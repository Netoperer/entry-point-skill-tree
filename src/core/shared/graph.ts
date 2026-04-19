export type AdjacencyList = Map<string, string[]>;

export function buildAdjacencyList(
  connections: [number, number][],
): AdjacencyList {
  const graph: AdjacencyList = new Map();

  for (const [an, bn] of connections) {
    const a = `${an}`;
    const b = `${bn}`;

    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a)!.push(b);
    graph.get(b)!.push(a);
  }

  return graph;
}

export function shortestPath(
  graph: AdjacencyList,
  start: string,
  end: string,
): string[] | null {
  if (start === end) return [start];

  const visited = new Set<string>([start]);
  const queue: { node: string; path: string[] }[] = [
    { node: start, path: [start] },
  ];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;

    for (const neighbor of graph.get(node) ?? []) {
      if (neighbor === end) return [...path, neighbor];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ node: neighbor, path: [...path, neighbor] });
      }
    }
  }

  return null;
}

export function reachableNodes(
  graph: AdjacencyList,
  start: string,
): Set<string> {
  const visited = new Set<string>();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;
    visited.add(node);
    for (const neighbor of graph.get(node) ?? []) stack.push(neighbor);
  }

  return visited;
}

export function isConnectedToRoot(
  graph: AdjacencyList,
  unlockedNodes: Set<string>,
  root: string,
): boolean {
  return (
    reachableNodes(graph, root).has(root) &&
    [...unlockedNodes].every((n) => reachableNodes(graph, root).has(n))
  );
}

export function wouldDisconnect(
  graph: AdjacencyList,
  unlockedNodes: Set<string>,
  nodeToRemove: string,
  root: string,
): boolean {
  return (
    getDisconnectedNodes(graph, unlockedNodes, nodeToRemove, root).size !== 0
  );
}

export function getDisconnectedNodes(
  graph: AdjacencyList,
  unlockedNodes: Set<string>,
  nodeToRemove: string,
  root: string,
): Set<string> {
  const remaining = new Set(unlockedNodes);
  remaining.delete(nodeToRemove);

  if (remaining.size === 0 || !remaining.has(root)) {
    return remaining;
  }

  const visited = new Set<string>();
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;

    visited.add(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (remaining.has(neighbor) && !visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  const disconnected = new Set<string>();
  for (const node of remaining) {
    if (!visited.has(node)) {
      disconnected.add(node);
    }
  }

  return disconnected;
}

export function isAdjacentToUnlocked(
  graph: AdjacencyList,
  unlockedNodes: Set<string>,
  nodeId: string,
): boolean {
  return (graph.get(nodeId) ?? []).some((neighbor) =>
    unlockedNodes.has(neighbor),
  );
}

export function pathToClosestUnlocked(
  graph: AdjacencyList,
  unlockedNodes: Set<string>,
  nodeId: string,
): string[] | null {
  if (unlockedNodes.has(nodeId)) return [nodeId];

  const visited = new Set<string>([nodeId]);
  const queue: { node: string; path: string[] }[] = [
    { node: nodeId, path: [nodeId] },
  ];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;

    for (const neighbor of graph.get(node) ?? []) {
      if (unlockedNodes.has(neighbor)) return path;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ node: neighbor, path: [...path, neighbor] });
      }
    }
  }

  return null;
}
