export function dfs(node, parent, g) {
  for (var child_id of node.adj) {
    var child = g[child_id];
    dfs(child, node, g);
  }
}
