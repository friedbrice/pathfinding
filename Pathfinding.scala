object Pathfinding extends App {

  def findPaths[A](start: A, end: A, nodes: List[A])
                  (connected: (A, A) => Boolean): List[List[A]] = {

    def scatter(path: List[A], visited: List[A]): List[List[A]] =
      nodes.filter { node =>
        !(visited contains node) && connected(node, path.head)
      }.map(_ +: path)

    def gather(paths: List[List[A]], visited: List[A]): List[List[A]] = {
      lazy val finished = paths.filter(_.head == end)
      lazy val newVisited = visited ++ paths.map(_.head)
      lazy val newPaths = paths.flatMap(scatter(_, newVisited))

      (paths, finished) match {
        case (Nil, _) => Nil
        case (_, Nil) => gather(newPaths, newVisited)
        case _ => finished.map(_.reverse)
      }
    }

    gather(paths = List(List(start)), visited = List(start))
  }

  val input = scala.io.Source.fromFile("/dev/stdin").mkString
    .replaceAll("\\s+", "")
    .replaceAll("\\[(.*)\\]", "$1")
    .split("(?<=\\]),(?=\\[)").toList
    .map(_.replaceAll("\\[(.*)\\]", "$1").split(",").toList.map(_.toInt))

  val output = findPaths(
    start = scala.util.Random.nextInt(input.head.length),
    end   = scala.util.Random.nextInt(input.head.length),
    nodes = (0 until input.head.length).toList
  ) { (i, j) => input(i)(j) == 1 }

  println(output.map(_.mkString("[", ",", "]")).mkString("[", ",", "]"))
}
