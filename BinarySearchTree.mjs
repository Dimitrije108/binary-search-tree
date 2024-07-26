#!/usr/bin/env node

// Node factory used for balanced BST
const Node = (value, left = null, right = null) => {
  const setValue = (val) => (value = val);
  const setLeft = (val) => (left = val);
  const setRight = (val) => (right = val);

  const getValue = () => value;
  const getLeft = () => left;
  const getRight = () => right;

  return {
    setValue,
    setLeft,
    setRight,
    getValue,
    getLeft,
    getRight,
  };
};
// Removes duplicates from a sorted array
const removeDuplicates = (arr) => {
  const unique = [];
  arr.forEach((item) => {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  });
  return unique;
};
// Sorts and deletes array item duplicates and returns a balanced BST
export default function Tree(arr) {
  if (arr.length === 0 || !Array.isArray(arr))
    throw new Error("Valid array required");
  // Get a sorted array without duplicates
  const array = removeDuplicates(arr.sort((a, b) => a - b));
  // Create a balanced BST with a sorted array, return the root node
  const buildTree = (arr, start, end) => {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    const root = Node(arr[mid]);

    root.setLeft(buildTree(arr, start, mid - 1));
    root.setRight(buildTree(arr, mid + 1, end));
    // Return the level-0 root node
    return root;
  };

  let root = buildTree(array, 0, array.length - 1);

  const getRoot = () => root;
  // Insert a given value
  const insert = (value) => {
    let curr = root;
    let prev = null;
    // Check for a duplicate value, then find where to insert
    // the new value
    while (curr !== null) {
      if (curr.getValue() === value) {
        return "Duplicate value";
      }
      prev = curr;
      if (curr.getValue() > value) {
        curr = curr.getLeft();
      } else {
        curr = curr.getRight();
      }
    }

    if (prev.getValue() > value) {
      prev.setLeft(Node(value));
    } else {
      prev.setRight(Node(value));
    }
  };
  // Delete a given value
  const deleteItem = (value) => {
    if (root === null) return "Tree is empty";
    let curr = root;
    let prev = null;
    let dir = null;
    // Find the value
    while (curr.getValue() !== value) {
      prev = curr;
      if (curr.getValue() > value) {
        curr = curr.getLeft();
        dir = "left";
      } else {
        curr = curr.getRight();
        dir = "right";
      }
    }
    // Node not found
    if (!curr) return "Value not found";
    // Delete the node - 3 scenarios
    // 1. Node has 2 children
    if (curr.getLeft() && curr.getRight()) {
      // Find replacement value(smallest bigger value)
      let replacement = curr.getRight();
      while (replacement.getLeft() !== null) {
        replacement = replacement.getLeft();
      }
      const replacementVal = replacement.getValue();
      // Delete the replacement node
      deleteItem(replacementVal);
      // Replace value
      curr.setValue(replacementVal);
      return;
    }
    const child = curr.getLeft() ? curr.getLeft() : curr.getRight();
    if (!prev) {
      root = child;
    }
    if (curr.getLeft() || curr.getRight()) {
      // 2. Node has 1 child
      if (dir === "left") {
        prev.setLeft(child);
      } else {
        prev.setRight(child);
      }
    } else {
      // 3. Node has no children
      if (dir === "left") {
        prev.setLeft(null);
      } else {
        prev.setRight(null);
      }
    }
  };
  // Return the node with a given value
  const find = (value) => {
    if (root === null) return "Tree is empty";
    let curr = root;
    // Find the value
    while (curr !== null) {
      if (curr.getValue() === value) return curr;
      if (curr.getValue() > value) {
        curr = curr.getLeft();
      } else {
        curr = curr.getRight();
      }
    }
    return "Value not found";
  };

  const levelOrder = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (root === null) return;
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.getLeft() !== null) queue.push(node.getLeft());
      if (node.getRight() !== null) queue.push(node.getRight());
    }
  };

  const levelOrderRec = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (root === null) return;

    const treeRec = (arr) => {
      if (arr.length === 0) {
        return;
      }

      const nextLevel = [];

      arr.forEach((node) => {
        callback(node);
        if (node.getLeft() !== null) nextLevel.push(node.getLeft());
        if (node.getRight() !== null) nextLevel.push(node.getRight());
      });

      treeRec(nextLevel);
    };
    return treeRec([root]);
  };

  const inOrder = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (root === null) return;

    const inOrderRec = (node) => {
      if (node === null) return;
      inOrderRec(node.getLeft());
      callback(node);
      inOrderRec(node.getRight());
    };
    return inOrderRec(root);
  };

  const preOrder = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (root === null) return;

    const preOrderRec = (node) => {
      if (node === null) return;
      callback(node);
      preOrderRec(node.getLeft());
      preOrderRec(node.getRight());
    };
    return preOrderRec(root);
  };

  const postOrder = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }
    if (root === null) return;

    const postOrderRec = (node) => {
      if (node === null) return;
      postOrderRec(node.getLeft());
      postOrderRec(node.getRight());
      callback(node);
    };
    return postOrderRec(root);
  };

  const height = (node) => {
    if (node === null) return -1;

    const leftHeight = height(node.getLeft());
    const rightHeight = height(node.getRight());

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const depth = (node) => {
    if (root === null) return -1;
    let curr = root;
    let depth = 0;
    // Find the node and calculate the steps
    while (curr !== null) {
      if (curr === node) return depth;
      if (curr.getValue() > node.getValue()) {
        curr = curr.getLeft();
      } else {
        curr = curr.getRight();
      }
      depth += 1;
    }
    return -1;
  };

  const isBalanced = () => {
    if (root === null) return true;
    let result = true;

    const isBalancedRec = (node) => {
      if (node === null) return 0;

      const leftHeight = isBalancedRec(node.getLeft());
      const rightHeight = isBalancedRec(node.getRight());
      // If any of the compared node's height is greater by more than 1 the tree is unbalanced
      if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1) {
        result = false;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };
    isBalancedRec(root);
    return result;
  };

  const rebalance = () => {
    const nodeArr = [];
    inOrder((node) => nodeArr.push(node.getValue()));
    root = buildTree(nodeArr, 0, nodeArr.length - 1);
  };

  return {
    getRoot,
    insert,
    deleteItem,
    find,
    levelOrder,
    levelOrderRec,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
