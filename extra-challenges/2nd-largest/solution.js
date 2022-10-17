class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}

function findLargest(rootNode) {
  if (!rootNode) {
    throw new Error('Tree must have 1 node');
  }
  if (rootNode.right) {
    return findLargest(rootNode.right);
  }
  return rootNode.value;
}

function findSecondLargest(rootNode) {
  if (!rootNode || (!rootNode.left && !rootNode.right)) {
    throw new Error('Tree needs 2 nodes to get 2nd largest');
  }

  if (rootNode.left && !rootNode.right) {
    return findLargest(rootNode.left);
  }

  if (rootNode.right && !rootNode.right.left && !rootNode.right.right) {
    return rootNode.value;
  }

  return findSecondLargest(rootNode.right);
}

// Non recursive version of findSecondLargest function
// function findSecondLargest(rootNode) {
//   if (!rootNode || (!rootNode.left && !rootNode.right)) {
//     throw new Error('Tree must have at least 2 nodes');
//   }

//   let current = rootNode;

//   while (current) {

//     // Case: current is largest and has a left subtree
//     // 2nd largest is the largest in that subtree
//     if (current.left && !current.right) {
//       return findLargest(current.left);
//     }

//     // Case: current is parent of largest, and largest has no children,
//     // so current is 2nd largest
//     if (
//       current.right
//       && !current.right.left
//       && !current.right.right
//     ) {
//       return current.value;
//     }

//     current = current.right;
//   }
// }

// driver code

// first test

// let root = new BinaryTreeNode(5);

// root.insertLeft(3);
// root.insertRight(8);

// root.left.insertLeft(1);
// root.left.insertRight(4);

// root.right.insertLeft(7);
// let twelve = root.right.insertRight(12);

// twelve.insertLeft(10);
// twelve.left.insertLeft(9);
// twelve.left.insertRight(11);

// console.log(findSecondLargest(root));

// second test

let root = new BinaryTreeNode(5);

root.insertLeft(3);
root.insertRight(8);

root.left.insertLeft(1);
root.left.insertRight(4);

root.right.insertLeft(7);
root.right.insertRight(9);

console.log(findSecondLargest(root));
