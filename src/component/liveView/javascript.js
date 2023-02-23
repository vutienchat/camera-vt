export const getGroupTree = (nodeGroup, listGroup) => {
  const listNodeChildren = listGroup.filter(
    (groupItem) => groupItem.parentId === nodeGroup.id
  );

  if (listNodeChildren.length) {
    return {
      ...nodeGroup,
      nodeChildren: listNodeChildren.map((nodeChildren) => ({
        ...getGroupTree(nodeChildren, listGroup),
      })),
    };
  }

  return { ...nodeGroup, nodeChildren: [] };
};
