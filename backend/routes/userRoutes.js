import express from "express";
import {
  registerUser,
  authUser,
  allUsers,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", authUser);
router.get("/search", protect, allUsers);

export default router;
