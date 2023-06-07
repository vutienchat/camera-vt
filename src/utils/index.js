export const convertTreeData = (data) => {
  var nodeList = {};
  let count = 0;

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
      count += 1;

      nodeList = {
        ...nodeList,
        [node.id]: {
          data: node,
          children: [],
          row: count,
        },
      };

      nodeList[node.parentId].children.push(node.id);
    }
  }

  return nodeList;
};

export const convertTreeDataWithoutCurrentNode = (data) => {
  var nodeList = {};
  let count = 0;

  var nodes = data.nodeList;

  nodeList = {
    ...nodeList,
    root: {
      data: null,
      children: [],
    },
  };

  for (var node of nodes) {
    count += 1;

    nodeList = {
      ...nodeList,
      [node.id]: {
        data: node,
        children: [],
        row: count,
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
