import { getAll, getOne, create, update, remove } from "../services/buddiesService.js";
import logger from "../config/logger.js";
//get all buddies
const getAllBuddies = async (req, res) => {
  try {
    const result = await getAll();
    logger.info("Get all buddies");
    res.status(result.status).json(result.data);
  }
  catch (err) {
    logger.error("Failed to get all buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: err.message });
  }
};
//get single buddy
const getSingleBuddy = async (req, res) => {
  try {
    const result = await getOne(req.params.value);
    logger.info("Get single buddies");
    res.status(result.status).json(result.data);
  }
  catch (err) {
    logger.error("Failed to get single buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: err.message });
  }
};
//add buddy
const addBuddy = async (req, res) => {
  try {
    const result = await create(req.body);
    logger.info("Add single buddies");
    res.status(result.status).json(result.data);
  }
  catch (err) {
    logger.error("Failed to add single buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: err.message });
  }
};
//update buddy
const updateBuddy = async (req, res) => {
  try {
    const result = await update(req.params.employeeID, req.body);
    logger.info("Update buddy using id ");
    res.status(result.status).json(result.data);
  }
  catch (err) {
    logger.error("Failed to update buddies", { message: error.message, stack: error.stack });
    res.status(500).json({ message: err.message });
  }
};

const deleteBuddy = async (req, res) => {
  try {
    const result = await remove(req.params.employeeID);
    logger.info("Delete single buddy");
    res.status(result.status).json(result.data);
  }
  catch (err) {
    logger.error("Failed to delete buddy", { message: error.message, stack: error.stack });
    res.status(500).json({ message: err.message });
  }
};

export { getAllBuddies, getSingleBuddy, addBuddy, updateBuddy, deleteBuddy }