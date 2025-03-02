require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Get upload directory from .env file
const uploadDir = path.join(__dirname, `../${process.env.UPLOADS_DIR || "/uploads"}`);

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(null, false);
        return req.fileValidationError = "Only image files are allowed!";
    }
};

// Set up multer with file size limit (from .env or default 5MB)
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: process.env.MAX_FILE_SIZE ? parseInt(process.env.MAX_FILE_SIZE) * 1024 * 1024 : 5 * 1024 * 1024 },
});

module.exports = upload;