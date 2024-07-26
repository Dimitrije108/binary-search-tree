import Tree from "./BinarySearchTree.mjs";

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

const arrRandomizer = (length) => {
  const arr = [];
  // Array of given length filled with random numbers < 100
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

const initBST = () => {
  const tree = Tree(arrRandomizer(20));
  // Test all methods
  console.log(tree.isBalanced());
  tree.insert(130);
  tree.insert(150);
  tree.insert(189);
  console.log(tree.isBalanced());
  console.log(prettyPrint(tree.getRoot()));
  tree.rebalance();
  console.log(tree.isBalanced());
  console.log(prettyPrint(tree.getRoot()));
  // tree.levelOrder((node) => console.log(node.getValue()));
  // tree.levelOrderRec((node) => console.log(node.getValue()));
  // tree.inOrder((node) => console.log(node.getValue()));
  // tree.preOrder((node) => console.log(node.getValue()));
  // tree.postOrder((node) => console.log(node.getValue()));
};

initBST();
