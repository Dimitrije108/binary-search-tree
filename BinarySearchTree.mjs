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
const Tree = (arr) => {
  if (arr.length === 0 || !Array.isArray(arr)) return "Invalid call";
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

  const root = buildTree(array, 0, array.length - 1);

  const insert = (value) => {
    let curr = root;
    let prev = null;
    // Check for a duplicate value, then find where to insert
    // the new value
    while (curr !== null) {
      if (curr.getValue() === value) {
        return "Duplicate value";
      }
      if (curr.getValue() > value) {
        prev = curr;
        curr = curr.getLeft();
      } else {
        prev = curr;
        curr = curr.getRight();
      }
    }

    if (prev.getValue() > value) {
      prev.setLeft(Node(value));
    } else {
      prev.setRight(Node(value));
    }
  };

  const levelOrder = (callback) => {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }

    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.getLeft() !== null) queue.push(node.getLeft());
      if (node.getRight() !== null) queue.push(node.getRight());
    }
  };

  const deleteItem = (value) => {
    // 1. delete a leaf node
    // 2. delete a node with single child
    // 3. delete a node with both children
  };

  return {
    root,
    insert,
    levelOrder,
  };
};
// Used for console printing the balanced BST results
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.getRight() !== null) {
    prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getValue()}`);
  if (node.getLeft() !== null) {
    prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.insert(2);
console.log(test.insert(6345));
console.log(prettyPrint(test.root));
test.levelOrder((node) => console.log(node.getValue()));

// deleteItem(value)
// How: traverse the tree and manipulate the nodes and their connections
