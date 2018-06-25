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

  /* extends a path to all unvisited connections */
  function scatter(
      /* current path */
      path,
      /* array of already-visited graph nodes */
      visited) {
    return nodes
        .filter(node => visited.indexOf(node) === -1)
        .filter(node => connected(node, path[path.length - 1]))
        .map(node => path.concat([node]));
  }

  /* checks if we are done. If not, recurses after scattering */
  function gather(
      /* array of paths */
      paths,
      /* array of already-visited graph nodes */
      visited) {

    // scatter returned only empty arrays. i.e., all paths are dead ends
    if (paths.length === 0) return paths;

    // return all minimal paths (if any)
    let finished = paths.filter(path => path[path.length - 1] === end);
    if (finished.length !== 0) return finished;

    // we need to go deeper
    let newVisited = visited.concat(paths.map(path => path[path.length - 1]));
    let newPaths = paths
        .reduce((acc, path) => acc.concat(scatter(path, newVisited)), []);
    return gather(newPaths, newVisited);
  }

  return gather([[start]], []);
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
