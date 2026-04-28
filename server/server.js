import path from "path";
import express, { json, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import Character from "./models/Character.js";
import characterRoutes from "./routes/characters.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: [`http://localhost:3000`, "http://localhost:5000"],
    credentials: true,
  }),
);

//Para aceptar http requests en json
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/characters", characterRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
