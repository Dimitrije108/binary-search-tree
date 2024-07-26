# Binary Search Tree

A Binary Search Tree factory function containing methods:

- Tree(array) - build a balanced BST with the given array;
- getRoot() - return the tree’s root node;
- insert(value) - insert a given value in correct location;
- deleteItem(value) - delete a given value in a correct way;
- find(value) - return the node with the given value;

- levelOrder(callback) - breadth-first traversal passing each node to the provided callback;
- levelOrderRec(callback) - breadth-first traversal passing each node to the provided callback using recursion;
- inOrder(callback) - In-order depth-first traversal passing each node to the provided callback;
- preOrder(callback) - Pre-order depth-first traversal passing each node to the provided callback;
- postOrder(callback) - Post-order depth-first traversal passing each node to the provided callback;
- height(node) - return the given node’s height;
- depth(node) - return the given node’s depth;
- isBalanced() - check if the tree is balanced;
- rebalance() - rebalance an unbalanced tree;

Helper functions:

- prettyPrint(node) - console print the tree structure;
- arrRandomizer(length) - randomize array of given length with number values less than 100;
- initBST() - initialize and test a tree;
