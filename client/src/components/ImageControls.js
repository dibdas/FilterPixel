import React from "react";
import { useImage } from "../context/ImageContext";

const ImageControls = () => {
  const { settings, setSettings } = useImage();

  const handleRotationChange = (event) => {
    const rotation = event.target.value;
    setSettings((prevSettings) => ({
      ...prevSettings,
      rotation,
    }));

    // Call backend to update preview after rotation
    // Similar to brightness, contrast, etc.
  };

  return (
    <div>
      <label>
        Rotate Image:
        <input
          type="range"
          min="0"
          max="360"
          value={settings.rotation}
          onChange={handleRotationChange}
        />
      </label>
    </div>
  );
};

export default ImageControls;
