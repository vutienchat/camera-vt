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
          return {
            x: x,
            y: y,
            size: 1,
            merge: [],
            screenDetail: [],
          };
        });
      })
    )
    .map((wall, index) => ({
      ...wall,
      key: index + 1,
      i: String(index + 1),
      resizeHandles: ["se"],
      isResizable: true,
      w: index == 2 ? 2 : 1,
      h: index == 2 ? 2 : 1,
    }));
};
