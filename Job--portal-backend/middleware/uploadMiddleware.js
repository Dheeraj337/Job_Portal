const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-resume${extension}`);
  },
});

const allowedExtensions = new Set([".pdf", ".doc", ".docx"]);

const fileFilter = (_req, file, callback) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.has(extension)) {
    return callback(new Error("Resume must be a PDF, DOC, or DOCX file"));
  }

  return callback(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
