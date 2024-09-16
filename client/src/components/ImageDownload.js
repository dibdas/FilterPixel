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
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => handleDownload("png")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Download as PNG
      </button>
      <button
        onClick={() => handleDownload("jpeg")}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Download as JPEG
      </button>
    </div>
  );
};

export default ImageDownload;
