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
