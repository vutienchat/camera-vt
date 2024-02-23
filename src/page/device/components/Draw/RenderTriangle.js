import React from "react";
import { Line } from "react-konva";
import RenderArrow from "./RenderArrow";

const RenderTriangle = ({
  points,
  canDraw,
  centerLine,
  handleLineClick,
  handleLineDragMove,
  handleLineDragStart,
  filledAreaPoints,
  handleLineDragMoveEnd,
  isDragging,
  ...props
}) => {
  return (
    <>
      <Line
        points={[...points].flatMap((point) => [point.x, point.y])}
        stroke="#08AB49"
        strokeWidth={4}
        draggable={canDraw === 0}
        onClick={() => handleLineClick(null, "line")}
        onDragStart={(event) => handleLineDragStart(null, event)}
        onDragMove={(event) => handleLineDragMove(null, event)}
        onDragEnd={(e) => handleLineDragMoveEnd(null, e, filledAreaPoints)}
        {...props}
      />
      <Line
        points={[...centerLine].flatMap((point) => [point.x, point.y])}
        stroke="#08AB49"
        strokeWidth={2}
      />
      {centerLine.length > 0 && (
        <RenderArrow p1={centerLine[0]} p2={centerLine[1]} />
      )}
      {points.length === 4 && (
        <RenderArrow
          p1={
            filledAreaPoints.length && isDragging && canDraw === 0
              ? filledAreaPoints[filledAreaPoints.length - 2]
              : points[points.length - 2]
          }
          p2={
            filledAreaPoints.length && isDragging && canDraw === 0
              ? filledAreaPoints[filledAreaPoints.length - 1]
              : points[points.length - 1]
          }
          // p2={points[points.length - 1]}
        />
      )}
    </>
  );
};

export default React.memo(RenderTriangle);
