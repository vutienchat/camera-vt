export const convertListToTree = (list, key) => {
  const { parentKey, displayKey, mappingKey } = key;
  let convertedList = [];
  list.length > 0 &&
    list.forEach((element) => {
      if (element[parentKey].length === 0) {
        let newIem = { ...element, [parentKey]: "0" };
        convertedList.push(newIem);
      } else {
        convertedList.push(element);
      }
    });

  let map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < convertedList.length; i += 1) {
    map[convertedList[i].id] = i;
    convertedList[i].nodeChildren = [];
  }

  for (i = 0; i < convertedList.length; i += 1) {
    node = convertedList[i];
    if (node[parentKey] !== "0" && map[node[parentKey]] !== undefined) {
      convertedList[map[node[parentKey]]].nodeChildren.push({
        ...node,
        [displayKey]: node[mappingKey],
      });
    } else {
      roots.push({
        ...node,
        [displayKey]: node[mappingKey],
      });
    }
  }
  return roots;
};

export const flattenTree = (root, key) => {
  let flatten = [Object.assign({}, root)];

  delete flatten[0][key];

  if (root[key] && root[key].length > 0) {
    return flatten
      .concat(root[key])
      .map((child) => flattenTree(child, key))
      .reduce((a, b) => a.concat(b), []);
  }

  return flatten;
};

export const getAllNodeParent = (
  nodeParentId,
  nodeTree,
  listNodeTMP,
  listNode
) => {
  if (
    listNode.some((node) => node.id === nodeParentId) ||
    listNodeTMP.some((node) => node.id === nodeParentId)
  ) {
    return [...listNodeTMP];
  }

  const nodeParent = nodeTree.find((node) => node.id === nodeParentId);

  if (!nodeParent || Object.keys(nodeParent).length === 0) {
    return [...listNodeTMP];
  }

  if (nodeParent.parentId) {
    return getAllNodeParent(
      nodeParent.parentId,
      nodeTree,
      [...listNodeTMP, { ...nodeParent }],
      listNode
    );
  }
  return [...listNodeTMP, { ...nodeParent }];
};

export const flattenTreeNode = (root, keyWord) => {
  return root.reduce((listNode, node) => {
    let nodeTMP = [];
    if (node.label.toLowerCase().indexOf(`${keyWord.toLowerCase()}`) !== -1) {
      if (node.parentId) {
        nodeTMP = getAllNodeParent(node.parentId, root, nodeTMP, listNode);
      }
      return [...listNode, node].concat(nodeTMP);
    }
    return [...listNode];
  }, []);
};
