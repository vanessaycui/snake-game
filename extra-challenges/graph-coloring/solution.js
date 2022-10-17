// We simply go through all the nodes in the graph in one loop, and assign each node the first color
// that has not already been used by it's neighboring nodes. We know that we will always be able to find a color
// for the node, because there will always be at least one more color than number of neighbors.

// This solution runs in O(n + m) time where n is the number of nodes and m is the total number of edges

/**
 * @param {array} graph - array of GraphNodes
 * @param {array} colors - array of colors
 */

function colorGraph(graph, colors) {
  graph.forEach((node) => {
    // check if the node has an edge that connects back to itself
    if (node.neighbors.has(node)) {
      throw new Error(`Legal coloring impossible for node with loop: ${node.label}`);
    }

    // get the node's neighbors' colors, as a set so we
    // can check if a color is illegal in constant time
    const neighborColors = new Set();

    // if any of the current node's neighbors have a color, they will be added to illegal colors Set
    node.neighbors.forEach((neighbor) => {
      if (neighbor.color !== null) {
        neighborColors.add(neighbor.color);
      }
    });

    // assign the first legal color
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      // the first color we find that hasn't been used by an incident vertex, we use to color this current node
      if (!neighborColors.has(color)) {
        node.color = color;
        break;
      }
    }
  });
}
