import System.Random (randomRIO)

findPaths :: Eq a => a -> a -> [a] -> (a -> a -> Bool) -> [[a]]
findPaths start end nodes connected = gather [[start]] [start] where

    scatter path visited = (:path) <$> filter keep nodes where
        keep node = not (node `elem` visited) && node `connected` head path

    gather paths visited = case (paths, finished) of
        ([], _) -> []
        (_, []) -> gather newPaths newVisited
        _       -> reverse <$> finished
      where
        finished = filter ((end ==) . head) paths
        newVisited = visited ++ (head <$> paths)
        newPaths = (\path -> scatter path newVisited) =<< paths

main :: IO ()
main = do
    matrix <- read <$> getContents
    start <- randomRIO (0, length (head matrix) - 1)
    end <- randomRIO (0, length (head matrix) - 1)
    let nodes = [0..length (head matrix) - 1]
        output = findPaths start end nodes (\i j -> matrix !! i !! j == 1)
    print output
