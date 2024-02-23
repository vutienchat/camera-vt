import React from "react";
import { Shape } from "react-konva";

const RenderArrow = ({ p1, p2 }) => {
  if (!p1 || !p2) return null;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  const arrowLength = Math.min(10, length / 3);

  const arrowPoints = [
    p2.x - arrowLength * Math.cos(angle - Math.PI / 6),
    p2.y - arrowLength * Math.sin(angle - Math.PI / 6),
    p2.x,
    p2.y,
    p2.x - arrowLength * Math.cos(angle + Math.PI / 6),
    p2.y - arrowLength * Math.sin(angle + Math.PI / 6),
  ];

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(arrowPoints[0], arrowPoints[1]);
        context.lineTo(arrowPoints[2], arrowPoints[3]);
        context.lineTo(arrowPoints[4], arrowPoints[5]);
        context.closePath();
        // add fill
        context.fillStrokeShape(shape);
      }}
      fill="#08AB49"
      stroke="#08AB49"
    />
  );
};

export default RenderArrow;
