// Assume we have an efficient queue implementation, Queue()
// with enqueue and dequeue methods and a size property
// using a Queue over an array can provide an efficient FIFO structure O(1) for both inserts and removals

// complexity O(n + m) where n is number of nodes, and m is the number of edges between nodes

function getShortestPath(graph, startNode, endNode) {
  if (!graph.hasOwnProperty(startNode)) {
    throw new Error('Start node not in graph!');
  }
  if (!graph.hasOwnProperty(endNode)) {
    throw new Error('End node not in graph!');
  }

  const nodesToVisit = new Queue();
  nodesToVisit.enqueue(startNode);

  // Keep track of what nodes we've already seen
  // so we don't process them twice
  const nodesAlreadySeen = new Set([startNode]);

  // Keep track of how we got to each node
  // we'll use this to reconstruct the shortest path at the end
  const howWeReachedNodes = {};
  howWeReachedNodes[startNode] = null;

  while (nodesToVisit.size > 0) {
    const currentNode = nodesToVisit.dequeue();

    // Stop when we reach the end node
    if (currentNode === endNode) {
      // Found it!
      return reconstructPath(howWeReachedNodes, startNode, endNode);
    }

    graph[currentNode].forEach((neighbor) => {
      if (!nodesAlreadySeen.has(neighbor)) {
        nodesAlreadySeen.add(neighbor);
        nodesToVisit.enqueue(neighbor);

        // Keep track of how we got to this node
        howWeReachedNodes[neighbor] = currentNode;
      }
    });
  }

  // If we get here, then we never found the end node
  // so there's NO path from startNode to endNode
  return null;
}

function reconstructPath(howWeReachedNodes, startNode, endNode) {
  const shortestPath = [];

  // Start from the end of the path and work backwards
  let currentNode = endNode;

  while (currentNode !== null) {
    shortestPath.push(currentNode);
    currentNode = howWeReachedNodes[currentNode];
  }

  // since we build up the path from recipient to sender, we need to reverse it to show sender to recipient
  return shortestPath.reverse();
}
