import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import simplify from "simplify-js";

const DrawingComponent = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e, selectedLine) => {
    if (selectedLine !== null && isDragging) return;
    setIsDrawing(true);
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    setLines([...lines, { points: [{ x, y }] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || resizing) return;
    if (selectedLine == null && !isDragging) {
      const stage = e.target.getStage();
      const { x, y } = stage.getPointerPosition();
      const temptLine = [...lines];
      let lastLine = temptLine[temptLine.length - 1];
      lastLine.points.push({ x, y });
      temptLine.splice(temptLine.length - 1, 1, lastLine);
      setLines([...temptLine]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDragging(false);
    setSelectedLine(null);
    // Automatically close the last line by connecting its last point to its first point
    if (lines.length > 0) {
      const temptLine = [...lines].filter((it) => it.points.length > 1);
      const lastLine = temptLine[temptLine.length - 1];
      const tolerance = 5; // Tolerance for simplification
      lastLine.points = simplify(lastLine.points, tolerance, true);
      setLines([...temptLine]);
    }
  };

  console.log("line", lines);

  const handleLineClick = (index) => {
    setIsDrawing(false);
    setSelectedLine(index);
  };

  const handleLineDblClick = () => {
    setResizing(true);
  };

  const handleStageMouseUp = () => {
    setResizing(false);
  };

  const handleLineDragMove = (index, pointIndex, event) => {
    const { x, y } = event.target.position();
    const newLines = [...lines];
    newLines[index].points[pointIndex] = { x, y };
    setLines(newLines);
  };
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e) => handleMouseDown(e, selectedLine)}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchStart={(e) => handleMouseDown(e, selectedLine)}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={[...line.points].flatMap((point) => [point.x, point.y])}
            stroke="black"
            strokeWidth={selectedLine === i ? 1 : 0.5}
            onClick={() => handleLineClick(i)}
            onDblClick={handleLineDblClick}
            fill="rgba(221, 61, 75, 0.50)"
            onMouseDown={() => handleLineClick(i)}
            closed={!isDrawing}
            draggable
            onDragStart={() => {
              setIsDrawing(false);
              setIsDragging(true);
            }}
            onDragMove={(event) => handleLineDragMove(i, 0, event)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DrawingComponent;
