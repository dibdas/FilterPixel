const sharp = require("sharp");

// Temporary storage for the image and manipulation settings
let storedImageBuffer = null;
let originalFormat = null;

// Image upload handler
exports.uploadImage = (req, res) => {
  const imageBuffer = req.file.buffer;
  originalFormat = req.file.mimetype === "image/png" ? "png" : "jpeg";

  // Store the uploaded image in memory
  storedImageBuffer = imageBuffer;

  // Send back a success message with a low-quality preview
  sharp(imageBuffer)
    .resize(300)
    .toBuffer()
    .then((previewBuffer) => {
      const previewUrl = `data:image/${originalFormat};base64,${previewBuffer.toString(
        "base64"
      )}`;
      res.json({ previewUrl });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error processing image preview", error: err })
    );
};
exports.manipulateImage = (req, res) => {
  const { brightness, contrast, saturation, rotation, image } = req.body;
  const imageBuffer = image
    ? Buffer.from(image.split(",")[1], "base64")
    : storedImageBuffer; // Use provided image or stored buffer

  if (!imageBuffer) {
    return res.status(400).json({ message: "No image data provided" });
  }

  sharp(imageBuffer)
    .modulate({
      brightness: parseFloat(brightness),
      saturation: parseFloat(saturation),
    })
    .rotate(parseInt(rotation))
    .linear(parseFloat(contrast), 0) // Simple contrast
    .resize(300) // Adjust size for preview
    .toBuffer()
    .then((previewBuffer) => {
      storedImageBuffer = previewBuffer; // Update with modified image
      const previewUrl = `data:image/jpeg;base64,${previewBuffer.toString(
        "base64"
      )}`; // Adjust format if needed
      res.json({ previewUrl });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error processing image", error: err })
    );
};

exports.downloadImage = (req, res) => {
  const { format } = req.query; // Expect 'png' or 'jpeg'

  if (!format || !["png", "jpeg"].includes(format)) {
    return res.status(400).json({ message: "Invalid format requested" });
  }

  if (!storedImageBuffer) {
    return res
      .status(400)
      .json({ message: "No image data available for download" });
  }

  sharp(storedImageBuffer)
    .toFormat(format)
    .toBuffer()
    .then((finalBuffer) => {
      res.set({
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="image.${format}"`,
      });
      res.send(finalBuffer);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error processing download", error: err })
    );
};
