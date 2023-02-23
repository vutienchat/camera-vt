export const getGroupTree = (nodeGroup, listGroup) => {
  const listNodeChildren = listGroup.filter(
    (groupItem) => groupItem.parentId === nodeGroup.id
  );

  const listTasks = listGroup.filter((item) => item.groupId === nodeGroup.id);

  if (listNodeChildren.length) {
    return {
      ...nodeGroup,
      nodeChildren: listNodeChildren.map((nodeChildren) => ({
        ...getGroupTree(nodeChildren, listGroup),
      })),
      listTask: [...listTasks],
    };
  }

  return { ...nodeGroup, nodeChildren: [] };
};

export const getDataGridBySize = (sizeGrid) => {
  return []
    .concat(
      ...Array.from({ length: sizeGrid }, (_, x) => {
        return Array.from({ length: sizeGrid }, (_, y) => {
          return { x: x + 1, y: y + 1, size: 1, merge: [], screenDetail: [] };
        });
      })
    )
    .map((wall, index) => ({ ...wall, key: index + 1 }));
};
