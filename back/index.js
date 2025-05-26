const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

const postRoutes = require("./routes/posts");

app.use("/api/posts", postRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log("🚀 Server on http://localhost:3000")
  );
});
