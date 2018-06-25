import        java.util.Arrays;
import        java.util.ArrayList;
import        java.util.List;
import static java.util.stream.Collectors.toList;

public class Pathfinding {

    public static <A> List<List<A>> findPaths(
        A start, A end, List<A> nodes,
        java.util.function.BiFunction<A, A, Boolean> connected
    ) {

        List<List<A>> paths = new ArrayList<>();
        List<A> startPath = new ArrayList<>();
        List<A> visited = new ArrayList<>();

        visited.add(start);
        startPath.add(start);
        paths.add(startPath);

        while (true) {

            // all paths were dead ends, no path to end
            if (paths.isEmpty()) return paths;

            // find any finished paths
            List<List<A>> finished = paths.stream()
                .filter(path -> path.get(path.size() - 1).equals(end))
                .collect(toList());

            // if there are finished paths, return them
            if (!finished.isEmpty()) return finished;

            // update visited nodes
            for (List<A> path : paths) visited.add(path.get(path.size() - 1));

            // expand each path to all unvisited connections
            List<List<A>> newPaths = new ArrayList<>();

            for (List<A> path : paths) {

                List<A> connections = nodes.stream()
                    .filter(node ->
                        connected.apply(node, path.get(path.size() - 1))
                        && !visited.contains(node)
                    )
                    .collect(toList());

                for (A connection : connections) {
                    List<A> newPath = path.stream().collect(toList());
                    newPath.add(connection);
                    newPaths.add(newPath);
                }
            }

            paths = newPaths;
        }
    }

    public static void main(String[] args) throws Throwable {

        String input = new String(
            java.nio.file.Files.readAllBytes(
                java.nio.file.Paths.get("/dev/stdin")));

        List<List<Integer>> matrix =
            Arrays.stream(
                input
                    .replaceAll("\\s+", "")
                    .replaceAll("\\[(.*)\\]", "$1")
                    .split("(?<=\\]),(?=\\[)")
            )
            .map(inner ->
                Arrays.stream(
                    inner
                        .replaceAll("\\[(.*)\\]", "$1")
                        .split(",")
                )
                .map(n -> Integer.valueOf(n))
                .collect(toList())
            )
            .collect(toList());

        List<Integer> nodes = new ArrayList<>();

        for (int i = 0; i < matrix.get(0).size(); i++) nodes.add(i);

        Integer start = new java.util.Random().nextInt(nodes.size());
        Integer end = new java.util.Random().nextInt(nodes.size());

        List<List<Integer>> output = findPaths(
            start, end, nodes, (n1, n2) -> matrix.get(n1).get(n2).equals(1));

        System.out.println(output);
    }
}
