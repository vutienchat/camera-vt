import React, { useRef, useState } from "react";
import { Ellipse, Layer, Line, Stage } from "react-konva";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const DrawCanvas = ({ initialData, onChange }, ref) => {
  const imageRef = useRef(null);
  const [points, setPoint] = useState([]);
  // const [currentLinePoints, setCurrentLinePoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [filledAreaPoints, setFilledAreaPoints] = useState([]);

  const handleStageClick = (e) => {
    const stage = e.target.getStage();

    const position = stage.getPointerPosition();
    setPoint([...points, position]);
    setFilledAreaPoints([...filledAreaPoints, position]);
  };

  const handleOnDoubleClick = () => {
    setLines([...lines, points]);
    setPoint([]);
    setFilledAreaPoints([]);
  };

  return (
    <TransformWrapper>
      <TransformComponent>
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
          >
            <Layer>
              {lines.map((it, indx) => (
                <Line
                  points={it.flatMap((point) => [point.x, point.y])}
                  closed
                  // stroke="black"
                  fill="rgba(221, 61, 75, 0.50)"
                  key={indx}
                />
              ))}
              {points.length > 1 && (
                <Line
                  points={points.flatMap((point) => [point.x, point.y])}
                  closed={false}
                  stroke="black"
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

export default DrawCanvas;
