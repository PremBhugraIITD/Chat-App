import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroup);
router.put("/rename", protect, renameGroup);
router.patch("/add", protect, addToGroup);
router.delete("/remove", protect, removeFromGroup);

export default router;
