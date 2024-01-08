export const defaultData = []
  .concat(
    ...Array.from({ length: 5 }, (_, x) => {
      return Array.from({ length: 5 }, (_, y) => {
        return {
          x: x,
          y: y,
          w: 1,
          h: 1,
          size: 3,
          merge: [],
          screenDetail: [],
        };
      });
    })
  )
  .map((wall, index) => ({
    ...wall,
    key: index + 1,
    i: `Cam ${String(index + 1)}`,
    selected: false,
    // resizeHandles: ["se"],
    // isResizable: true,
  }));
