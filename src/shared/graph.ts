export type AdjacencyList = Map<string, string[]>;

export function buildAdjacencyList(
  connections: [string, string][],
): AdjacencyList {
  const graph: AdjacencyList = new Map();

  for (const [a, b] of connections) {
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

export function shortestValidPath(
  graph: AdjacencyList,
  unlockedNodes: Set<string>,
  targetNodeId: string,
  canUnlock: (currentUnlocked: Set<string>, nodeToUnlock: string) => boolean,
): string[] | null {
  if (unlockedNodes.has(targetNodeId)) return [];

  const queue: { node: string; path: string[] }[] = [];
  for (const startNode of unlockedNodes) {
    queue.push({ node: startNode, path: [] });
  }

  const visited = new Map<string, Set<string>>();

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;

    for (const neighbor of graph.get(node) ?? []) {
      if (unlockedNodes.has(neighbor)) continue;

      const currentUnlocked = new Set([...unlockedNodes, ...path]);
      if (canUnlock(currentUnlocked, neighbor)) {
        const newPath = [...path, neighbor];
        if (neighbor === targetNodeId) return newPath;

        const pathSet = new Set(newPath);
        const existingPaths = visited.get(neighbor);
        if (existingPaths) {
          continue;
        }

        visited.set(neighbor, pathSet);
        queue.push({ node: neighbor, path: newPath });
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

