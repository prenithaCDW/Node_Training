import express from "express";
import { getAllBuddies, getSingleBuddy, addBuddy, updateBuddy, deleteBuddy } from "../controllers/buddiesController.js";
const router = express.Router();
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware.js";

router.get("/", verifyToken, authorizeRole("admin"), getAllBuddies);
router.post("/addBuddy", verifyToken, authorizeRole("user", "admin"), addBuddy);
router.put("/:employeeID", verifyToken, authorizeRole("user", "admin"), updateBuddy);
router.delete("/:employeeID", verifyToken, authorizeRole("admin"), deleteBuddy);
router.get("/:value", verifyToken, authorizeRole("user", "admin"), getSingleBuddy);
export default router;