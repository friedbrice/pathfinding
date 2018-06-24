/* returns all minimal-length paths from 'start' to 'end' in a graph */
function paths(
    /* the starting node */
    start,
    /* the ending node */
    end,
    /* array of all nodes in the graph */
    nodes,
    /* given two nodes, tells if they are connected */
    connected) {

  /* a leaf is an object with two properties:
   *   - 'node', a node of the graph
   *   - 'path', a path from the node back to the start
   */

  /* returns the array of all unvisited leaves adjacent to 'current' */
  function scatter(
      /* current leaf */
      current,
      /* array of already-visited graph nodes */
      visited) {
    return nodes
        .filter(node => visited.indexOf(node) === -1)
        .filter(node => connected(node, current.node))
        .map(node => {
          return {
            node: node,
            path: current.path.concat([node])
          };
        });
  }

  /* checks if we are done. If not, recurses after scattering */
  function gather(
      /* array of leaves */
      leaves,
      /* array of already-visited graph nodes */
      visited) {

    // scatter returned only empty arrays. i.e., all paths are dead ends
    if (leaves.length === 0) return [];

    // return all minimal paths (if any)
    let finished = leaves.filter(leaf => leaf.node === end);
    if (finished.length !== 0) return finished.map(leaf => leaf.path);

    // we need to go deeper
    let newVisited = visited.concat(leaves.map(leaf => leaf.node));
    let newLeaves = leaves
        .reduce((acc, leaf) => acc.concat(scatter(leaf, newVisited)), []);
    return gather(newLeaves, newVisited);
  }

  let init = [{
    node: start,
    path: [start]
  }];

  return gather(init, [start]);
}

/* converts an adjacency matrix to a node set and adjacency predicate */
function makeGraph(matrix) {
  return {
    nodes: [...Array(matrix[0].length).keys()],
    connected: function (v1, v2) {
      return matrix[v1][v2] === 1;
    }
  };
}

let fs = require('fs');

let input = fs.readFileSync('/dev/stdin');
let parsed = JSON.parse(input);
let graph = makeGraph(parsed);

let start = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
let end = graph.nodes[Math.floor(Math.random() * graph.nodes.length)];
let output = paths(start, end, graph.nodes, graph.connected);

console.log(output);
