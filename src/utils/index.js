export const convertTreeData = (data) => {
  var nodeList = {};

  var root = data.currentNode;
  var nodes = data.nodeList;

  nodeList = {
    ...nodeList,
    [root.id]: {
      data: root,
      children: [],
      row: 0,
    },
  };

  for (var node of nodes) {
    let count = 0;

    if (node.parentId !== nodeList[root.id].data.parentId) {
      if (nodeList[node.id]) {
        nodeList = {
          ...nodeList,
          [node.id]: {
            data: node,
            children: [...nodeList[node.id].children],
            row: nodeList[node.id].row,
          },
        };
      } else {
        nodeList = {
          ...nodeList,
          [node.id]: {
            data: node,
            children: [],
            row: count + 1,
          },
        };
      }

      if (!nodeList[node.parentId]) {
        nodeList = {
          ...nodeList,
          [node.parentId]: {
            data: node,
            children: [node.id],
            row: count + 1,
          },
        };
      } else {
        nodeList[node.parentId].children.push(node.id);
      }

      nodeList[node.id].row = nodeList[node.parentId].row + 1;
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
