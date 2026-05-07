import express from "express";
import {getAllBuddies,getSingleBuddy,addBuddy,updateBuddy,deleteBuddy} from "../controllers/buddiesController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";

const router = express.Router();

router.get("/", getAllBuddies);
router.post("/addBuddy",validateMiddleware,addBuddy);
router.put("/:employeeID", validateMiddleware,updateBuddy);
router.delete("/:employeeID", deleteBuddy);
router.get("/:value", getSingleBuddy);
export default router;
