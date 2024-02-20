import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Ellipse } from "react-konva";
import simplify from "simplify-js";
import _ from "lodash";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const DrawingComponent = () => {
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  const [isUpdatePoint, setIsUpdatePoint] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lines, setLines] = useState([]);
  const [filledAreaPoints, setFilledAreaPoints] = useState([]);
  const [lastDragPosition, setLastDragPosition] = useState({ x: 0, y: 0 });
  const [selectedLine, setSelectedLine] = useState(null);
  const [pointIndex, setPointIndex] = useState(null);

  const handleMouseDown = (e, selectedLine) => {
    if (selectedLine && isDragging) return;
    setIsDrawing(true);
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    // setLastDragPosition({ x: 0, y: 0 });
    setLines([...lines, { points: [{ x, y }] }]);
  };

  const handleMouseMove = (e) => {
    // if (!isDrawing) return;
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const temptLine = _.cloneDeep(lines);
    if (selectedLine == null && !isDragging && isDrawing) {
      let lastLine = temptLine[temptLine.length - 1];
      lastLine.points.push({ x, y });
      temptLine.splice(temptLine.length - 1, 1, lastLine);
      setLines(temptLine);
    }
    if (isUpdatePoint && pointIndex !== null && selectedLine !== null) {
      const tempAreaPoints = _.cloneDeep(filledAreaPoints);
      tempAreaPoints[pointIndex] = { x, y };
      temptLine[selectedLine].points = tempAreaPoints;
      setFilledAreaPoints(tempAreaPoints);
      setLines(temptLine);
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    setIsDragging(false);
    setIsUpdatePoint(false);
    setPointIndex(null);
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

  const handleStageClick = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    console.log("clickedOnEmpty", clickedOnEmpty);
    if (clickedOnEmpty) {
      setSelectedLine(null);
    } else {
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

    setLastDragPosition({ x, y });
    setFilledAreaPoints(newFilledAreaPoints);
  };

  const handleLineDragMoveEnd = (index, event, filledAreaPoints) => {
    const newLines = _.cloneDeep([...lines]);
    newLines[index].points = filledAreaPoints;
    setLines(newLines);
    setLastDragPosition({ x: 0, y: 0 });
  };

  const onClickPoint = (e, index) => {
    if (selectedLine == null) return;
    setIsDrawing(false);
    setIsDragging(false);
    setPointIndex(index);
    setIsUpdatePoint(true);
  };

  return (
    <TransformWrapper
      doubleClick={{
        disabled: true,
      }}
      panning={{
        lockAxisX: true,
        lockAxisY: true,
      }}
    >
      <TransformComponent>
        <div
          // onContextMenu={(e) => e.preventDefault()}
          // onDoubleClick={(e) => handleOnDoubleClick(e)}
          ref={imageRef}
          style={{
            backgroundImage:
              "url('https://cdn.vjshop.vn/tin-tuc/5-cach-cai-thien-bo-cuc-anh-phong-canh-thong-qua-phoi-sang-lau/cai-thien-anh-phong-canh-bang-phuong-phap-chup-phoi-sang-lau.jpg')",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            minWidth: 900,
            minHeight: 500,
          }}
        >
          <Stage
            width={900}
            height={500}
            onMouseDown={(e) => handleMouseDown(e, selectedLine)}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={(e) => handleMouseDown(e, selectedLine)}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onClick={handleStageClick}
            ref={stageRef}
            style={{ border: "solid 1px ", width: "100%", height: "100%" }}
          >
            <Layer>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={[...line.points].flatMap((point) => [
                    point.x,
                    point.y,
                  ])}
                  stroke="black"
                  strokeWidth={selectedLine === i ? 1 : 0.5}
                  onClick={() => handleLineClick(i)}
                  fill="rgba(221, 61, 75, 0.50)"
                  onMouseDown={() => handleLineClick(i)}
                  closed={!isDrawing}
                  draggable
                  onDragStart={(event) => handleLineDragStart(i, event)}
                  onDragMove={(event) => handleLineDragMove(i, event)}
                  onDragEnd={(e) =>
                    handleLineDragMoveEnd(i, e, filledAreaPoints)
                  }
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
                    onMouseDown={(e) => onClickPoint(e, index)}
                  />
                ))}
            </Layer>
          </Stage>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default DrawingComponent;
