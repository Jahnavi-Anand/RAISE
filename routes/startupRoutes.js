import express from "express";
import Startup from "../models/startup.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const startups = await Startup.find();
  res.json(startups);
});


router.get("/me", protect(["startup"]), async (req, res) => {
  const startup = await Startup.findById(req.user.id);
  res.json(startup);
});

export default router;
