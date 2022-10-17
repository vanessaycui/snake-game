# Color the Graph

You are given an undirected graph with a maximum degree (maximum number of edges that are incident to any given vertex) represented as `D`. Find a way to color the graph (color each vertex so no adjacent vertices have the same color) using at most `D + 1` different colors.

An example of a graph with max degree of 4, 5 vertices, and 8 edges:
     ___________
    /           \
   + ---- + ---- +
    \    / \    /
     \  /   \  /
       + --- +

We should be able to color this graph with at most 5 colors:

     ___________
    /           \
blue -- pink -- green
    \    / \    /
     \  /   \  /
    red --- yellow

A graph will be represented as an array of N GraphNode objects that are made with this class:

```js
class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = new Set(); // graph uses Set for neighbours, which means the same two vertices can't share two edges
    this.color = null;
  }
}

// example graph with 3 nodes
const a = new GraphNode('a');
const b = new GraphNode('b');
const c = new GraphNode('c');

a.neighbors.add(b);
b.neighbors.add(a);
c.neighbors.add(b);
b.neighbors.add(c);

const graph = [a, b, c];
```

