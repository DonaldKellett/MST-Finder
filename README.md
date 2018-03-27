# MST-Finder

This Program uses Prim's Algorithm to find a Minimum Spanning Tree.  As of 29/08/15, the program can only deal with 4 vertices.  More complete versions will be released in the future.

## About Prim's Algorithm

Prim's algorithm is a greedy algorithm that finds the minimum spanning tree in a given graph. Starting from a vertex s, the graph is explored outward. A node with minimum cost is added to the solution set at each step.

## Algorithm Pseudocode

```
G = (V, E)
s ∈ V, S ⟸ {s}, T ⟸ ø
Repeat for |V|-1 steps
  Find edge e=(u,v) ∈ E with u ∈ S and v ∉ S of minimum cost
    Add v to S
    Add e to T
End Repeat
Return T
```
