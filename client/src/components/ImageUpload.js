import React, { useRef, useState } from "react";
import { useImage } from "../context/ImageContext";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageUpload = () => {
  const { setImage, setPreview } = useImage();
  const [file, setFile] = useState(null);

  const handleUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("image", uploadedFile);

    setFile(URL.createObjectURL(uploadedFile));
    setImage(uploadedFile);

    try {
      const response = await fetch("http://localhost:5000/api/images/upload/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.previewUrl) {
        setPreview(data.previewUrl);
      } else {
        throw new Error("Preview URL not found in response");
      }
    } catch (err) {
      console.error("Error uploading image", err.message);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
      />
    </div>
  );
};

export default ImageUpload;
