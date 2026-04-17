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
  const remaining = new Set(unlockedNodes);
  remaining.delete(nodeToRemove);

  if (remaining.size === 0) return false;

  if (!remaining.has(root)) return true;

  const visited = new Set<string>();
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;
    visited.add(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (remaining.has(neighbor)) stack.push(neighbor);
    }
  }

  return [...remaining].some((n) => !visited.has(n));
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

  let shortest: string[] | null = null;

  for (const unlocked of unlockedNodes) {
    const path = shortestPath(graph, nodeId, unlocked);
    if (path && (!shortest || path.length < shortest.length)) {
      shortest = path;
    }
  }

  return shortest;
}
