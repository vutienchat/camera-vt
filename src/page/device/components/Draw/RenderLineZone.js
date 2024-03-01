import React from "react";
import { Line } from "react-konva";
import { level } from "./@type";

const RenderLineZone = React.memo(
  ({
    line,
    selectedLine,
    handleLineClick,
    onDragStart,
    isDrawing,
    canDraw,
    onDragMove,
    onDragEnd,
    index,
    filledAreaPoints,
    isDrag,
    ...props
  }) => {
    return (
      <Line
        points={[...line.points].flatMap((point) => [point.x, point.y])}
        stroke="black"
        strokeWidth={selectedLine === index ? 1 : 0.5}
        onClick={handleLineClick}
        fill={
          line.level !== undefined
            ? level[line.level].color
            : "rgba(221, 61, 75, 0.50)"
        }
        onMouseDown={(e) => {
          // e.stopPropagation();
          handleLineClick(index, "zone", e);
        }}
        closed={true}
        onDragStart={(event) => onDragStart(index, event)}
        onDragMove={(event) => onDragMove(index, event)}
        onDragEnd={(e) => onDragEnd(index, e, filledAreaPoints)}
        {...props}
      />
    );
  }
);

export default RenderLineZone;
