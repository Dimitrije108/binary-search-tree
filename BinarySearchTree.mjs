#!/usr/bin/env node
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

const Tree = (arr) => {
  // Get a sorted array without duplicates
  const array = removeDuplicates(arr.sort((a, b) => a - b));
  const root = buildTree(array, 0, array.length - 1);
};

const buildTree = (arr, start, end) => {
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);
  const root = Node(arr[mid]);

  root.setLeft(buildTree(arr, start, mid - 1));
  root.setRight(buildTree(arr, mid + 1, end));
  // needs to RETURN level-0 root node
  return root;
};

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

let testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(prettyPrint(buildTree(testArr, 0, testArr.length - 1)));
