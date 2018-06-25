# pathfinding

shortest path on a graph, implemented in several languages

## Input

The program must read its input from stdin.
The input represents the adjacency matrix of an arbitrary simple graph.
The input will be encoded as a JSON number array array, where each number is always `0` or `1`.
More, the lengths of the inner arrays and the length of the outer array will always be the same.
The program must parse and handle all valid input as described above.

## Output

The program must write its output to stdout.
The output must be a valid JSON number array array.
Each inner array represents a minimal-length path from a randomly-selected start node to a randomly-selected end node (with nodes labeled by integers).
The program must find all minimal paths from the start to the end.
The outer may be in arbitrary ordered.

## Example

**Input:**

```
[[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0]]
```

_program labels nodes `[0,1,2,3]` and randomly-selects `2` and `3` as start and end_

**Output:**

`[[2,1,3],[2,4,3]]`
