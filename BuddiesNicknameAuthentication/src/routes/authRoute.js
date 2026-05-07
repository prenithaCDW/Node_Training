import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);

export default router; 