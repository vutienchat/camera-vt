export const convertTreeData = (data) => {
  var nodeList = {};

  for (var tree of data) {
    var root = tree.currentNode;
    var nodes = tree.nodeList;
    nodeList = {
      ...nodeList,
      [root.id]: {
        data: root,
        children: [],
      },
    };

    for (var node of nodes) {
      nodeList = {
        ...nodeList,
        [node.id]: {
          data: node,
          children: [],
        },
      };
      nodeList[node.parentId].children.push(node.id);
    }
  }

  return nodeList;
};
