export function withAdjacency<Args extends unknown[], R, L>(
  adjacency_list: L,
  fn: (list: L, ...args: Args) => R,
) {
  return (...args: Args): R => fn(adjacency_list, ...args);
}
