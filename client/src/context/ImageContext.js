// context/ImageContext.js
import React, { createContext, useState, useContext } from "react";

// Create the Image Context
const ImageContext = createContext();

// Provide the state for image manipulation
export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState(null); // Store the original image file
  const [preview, setPreview] = useState(null); // Store the preview URL for real-time updates
  const [settings, setSettings] = useState({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    rotation: 0,
  }); // Store manipulation settings

  return (
    <ImageContext.Provider
      value={{ image, setImage, preview, setPreview, settings, setSettings }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use ImageContext
export const useImage = () => useContext(ImageContext);
