const express = require("express");
const router = express.Router();
const {getAllBuddies,getSingleBuddy,addBuddy,updateBuddy,deleteBuddy}= require("../controllers/buddiesController.js");
const {validateMiddleware}=require("../middlewares/validateMiddleware.js");
router.get("/", getAllBuddies);
router.get("/:value", getSingleBuddy);
router.post("/addBuddy", validateMiddleware,addBuddy);
router.put("/:employeeId", validateMiddleware,updateBuddy);
router.delete("/:employeeId",deleteBuddy);

module.exports = router;
