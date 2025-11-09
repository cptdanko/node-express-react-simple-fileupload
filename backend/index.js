import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Folder to store uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// --- Routes ---

// 1️⃣ Simple hello world API
app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

// 2️⃣ POST endpoint to upload images
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded", code: 400 });
    }
    res.status(200).json({
      message: "Image uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Internal Server Error", code: 500 });
  }
});

// 3️⃣ GET endpoint to list all uploaded images
app.get("/api/images", (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const imagePaths = files.map((file) => `/uploads/${file}`);
    res.status(200).json({ images: imagePaths });
  } catch (err) {
    console.error("Listing error:", err);
    res.status(500).json({ error: "Unable to read images", code: 500 });
  }
});

// 4️⃣ Serve individual images via /image/:imageName
app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(uploadDir, imageName);

  // Check if file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Image not found", code: 404 });
  }

  // Send the file directly
  res.sendFile(imagePath);
});

// 5️⃣ Serve uploaded images statically (for gallery usage)
app.use("/uploads", express.static(uploadDir));

// Default error handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", code: 404 });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
