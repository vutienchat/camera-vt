import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingComponent = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [resizing, setResizing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || resizing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    // Automatically close the last line by connecting its last point to its first point
    if (lines.length > 0) {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([lastLine.points[0], lastLine.points[1]]);
      setLines([...lines]);
    }
  };

  const handleLineClick = (index) => {
    setSelectedLine(index);
  };

  const handleLineDblClick = () => {
    setResizing(true);
  };

  const handleStageMouseUp = () => {
    setResizing(false);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="black"
            strokeWidth={selectedLine === i ? 5 : 2}
            onClick={() => handleLineClick(i)}
            onDblClick={handleLineDblClick}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DrawingComponent;
