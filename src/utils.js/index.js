export const removeNodeDupAndSort = (nodeList) => {
  return nodeList
    .reduce((nodeListTmp, node) => {
      if (nodeListTmp.some((nodeTmp) => nodeTmp.id === node.id)) {
        return [...nodeListTmp];
      }
      return [...nodeListTmp, node];
    }, [])
    .sort((a, b) => {
      const keyA = a.key;
      const keyB = b.key;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
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

  return [...listNodeTMP, { ...nodeParent, listTask: [] }];
};

export const flattenGroupTree = (root, keyWord) => {
  return removeNodeDupAndSort(
    root.reduce((listNode, node) => {
      let nodeTmp = [];
      if (node.label.toLowerCase().indexOf(`${keyWord.toLowerCase()}`) !== -1) {
        if (node.parentId) {
          nodeTmp = getAllNodeParent(node.parentId, root, nodeTmp, listNode);
        }

        return [...listNode, node].concat(nodeTmp);
      }

      return [...listNode];
    }, [])
  );
};

export const convertListToTree = (list, key) => {
  const { parentKey, displeyKey, mappingKey } = key;
  let convertedList = [];

  list.length > 0 &&
    list.forEach((element) => {
      if (element[parentKey].length === 0) {
        let newItem = { ...element, [parentKey]: "0" };
        convertedList.push(newItem);
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
    convertedList[i].children = [];
    convertedList[i].nodeChildren = [];
  }

  for (i = 0; i < convertedList.length; i += 1) {
    node = convertedList[i];
    if (node[parentKey] !== 0 && map[node[parentKey]] !== undefined) {
      convertedList[map[node[parentKey]]].children.push({
        ...node,
        [displeyKey]: node[mappingKey],
      });
      convertedList[map[node[parentKey]]].nodeChildren.push({
        ...node,
        [displeyKey]: node[mappingKey],
      });
    } else {
      roots.push({
        ...node,
        [displeyKey]: node[mappingKey],
      });
    }
  }
  return roots;
};
