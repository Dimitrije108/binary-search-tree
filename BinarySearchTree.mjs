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
  // Call to create and return a balanced BST
  const root = buildTree(array, 0, array.length - 1);
  return root;
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

// let testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(
  prettyPrint(Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
);
