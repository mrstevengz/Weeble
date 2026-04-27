const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const Character = require("./models/Character");
const characterRoutes = require("./routes/characters");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: [`http:localhost:3000`, "http:localhost:5000"],
    credentials: true,
  }),
);

//Para aceptar http requests en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/characters", characterRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
