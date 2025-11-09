const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");
const verifyToken = require("./middleware/verifyToken");

dotenv.config();

const app = express();

// From ToDo-React/server/index.js

const ALLOWED_ORIGINS = [
  process.env.DEVELOPMENT_URL,
  process.env.PRODUCTION_URL,
  "http://localhost:5173", // Ditambahkan untuk Vite dev server
];

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/route", verifyToken, taskRoute);

app.get("/", (req, res) => {
  res.json({
    message: `Welcome to the Todo List API server WEB todo App`,
  });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// Tentukan URL Koneksi berdasarkan Environment
// const isDocker = process.env.IS_DOCKER === "true";

// Tentukan MONGO_URL di sini, bukan di .env, agar bisa diswitch
const MONGO_URL =
  process.env.MONGO_URL || `mongodb://localhost:27017/mydatabase`;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Baris di bawah ini adalah perbaikan untuk timeout koneksi di Docker
    serverSelectionTimeoutMS: 5000, // Tambahkan timeout yang jelas (5 detik)
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = server;
