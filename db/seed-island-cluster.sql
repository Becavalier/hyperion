-- 4 LeetCode grid/island problems sharing one cluster_id.
-- They'll be scheduled together (cluster occupies 1 slot in daily_count).

WITH cluster AS (SELECT gen_random_uuid() AS id)
INSERT INTO questions (title, content, category, difficulty, tags, answer_hint, cluster_id)
SELECT * FROM (VALUES

  (
    'LC 200 · Number of Islands',
$$Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example 1:**
```
Input:  grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Example 2:**
```
Input:  grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.$$,
    'algorithm', 'medium',
    ARRAY['dfs','bfs','grid','island-template'],
    NULL
  ),

  (
    'LC 695 · Max Area of Island',
$$You are given an `m x n` binary matrix `grid`. An **island** is a group of `1`'s (representing land) connected **4-directionally** (horizontal or vertical). You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value `1` in the island.

Return the maximum area of an island in `grid`. If there is no island, return `0`.

**Example 1:**
```
Input:  grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6
```

**Example 2:**
```
Input:  grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

**Constraints:**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`.$$,
    'algorithm', 'medium',
    ARRAY['dfs','bfs','grid','island-template'],
    NULL
  ),

  (
    'LC 463 · Island Perimeter',
$$You are given `row x col` `grid` representing a map where `grid[i][j] = 1` represents land and `grid[i][j] = 0` represents water.

Grid cells are connected **horizontally/vertically** (not diagonally). The `grid` is completely surrounded by water, and there is **exactly one** island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

**Example 1:**
```
Input:  grid = [
  [0,1,0,0],
  [1,1,1,0],
  [0,1,0,0],
  [1,1,0,0]
]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image.
```

**Example 2:**
```
Input:  grid = [[1]]
Output: 4
```

**Example 3:**
```
Input:  grid = [[1,0]]
Output: 4
```

**Constraints:**
- `row == grid.length`
- `col == grid[i].length`
- `1 <= row, col <= 100`
- `grid[i][j]` is `0` or `1`.
- There is exactly one island in `grid`.$$,
    'algorithm', 'easy',
    ARRAY['grid','island-template'],
    NULL
  ),

  (
    'LC 733 · Flood Fill',
$$You are given an image represented by an `m x n` grid of integers `image`, where `image[i][j]` represents the pixel value of the image. You are also given three integers `sr`, `sc`, and `color`. Your task is to perform a **flood fill** on the image starting from the pixel `image[sr][sc]`.

To perform a **flood fill**:

1. Begin with the starting pixel and change its color to `color`.
2. Perform the same process for each pixel that is **directly adjacent** (pixels that share a side with the original pixel, either horizontally or vertically) and shares the **same color** as the starting pixel.
3. Keep repeating this process by checking neighboring pixels of the *updated* pixels and modifying their color if it matches the original color of the starting pixel.
4. The process stops when there are **no more adjacent** pixels of the original color to update.

Return the **modified** image after performing the flood fill.

**Example 1:**
```
Input:  image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1)
(i.e., the red pixel), all pixels connected by a path of the same color
as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally
connected to the starting pixel.
```

**Example 2:**
```
Input:  image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored with 0, which is the
same as the target color. Therefore, no changes are made to the image.
```

**Constraints:**
- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 50`
- `0 <= image[i][j], color < 2^16`
- `0 <= sr < m`
- `0 <= sc < n`$$,
    'algorithm', 'easy',
    ARRAY['dfs','bfs','grid','island-template'],
    NULL
  )

) AS rows(title, content, category, difficulty, tags, answer_hint)
CROSS JOIN cluster;
