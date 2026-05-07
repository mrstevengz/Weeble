import { Router } from "express";
import Character from "../models/Character.js";
import { isValidObjectId } from "mongoose";

const router = Router();

//CRUD de la app

//Simple GET ALL para todos los datos
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json({ success: true, data: characters });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

//Personaje por ID

router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({
        success: false,
        error: "Character not found",
      });
    }

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    res.json({ success: true, data: character });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

export default router;
