import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Ellipse, Line } from "react-konva";
import simplify from "simplify-js";
import _ from "lodash";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import { Box, Grid } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { LineIcon, RefreshIcon, ZoneIcon } from "../../Icon";
import RenderTriangle from "./RenderTriangle";
import RenderLineZOne from "./RenderLineZone";
import ToolsControl from "./ToolsControl";
import ModalAddLine from "./modals/ModalAddLine";
import { useFormContext } from "react-hook-form";
import ModalAddZone from "./modals/ModalAddZone";
import { typeModal } from "./@type";
import RenderLineZone from "./RenderLineZone";

const FinalDraw = React.memo(({ canDraw, setCanDraw }) => {
  const imageRef = useRef(null);
  const stageRef = useRef(null);
  // const { instance, zoomIn, zoomOut, ...rest } = useControls();
  const { watch, setValue, getValues } = useFormContext();
  const line = watch("line");
  const listZone = watch("zone");
  const videoRef = useRef(null);
  const resizableElementRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [filledAreaPoints, setFilledAreaPoints] = useState([]);
  const [centerLine, setCenterLine] = useState([]);
  const [lines, setLines] = useState([]);
  const [zone, setZones] = useState([]);
  const [lastDragPosition, setLastDragPosition] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [scaleZoom, setScaleZoom] = useState(0);
  const [wrapperKey, setWrapperKey] = useState(Date.now());
  const [isDrag, setIsDrag] = useState(false);
  const [pointIndex, setPointIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [isUpdatePoint, setIsUpdatePoint] = useState(false);
  const [isPointAdded, setIsPointAdded] = useState(false);
  const [isOpenModalLine, setIsOpenModalLine] = useState({
    open: false,
    type: typeModal.add,
  });
  const [isOpenModalZone, setIsOpenModalZone] = useState({
    open: false,
    type: typeModal.add,
  });
  const [frameImage, setFrameImage] = useState({
    elementWidth: 1500,
    elementHeight: 1200,
    loadFrameImage: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const heightScreen = resizableElementRef.current.offsetHeight;
      const widthScreen = resizableElementRef.current.offsetWidth;
      //const scaleFirst = parseFloat((heightScreen / frameImage.elementHeight).toFixed(1))
      const scaleFirst = parseFloat(
        (widthScreen / frameImage.elementWidth).toFixed(1)
      );
      const scaleElementWidth = frameImage.elementWidth * scaleFirst;
      const scaleElementHeight = frameImage.elementHeight * scaleFirst;

      const positionX = (widthScreen - scaleElementWidth) / 2;
      const positionY = (heightScreen - scaleElementHeight) / 2;
      setScaleZoom(scaleFirst);
      setInitialPosition({ x: positionX, y: positionY });
      // setTransformState({
      //   scale: scaleFirst,
      //   positionX: positionX,
      //   positionY: positionY
      // })
      setWrapperKey(Date.now());
    };

    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameImage]);

  useEffect(() => {
    if (line && line.coordinate && line.coordinate.length) {
      setLines(convertToObject(line.coordinate));
    }
  }, [line]);

  useEffect(() => {
    if (!listZone || !listZone.length) return;
    const convertData = listZone.map((it) => ({
      ...it,
      points: convertToObject(it.coordinate),
    }));
    setZones(convertData);
  }, [listZone]);

  const convertToDimensionalArr = (arr) => {
    if (!arr || !arr.length) return [];
    return arr.map((point) => [point.x, point.y]);
  };

  const convertToObject = (arr) => {
    if (!arr || !arr.length) return [];
    return arr.map((point) => ({ x: point[0], y: point[1] }));
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const tempLines = _.cloneDeep([...lines]);

    // add center direction line
    if (canDraw === 0 && tempLines.length === 2) {
      const midPoint = getMidpoint(tempLines[0], tempLines[1]);
      if (midPoint) {
        console.log("[midPoint, { x, y }]", [midPoint, { x, y }]);
        setCenterLine([midPoint, { x, y }]);
      }
      return;
    }
    // update position point line zone
    if (isUpdatePoint && pointIndex !== null) {
      const tempAreaPoints = _.cloneDeep(filledAreaPoints);
      tempAreaPoints[pointIndex] = { x, y };
      if (canDraw === 0) {
        const midPoint = getMidpoint(tempLines[0], tempLines[1]);
        tempAreaPoints.splice(2, 1, midPoint);
        setLines(tempAreaPoints);
      } else {
        if (selectedLine === null) return;
        const tempZone = _.cloneDeep(zone);
        tempZone[selectedLine].points = tempAreaPoints;
        setZones(tempZone);
        setPoints(tempAreaPoints);
      }
      setFilledAreaPoints(tempAreaPoints);
      return;
    }

    // draw zone
    if (canDraw === 1 && points.length && isDraw && selectedLine === null) {
      const tempPoints = _.cloneDeep([...points]);
      if (!isPointAdded) {
        setPoints([...tempPoints, { x, y }]);
        setIsPointAdded(true);
      } else {
        tempPoints.splice(tempPoints.length - 1, 1, { x, y });
        setPoints(tempPoints);
      }
      return;
    }
  };

  const handleMouseDown = (e, selectedLine) => {
    if (selectedLine !== null || isDragging || !canDraw) return;
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    // setLines([...lines, { points: [{ x, y }] }]);
  };
  const handleMouseUp = (e) => {
    setIsDragging(false);
    setIsUpdatePoint(false);
    setPointIndex(null);
    // Automatically close the last line by connecting its last point to its first point
  };

  const handleLineClick = (index, type, e) => {
    if (canDraw === null) return;
    if (type === "zone" && canDraw === 1) {
      if (points.length && isDraw) return;
      setSelectedLine(index);
      setFilledAreaPoints(zone[index].points);
    } else if (type === "line" && canDraw === 0) {
      setFilledAreaPoints(lines);
    }
    setIsDragging(true);
    setIsDrag(true);
  };

  const getMidpoint = (p1, p2) => {
    if (!p1 || !p2) return null;
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  const handleStageClick = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    const pointerPos = stageRef.current.getPointerPosition();
    if (clickedOnEmpty) {
      setSelectedLine(null);
      setIsDragging(false);
      setIsUpdatePoint(false);
      setPointIndex(null);
      setIsDrag(false);
      setFilledAreaPoints([]);
      // setValue("line.points", lines);
      setValue("line.coordinate", lines);
      setValue("zone", zone);
    }

    if (
      filledAreaPoints.length &&
      canDraw === 1 &&
      selectedLine !== null &&
      !isDraw
    ) {
      const tempZone = _.cloneDeep(zone);
      tempZone[selectedLine].points = filledAreaPoints;
      setZones(tempZone);
      setPoints([]);
      setIsDraw(true);
      return;
    }
    if (isUpdatePoint) return;
    if (canDraw === 0) {
      if (lines.length < 2 && line.coordinate && line.coordinate.length < 2) {
        setLines([...lines, pointerPos]);
        setFilledAreaPoints([...lines, pointerPos]);
      } else if (lines.length === 2) {
        setLines((prev) => [...prev, ...centerLine]);
        // setFilledAreaPoints([...points, ...centerLine]);
        setCenterLine([]);
        setIsOpenModalLine({ open: true, type: typeModal.add });
      }
    } else if (canDraw === 1 && isDraw && selectedLine === null) {
      const tempPoints = _.cloneDeep([...points, pointerPos]);
      setPoints([...tempPoints]);
      setFilledAreaPoints([...tempPoints]);
      setIsPointAdded(false);
    }
  };

  const onDblClick = (type, index) => {
    setIsDrag(false);
    setIsDragging(false);
    if (type === "line" && canDraw === 0) {
      const tempData = _.cloneDeep(lines);
      tempData.slice(2, 1);
      setFilledAreaPoints(tempData);
    } else if ((type === "zone", canDraw === 1)) {
      setFilledAreaPoints([...zone[index].points]);
      setSelectedLine(index);
    }
  };

  const onDblClickStage = (e, selectedLine) => {
    if (
      isDraw &&
      canDraw === 1 &&
      points.length >= 3 &&
      filledAreaPoints.length &&
      selectedLine === null
    ) {
      setIsDraw(false);
      const uniquePoints = points.filter((point, index, self) => {
        return (
          index === self.findIndex((p) => p.x === point.x && p.y === point.y)
        );
      });
      const newZone = _.cloneDeep([...zone, { points: uniquePoints }]);
      setZones(newZone);
      setSelectedLine(newZone.length - 1);
      setIsOpenModalZone({ open: true, type: typeModal.add });
      setIsDrag(false);
    }
  };

  const onClickPoint = (e, index) => {
    // stop draw when click the first point
    if (
      canDraw === 1 &&
      index === 0 &&
      points.length - 1 > 2 &&
      !isUpdatePoint &&
      selectedLine === null
    ) {
      const tempPoints = _.cloneDeep(points).filter((point, index, self) => {
        return (
          index === self.findIndex((p) => p.x === point.x && p.y === point.y)
        );
      });
      tempPoints.pop();
      setPoints(tempPoints);
      setIsDraw(false);
      setIsOpenModalZone({ open: true, type: typeModal.add });
      const newZone = _.cloneDeep([...zone, { points: tempPoints }]);
      setZones(newZone);
      setSelectedLine(newZone.length - 1);
    }
    if (selectedLine === null && canDraw === 1) return;
    setIsDragging(false);
    setPointIndex(index);
    setIsUpdatePoint(true);
    setIsDraw(false);
  };

  const handleLineDragStart = (index, e) => {
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
    if (canDraw === 0) {
      setLines(filledAreaPoints);
    } else {
      const newZone = _.cloneDeep([...zone]);
      newZone[index].points = filledAreaPoints;
      setZones(newZone);
    }
    event.target.position({ x: 0, y: 0 });
    setLastDragPosition({ x: 0, y: 0 });
  };

  const handleGroupMouseOver = (e) => {
    e.target.getStage().container().style.cursor = "pointer";
    // setStage(e.target.getStage());
  };

  const handleGroupMouseOut = (e) => {
    e.target.getStage().container().style.cursor = "default";
  };

  const handleCloseLine = () => {
    setIsOpenModalLine((prev) => ({ ...prev, open: false }));
    if (isOpenModalLine.type === typeModal.add) {
      setLines([]);
      setFilledAreaPoints([]);
      setValue("line.name", "");
      setValue("line.coordinate", []);
    }
  };

  const handleAddLine = (data) => {
    const newDataLine = convertToDimensionalArr([...lines]);
    setValue("line.coordinate", newDataLine);
    setValue("line.name", data);
    setIsOpenModalLine((prev) => ({ ...prev, open: false }));
    setFilledAreaPoints([]);
  };

  const handleAddZone = (data) => {
    if (selectedLine === null) return;
    const listZone = _.cloneDeep(getValues("zone"));
    listZone[selectedLine] = data;
    const convertData = listZone.map((it) => ({
      ...it,
      coordinate: convertToDimensionalArr(it.points),
    }));
    setValue("zone", convertData);
    setZones([...listZone]);
    setIsOpenModalZone((prev) => ({ ...prev, open: false }));
    setSelectedLine(null);
    setIsDraw(true);
    setPoints([]);
    setFilledAreaPoints([]);
  };

  const toolControl = [
    {
      icon: <LineIcon />,
      action: () => {
        setCanDraw(0);
        setFilledAreaPoints([]);
        setSelectedLine(null);
        setPoints([]);
        setIsPointAdded(false);
      },
    },
    {
      icon: <ZoneIcon />,
      action: () => {
        setCanDraw(1);
        setFilledAreaPoints([]);
        setIsDraw(true);
        setPoints([]);
        setIsPointAdded(false);
      },
    },
    {
      icon: <DeleteOutlineIcon />,
      action: () => {
        if (canDraw === 0 && isDrag) {
          setLines([]);
          setFilledAreaPoints([]);
          setValue("line", { name: "", points: [] });
          return;
        }
        if (selectedLine === null) return;
        const tempData = _.cloneDeep(zone);
        tempData.splice(selectedLine, 1);
        setZones(tempData);
        setValue("zone", tempData);
        setFilledAreaPoints([]);
        setSelectedLine(null);
        // setCanDraw(null);
      },
    },
    {
      icon: <RefreshIcon />,
      action: () => {
        setLines([]);
        setFilledAreaPoints([]);
        setCanDraw(null);
        setValue("zone", []);
        setValue("line", { name: "", points: [] });
        setZones([]);
        setPoints([]);
        setIsDraw(false);
      },
    },
  ];

  console.log("line", lines);
  return (
    <Box
      style={{
        width: 900,
        height: 500,
        position: "relative",
        minHeight: 500,
      }}
      ref={resizableElementRef}
    >
      <TransformWrapper
        key={wrapperKey}
        doubleClick={{
          disabled: true,
        }}
        panning={{
          lockAxisX: true,
          lockAxisY: true,
        }}
        initialScale={scaleZoom}
        initialPositionY={initialPosition.y}
        initialPositionX={initialPosition.x}
        minScale={0.2}
        // onZoomStart={() => {
        //   zoomIn(0.1);
        // }}
      >
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            width: `${frameImage.elementWidth}px`,
            height: `${frameImage.elementHeight}px`,
          }}
        >
          <div
            onContextMenu={(e) => e.preventDefault()}
            onDoubleClick={(e) => onDblClickStage(e, selectedLine)}
            ref={imageRef}
            style={{
              backgroundImage:
                "url('https://cdn.vjshop.vn/tin-tuc/5-cach-cai-thien-bo-cuc-anh-phong-canh-thong-qua-phoi-sang-lau/cai-thien-anh-phong-canh-bang-phuong-phap-chup-phoi-sang-lau.jpg')",
              height: "100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              // width: "100%",
              width: "100%",
              position: "relative",
            }}
          >
            <Stage
              width={frameImage.elementWidth}
              height={frameImage.elementHeight}
              onMouseDown={(e) => handleMouseDown(e, selectedLine)}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              onTouchStart={(e) => handleMouseDown(e, selectedLine)}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              onClick={handleStageClick}
              // onDblClick={onDblClickStage}
              ref={stageRef}
              style={{
                border: "solid 1px ",
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            >
              <Layer>
                {zone.map((zone, i) => (
                  <RenderLineZone
                    key={i}
                    index={i}
                    line={zone}
                    handleLineClick={() => handleLineClick(i, "zone")}
                    closed={true}
                    draggable={isDrag && canDraw === 1}
                    onDragStart={handleLineDragStart}
                    onDragMove={handleLineDragMove}
                    onDragEnd={handleLineDragMoveEnd}
                    filledAreaPoints={filledAreaPoints}
                    onMouseOver={canDraw === 1 && handleGroupMouseOver}
                    onMouseOut={canDraw === 1 && handleGroupMouseOut}
                    isDrag={isDrag}
                    onDblClick={(e) => {
                      onDblClick("zone", i);
                    }}
                    onContextMenu={(e) => {
                      setIsOpenModalZone({ open: true, type: typeModal.edit });
                      setSelectedLine(i);
                    }}
                    dash={i === selectedLine ? [10, 10] : []}
                  />
                ))}
                {points.length > 1 && (
                  <Line
                    points={points.flatMap((point) => [point.x, point.y])}
                    closed={true}
                    stroke="black"
                  />
                )}

                <RenderTriangle
                  points={lines}
                  canDraw={canDraw}
                  centerLine={centerLine}
                  handleLineClick={handleLineClick}
                  handleLineDragMove={handleLineDragMove}
                  handleLineDragStart={handleLineDragStart}
                  handleLineDragMoveEnd={handleLineDragMoveEnd}
                  filledAreaPoints={filledAreaPoints}
                  isDragging={isDragging}
                  onMouseOver={canDraw === 0 && handleGroupMouseOver}
                  onMouseOut={canDraw === 0 && handleGroupMouseOut}
                  isDrag={isDrag}
                  onDblClick={onDblClick}
                  onContextMenu={(e) => {
                    setIsOpenModalLine({ open: true, type: typeModal.edit });
                  }}
                />
                {!isDrag &&
                  filledAreaPoints.map((point, index) => (
                    <Ellipse
                      key={index}
                      x={point.x}
                      y={point.y}
                      radiusX={5}
                      radiusY={5}
                      fill="red"
                      onMouseDown={(e) => onClickPoint(e, index)}
                      onMouseOver={handleGroupMouseOver}
                      onMouseOut={handleGroupMouseOut}
                    />
                  ))}
              </Layer>
            </Stage>
          </div>
        </TransformComponent>
      </TransformWrapper>
      <ToolsControl toolControl={toolControl} canDraw={canDraw} />
      {isOpenModalLine.open && (
        <ModalAddLine
          open={isOpenModalLine.open}
          type={isOpenModalLine.type}
          handleClose={handleCloseLine}
          handleSubmit={handleAddLine}
        />
      )}
      {isOpenModalZone.open && (
        <ModalAddZone
          open={isOpenModalZone.open}
          zoneIndex={zone[selectedLine]}
          handleClose={() => {
            setIsOpenModalZone({ open: false, type: typeModal.add });
            setIsDraw(true);
            setPoints([]);
            setFilledAreaPoints([]);
            if (isOpenModalZone.type === typeModal.add) {
              setZones((prev) => {
                const tempData = [...prev];
                tempData.pop();
                return tempData;
              });
              return;
            } else {
              setZones((prev) => {
                const tempData = [...prev];
                return tempData;
              });

              return;
            }
          }}
          handleSubmit={handleAddZone}
        />
      )}
    </Box>
  );
});
export default FinalDraw;
