import path from "path";
import { fileURLToPath } from "url";
import express, { json, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";

import connectDB from "./config/db.js";
import Character from "./models/Character.js";
import characterRoutes from "./routes/characters.js";

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(helmet());
app.use(json({ limit: "10kb" }));
app.use(urlencoded({ extended: true, limit: "10kb" }));
app.use("/api/characters", characterRoutes);
app.set("trust proxy", 1);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
