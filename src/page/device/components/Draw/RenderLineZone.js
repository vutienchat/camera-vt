import React from "react";
import { Line } from "react-konva";

const RenderLineZOne = React.memo(
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
    ...props
  }) => {
    return (
      <Line
        points={[...line.points].flatMap((point) => [point.x, point.y])}
        stroke="black"
        strokeWidth={selectedLine === index ? 1 : 0.5}
        onClick={() => handleLineClick(index, "zone")}
        fill="rgba(221, 61, 75, 0.50)"
        onMouseDown={() => handleLineClick(index, "zone")}
        closed={!isDrawing}
        draggable={canDraw === 1}
        onDragStart={(event) => onDragStart(index, event)}
        onDragMove={(event) => onDragMove(index, event)}
        onDragEnd={(e) => onDragEnd(index, e, filledAreaPoints)}
        {...props}
      />
    );
  }
);

export default RenderLineZOne;
