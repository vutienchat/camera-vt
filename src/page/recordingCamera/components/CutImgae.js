import React, { useEffect, useRef, useState } from "react";
import imageUrl from "../../../asset/image/test3.jpg";

const ImageCutter = () => {
  // Giá trị top, bottom, left và right
  //   const top = 273, 939;
  //   const bottom = 366, 1008;
  //   const left = 939;
  //   const right = 1008;

  const top = 939; //y1
  const bottom = 1008; //y2

  const left = 273; //x1
  const right = 366; //x2
  // Tính toán chiều rộng và chiều cao của vùng cắt
  const width = right - left;
  const height = bottom - top;

  // Đường dẫn đến ảnh
  //   const imageUrl = "../../../asset/image/test.jpg";

  // Tạo style cho div cắt ảnh
  const divStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: `-${left}px -${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return <div className="image-cutter" style={divStyle}></div>;
};
// export default ImageCutter;

const CroppedImage = ({ x1, x2, y1, y2 }) => {
  const canvasRef = useRef(null);
  const top = 939; //y1
  const bottom = 1008; //y2

  const left = 273; //x1
  const right = 366; //x2

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const width = right - left;
      const height = bottom - top;

      // Đặt kích thước của canvas để vùng cắt
      canvas.width = width;
      canvas.height = height;

      // Vẽ ảnh trên canvas với vùng cắt
      ctx.drawImage(image, x1, y1, width, height, 0, 0, width, height);
    };
  }, [imageUrl, top, bottom, left, right]);

  return <canvas ref={canvasRef} />;
};

const ImageCropper = ({ x1, y1, x2, y2 }) => {
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const top = 939; //y1
  const bottom = 1008; //y2

  const left = 273; //x1
  const right = 366; //x2

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // make sure we can access image from another host

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Tính toán chiều rộng và chiều cao của vùng cắt
      const width = right - left;
      const height = bottom - top;

      // Đặt kích thước của canvas để vùng cắt
      canvas.width = width;
      canvas.height = height;

      // Vẽ ảnh trên canvas với vùng cắt
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);

      // Lấy dữ liệu hình ảnh từ canvas dưới dạng URL
      const croppedImageUrl = canvas.toDataURL("image/png");

      setCroppedImageUrl(croppedImageUrl);
    };

    img.src = imageUrl;
  }, [imageUrl, top, left, bottom, right]);

  return (
    <div>{croppedImageUrl && <img src={croppedImageUrl} alt="Cropped" />}</div>
  );
};

export default ImageCropper;
