import _ from "lodash";
import React, { useRef, useState } from "react";
import { Ellipse, Layer, Line, Rect, Stage } from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { sensitivity } from "./@type";

const DrawMotion = ({ typeSensitivity }, ref) => {
  const imageRef = useRef(null);
  const [points, setPoint] = useState([]);
  // const [currentLinePoints, setCurrentLinePoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [filledAreaPoints, setFilledAreaPoints] = useState([]);
  const [isPointAdded, setIsPointAdded] = useState(false);

  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const position = stage.getPointerPosition();
    if (points.length >= 2 && !isPointAdded) return;
    if (!points.length) {
      setPoint([position]);
      setIsPointAdded(true);
      setFilledAreaPoints([position]);
    } else {
      const uniquePoints = [...points, position].filter(
        (point, index, self) => {
          return (
            index === self.findIndex((p) => p.x === point.x && p.y === point.y)
          );
        }
      );
      setPoint(uniquePoints);
      setFilledAreaPoints([]);
      setIsPointAdded(false);
    }
  };

  const handleOnDoubleClick = () => {
    setLines([...lines, points]);
    setPoint([]);
    setFilledAreaPoints([]);
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const tempPoints = _.cloneDeep([...points]);
    if (points.length > 2 || !points.length || !isPointAdded) return;
    if (points.length === 1) {
      setPoint([...tempPoints, { x, y }]);
    } else {
      tempPoints.splice(tempPoints.length - 1, 1, { x, y });
      setPoint(tempPoints);
    }
    return;
  };

  const handleMouseDown = (e, selectedLine) => {
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    // setLines([...lines, { points: [{ x, y }] }]);
  };
  const handleMouseUp = (e) => {
    // setIsDragging(false);
    // setIsUpdatePoint(false);
    // setPointIndex(null);
    // Automatically close the last line by connecting its last point to its first point
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
      <TransformComponent
        wrapperStyle={{ width: "100%" }}
        contentStyle={{ width: "100%" }}
      >
        <div
          onContextMenu={(e) => e.preventDefault()}
          onDoubleClick={(e) => handleOnDoubleClick(e)}
          ref={imageRef}
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/481045024/vi/anh/tran-quoc-pagoda.jpg?s=2048x2048&w=is&k=20&c=7AJXcmayI-XfJDOK_jiKWFAVq6D-1UN4ZYrAfaCa5Oc=')",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            minWidth: 845,
            minHeight: 445,
          }}
        >
          <Stage
            onClick={handleStageClick}
            width={imageRef.current ? imageRef.current.clientWidth : 500}
            height={imageRef.current ? imageRef.current.clientHeight : 500}
            onMouseDown={(e) => handleMouseDown(e)}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={(e) => handleMouseDown(e)}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <Layer>
              {points.length > 1 && (
                <Rect
                  x={Math.min(points[0].x, points[1].x)}
                  y={Math.min(points[0].y, points[1].y)}
                  width={Math.abs(points[0].x - points[1].x)}
                  height={Math.abs(points[0].y - points[1].y)}
                  stroke={sensitivity[typeSensitivity].border}
                  fill={sensitivity[typeSensitivity].color}
                />
              )}
              {filledAreaPoints.map((point, index) => (
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
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default DrawMotion;
