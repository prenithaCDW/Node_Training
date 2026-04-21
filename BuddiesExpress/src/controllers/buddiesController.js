const service = require("../services/buddiesService");

const getAllBuddies = (req, res) => {
  const result = service.getAll();
  res.status(result.status).json(result.data);
};

const getSingleBuddy = (req, res) => {
  const result = service.getOne(req.params.value);
  res.status(result.status).json(result.data);
};

const addBuddy = (req, res) => {
  const result = service.create(req.body);
  res.status(result.status).json(result.data);
};

const updateBuddy = (req, res) => {
  const result = service.update(req.params.employeeId, req.body);
  res.status(result.status).json(result.data);
};

const deleteBuddy = (req, res) => {
  const result = service.remove(req.params.employeeId);
  res.status(result.status).json(result.data);
};

module.exports={getAllBuddies,getSingleBuddy,addBuddy,updateBuddy,deleteBuddy};