export const convertTreeData = (data) => {
  var nodeList = {};

  var root = data.currentNode;
  var nodes = data.nodeList;

  nodeList = {
    ...nodeList,
    [root.id]: {
      data: root,
      children: [],
    },
  };

  for (var node of nodes) {
    if (node.parentId !== nodeList[root.id].data.parentId) {
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

export const convertTreeDataWithoutCurrentNode = (data) => {
  var nodeList = {};

  var nodes = data.nodeList;

  nodeList = {
    ...nodeList,
    root: {
      data: null,
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

    if (node.parentId !== "") {
      nodeList[node.parentId].children.push(node.id);
    } else {
      nodeList["root"].children.push(node.id);
    }
  }

  return nodeList;
};
