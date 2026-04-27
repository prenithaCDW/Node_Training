import { getAll, getOne, create, update, remove } from "../services/buddiesService.js";
import logger from "../config/logger.js";

//get all buddies
const getAllBuddies = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden Authorization" });
    }
    const result = await getAll();
    logger.info("Get all buddies");
    res.status(result.status).json(result.data);
  }
  catch (error) {
    logger.error("Failed to get all buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//get single buddy
const getSingleBuddy = async (req, res) => {
  try {
    const result = await getOne(req.params.value);
    logger.info("Get single buddies");
    res.status(result.status).json(result.data);
  }
  catch (error) {
    logger.error("Failed to get single buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};
//add buddy
const addBuddy = async (req, res) => {
  try {
    if (req.user.role === "user") {
      req.body.employeeID = req.user.employeeID;
    }
    const result = await create(req.body);
    logger.info("Add single buddies");
    res.status(result.status).json(result.data);
  }
  catch (error) {
    logger.error("Failed to add single buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//update buddy
const updateBuddy = async (req, res) => {
  try {
    let employeeID;
    if (req.user.role === "user") {
      employeeID = req.user.employeeID;
    }
    else {
      employeeID = req.params.employeeID;
    }
    const result = await update(employeeID, req.body);
    logger.info("Update buddy using id ");
    res.status(result.status).json(result.data);
  }
  catch (error) {
    logger.error("Failed to update buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

//delete buddy
const deleteBuddy = async (req, res) => {
  try {
    let employeeID;
    if (req.user.role === "user") {
      employeeID = req.user.employeeID;
    }
    else {
      employeeID = req.params.employeeID;
    }
    if (!employeeID) {
      return res.status(400).json({ message: "Employee ID missing" });
    }
    const result = await remove(employeeID);
    logger.info("Delete single buddy");
    res.status(result.status).json(result.data);
  }
  catch (error) {
    logger.error("Failed to delete buddy", { message: error.message, stack: error.stack });
    res.status(500).json({ message: error.message });
  }
};

export { getAllBuddies, getSingleBuddy, addBuddy, updateBuddy, deleteBuddy }