const express = require("express");
const router = express.Router();
const controller = require("../controllers/buddiesController.js");

router.get("/", controller.getAllBuddies);
router.get("/:value", controller.getSingleBuddy);
router.post("/addBuddy", controller.addBuddy);
router.put("/:employeeId", controller.updateBuddy);
router.delete("/:employeeId", controller.deleteBuddy);

module.exports = router;
