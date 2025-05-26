const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === "production") {
  const __DIRNAME = path.resolve();
  app.use(express.static(path.join(__DIRNAME, "front/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__DIRNAME, "front", "dist", "index.html"));
  });
}

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log("🚀 Server on http://localhost:3000")
  );
});
