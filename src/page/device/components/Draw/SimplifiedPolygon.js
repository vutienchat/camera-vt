import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Ellipse } from "react-konva";
import simplify from "simplify-js";
import _ from "lodash";

const DrawingComponent = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastDragPosition, setLastDragPosition] = useState({ x: 0, y: 0 });
  const [filledAreaPoints, setFilledAreaPoints] = useState([]);
  const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, selectedLine) => {
    if (selectedLine && isDragging) return;
    setIsDrawing(true);
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    // setLastDragPosition({ x: 0, y: 0 });
    setLines([...lines, { points: [{ x, y }] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || resizing) return;
    if (selectedLine == null && !isDragging) {
      const stage = e.target.getStage();
      const { x, y } = stage.getPointerPosition();
      const temptLine = _.cloneDeep(lines);
      let lastLine = temptLine[temptLine.length - 1];
      lastLine.points.push({ x, y });
      temptLine.splice(temptLine.length - 1, 1, lastLine);
      setLines([...temptLine]);
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    setIsDragging(false);
    // setSelectedLine(null);
    // Automatically close the last line by connecting its last point to its first point
    if (lines.length > 0) {
      const temptLine = [...lines].filter((it) => it.points.length > 1);
      const lastLine = temptLine[temptLine.length - 1];
      const tolerance = 6; // Tolerance for simplification
      lastLine.points = simplify(lastLine.points, tolerance, true);
      setLines([...temptLine]);
    }
  };

  const handleLineClick = (index) => {
    setIsDrawing(false);
    setSelectedLine(index);
    setFilledAreaPoints([...lines[index].points]);
  };

  const handleLineDblClick = () => {
    setResizing(true);
  };

  const handleStageMouseUp = () => {
    setResizing(false);
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedLine(null);
    }
  };

  const handleLineDragStart = (index, e) => {
    // setLastDragPosition(e.target.position());
    setIsDrawing(false);
    setIsDragging(true);
  };

  const handleLineDragMove = (index, event) => {
    const { x, y } = event.target.position();
    const deltaX = x - lastDragPosition.x;
    const deltaY = y - lastDragPosition.y;
    const newFilledAreaPoints = filledAreaPoints.map((point) => ({
      x: point.x + deltaX,
      y: point.y + deltaY,
    }));

    console.log("deltaX1", deltaX);
    console.log("newFilledAreaPoints", newFilledAreaPoints);
    setFinalPosition({ x: deltaX, y: deltaY });
    setLastDragPosition({ x, y });
    console.log("filledAreaPoints123123", filledAreaPoints);

    setFilledAreaPoints(newFilledAreaPoints);
  };

  const handleLineDragMoveEnd = (index, event) => {
    const newLines = _.cloneDeep([...lines]);
    // const { x, y } = event.target.position();
    // const deltaX = x - lastDragPosition.x;
    // const deltaY = y - lastDragPosition.y;
    // const lineIndex = [...newLines[index].points].map((point) => ({
    //   x: point.x + deltaX,
    //   y: point.y + deltaY,
    // }));

    newLines[index].points = filledAreaPoints;
    console.log("newLines[index]", newLines[index].points);

    console.log("filledAreaPoints", filledAreaPoints);
    console.log("newLines", newLines);
    setLines(newLines);
  };

  console.log("lineeeee", lines);

  // useEffect(() => {
  //   if (selectedLine === null) return;
  //   setFilledAreaPoints([...lines[selectedLine].points]);
  // }, [selectedLine, lines]);
  // console.log("filledAreaPoints", filledAreaPoints);

  return (
    <Stage
      width={905}
      height={500}
      onMouseDown={(e) => handleMouseDown(e, selectedLine)}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchStart={(e) => handleMouseDown(e, selectedLine)}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onClick={handleStageClick}
      style={{ border: "solid 1px ", width: "100%", height: "100%" }}
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
            onDragStart={(event) => handleLineDragStart(i, event)}
            onDragMove={(event) => handleLineDragMove(i, event)}
            onDragEnd={(e) => handleLineDragMoveEnd(i, e)}
          />
        ))}

        {selectedLine !== null &&
          filledAreaPoints.map((point, index) => (
            <Ellipse
              key={index}
              x={point.x}
              y={point.y}
              radiusX={5}
              radiusY={5}
              fill="red"
            />
          ))}
      </Layer>
    </Stage>
  );
};

export default DrawingComponent;
