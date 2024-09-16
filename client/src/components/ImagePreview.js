import React from "react";
import { useImage } from "../context/ImageContext";
import { FaImage } from "react-icons/fa"; // Optional: For a placeholder icon

const ImagePreview = () => {
  const { preview } = useImage();

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100 border rounded-md shadow-lg max-w-full mx-auto">
      {preview ? (
        <img
          src={preview}
          alt="Image Preview"
          className="max-w-full h-auto rounded-lg border border-gray-300 shadow-sm"
        />
      ) : (
        <div className="flex flex-col items-center">
          <FaImage className="text-gray-500 text-6xl mb-4" />
          <p className="text-gray-600">No image uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
