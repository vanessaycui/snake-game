# 2nd Largest

Given the following BinaryTreeNode class, write a function that accepts the root node of a tree as an argument and returns the 2nd largest element in a binary search tree.

```js
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
```
