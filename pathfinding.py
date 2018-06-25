import json
import random
import sys

def findPaths(start, end, nodes, connected):
    paths = [[start]]
    visited = []
    while (True):
        if not paths: return paths
        finished = [ path for path in paths if path[-1] == end ]
        if finished: return finished
        visited = [*visited, *[ path[-1] for path in paths ]]
        paths = [ [*path, node] for path in paths for node in nodes
                  if node not in visited and connected(node, path[-1]) ]

matrix = json.loads(sys.stdin.read())
nodes = [ n for n in range(len(matrix[0])) ]
start = random.choice(nodes)
end = random.choice(nodes)
print(findPaths(start, end, nodes, lambda n1, n2: matrix[n1][n2] == 1))
