const express = require("express");
const router = express.Router();
const {getAllBuddies,getSingleBuddy,addBuddy,updateBuddy,deleteBuddy}= require("../controllers/buddiesController.js");

router.get("/", getAllBuddies);
router.get("/:value", getSingleBuddy);
router.post("/addBuddy", addBuddy);
router.put("/:employeeId", updateBuddy);
router.delete("/:employeeId",deleteBuddy);

module.exports = router;
