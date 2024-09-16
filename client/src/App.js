import React from "react";
import { ImageProvider } from "./context/ImageContext";
import ImageUpload from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import AdjustmentSliders from "./components/AdjustmentSliders";
import ImageControls from "./components/ImageControls";
import ImageDownload from "./components/ImageDownload";

const App = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Image Processing App
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <ImageUpload />
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <ImagePreview />
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <AdjustmentSliders />
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <ImageControls />
        </div>
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          <ImageDownload />
        </div>
      </div>
    </ImageProvider>
  );
};

export default App;
