const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const path = require("path");

const __DIRNAME = path.resolve();

app.use(express.static(path.join(__DIRNAME, "/front/dist")));

// Configuration CORS
const allowedOrigins = [
  "https://app-news-qfqs.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(express.json());

const postRoutes = require("./routes/posts");

app.use("/api/posts", postRoutes);

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__DIRNAME, "front", "dist", "index.html"));
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log("🚀 Server on http://localhost:3000")
  );
});
