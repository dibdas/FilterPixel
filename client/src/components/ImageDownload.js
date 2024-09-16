import React from "react";
import { useImage } from "../context/ImageContext";

const ImageDownload = () => {
  const { image } = useImage();

  const handleDownload = async (format) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/images/download?format=${format}`,
        {
          method: "GET",
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `image.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading image", err);
    }
  };

  return (
    <div>
      <button onClick={() => handleDownload("png")}>Download as PNG</button>
      <button onClick={() => handleDownload("jpeg")}>Download as JPEG</button>
    </div>
  );
};

export default ImageDownload;
