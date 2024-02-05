import React, { useEffect, useRef, useState } from "react";
import simplify from "simplify-js";

const DrawingPolygon = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setPoints([{ x: offsetX, y: offsetY }]);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setPoints((prevPoints) => [...prevPoints, { x: offsetX, y: offsetY }]);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.closePath();
      ctx.stroke();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrawing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const tolerance = 5;
    const simplifiedPolygon = simplify(points, tolerance, true);
    // Draw the polygon
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (simplifiedPolygon.length > 1) {
      ctx.beginPath();
      ctx.moveTo(simplifiedPolygon[0].x, simplifiedPolygon[0].y);
      simplifiedPolygon.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.stroke();
    }
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      width="400"
      height="400"
      style={{ border: "1px solid #333" }}
    />
  );
};

export default DrawingPolygon;
