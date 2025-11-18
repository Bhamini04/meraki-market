import express from "express";
import {
  getUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// admin only
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.put("/:id", protect, adminOnly, updateUserByAdmin);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
