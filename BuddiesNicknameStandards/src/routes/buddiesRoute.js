import express from "express";
import {getAllBuddies,getSingleBuddy,addBuddy,updateBuddy,deleteBuddy} from "../controllers/buddiesController.js";
const router = express.Router();

router.get("/", getAllBuddies);
router.post("/addBuddy",addBuddy);
router.put("/:employeeID", updateBuddy);
router.delete("/:employeeID", deleteBuddy);
router.get("/:value", getSingleBuddy);
export default router;
