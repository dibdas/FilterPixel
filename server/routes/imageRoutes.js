const express = require("express");
const {
  uploadImage,
  manipulateImage,
  downloadImage,
} = require("../controllers/imageControllers");
const multer = require("multer");
const router = express.Router();

// Multer configuration: store images in memory

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50 MB
});

// Routes
router.post("/upload", upload.single("image"), uploadImage);
router.post("/process", manipulateImage);
router.get("/download", downloadImage);

module.exports = router;
