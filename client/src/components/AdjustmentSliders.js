import React, { useRef, useState, useEffect } from "react";
import { useImage } from "../context/ImageContext";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const AdjustmentSliders = () => {
  const { settings, setSettings, setPreview, image, preview, setImage } =
    useImage();
  const [cropper, setCropper] = useState(null);
  const cropperRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (typeof image === "string") {
      setImageUrl(image);
    } else if (image instanceof Blob) {
      const objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);

      // Clean up object URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [image]);

  // Handle adjustment changes
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const newSettings = { ...settings, [name]: parseFloat(value) };
    setSettings(newSettings);

    try {
      const response = await fetch("http://localhost:5000/api/images/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSettings,
          image: preview || imageUrl, // Use the preview or the original image URL
        }),
      });

      if (!response.ok) {
        throw new Error("Error applying adjustments");
      }

      const data = await response.json();
      setPreview(data.previewUrl); // Update preview with the processed image
    } catch (err) {
      console.error("Error applying adjustments", err);
    }
  };

  // Handle cropping
  const handleCrop = async () => {
    if (!cropper) return;

    const croppedCanvas = cropper.getCroppedCanvas({
      width: 500, // Adjust the width to a reasonable size
      height: 500, // Adjust the height
    });

    const croppedImage = croppedCanvas.toDataURL("image/jpeg", 0.7); // 70% quality to reduce size

    setPreview(croppedImage);

    try {
      const response = await fetch("http://localhost:5000/api/images/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: croppedImage, ...settings }),
      });

      if (!response.ok) {
        throw new Error("Error applying crop");
      }

      const data = await response.json();
      setPreview(data.previewUrl); // Update preview with processed image
    } catch (err) {
      console.error("Error applying crop", err);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-6">
      {imageUrl && (
        <div className="mb-6">
          <Cropper
            src={imageUrl}
            style={{ height: 400, width: "100%", borderRadius: "0.5rem" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            cropBoxResizable={false}
            ref={cropperRef}
            onInitialized={(instance) => setCropper(instance)}
          />
          <button
            onClick={handleCrop}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Crop and Apply Adjustments
          </button>
        </div>
      )}

      <div className="space-y-4">
        {["brightness", "contrast", "saturation", "rotation"].map((setting) => (
          <div key={setting} className="flex flex-col">
            <label className="text-lg font-medium mb-2">
              {setting.charAt(0).toUpperCase() + setting.slice(1)}
            </label>
            <input
              type="range"
              name={setting}
              min={setting === "rotation" ? "0" : "0"}
              max={setting === "rotation" ? "360" : "2"}
              step={setting === "rotation" ? "1" : "0.1"}
              value={settings[setting]}
              onChange={handleChange}
              className="accent-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdjustmentSliders;
