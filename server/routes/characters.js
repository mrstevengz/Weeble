import { Router } from "express";
import Character from "../models/Character";

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
    res.json({ success: true, data: character });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

export default router;
