const service = require("../services/buddiesService");

exports.getAllBuddies = (req, res) => {
  const result = service.getAll();
  res.status(result.status).json(result.data);
};

exports.getSingleBuddy = (req, res) => {
  const result = service.getOne(req.params.value);
  res.status(result.status).json(result.data);
};

exports.addBuddy = (req, res) => {
  const result = service.create(req.body);
  res.status(result.status).json(result.data);
};

exports.updateBuddy = (req, res) => {
  const result = service.update(req.params.employeeId, req.body);
  res.status(result.status).json(result.data);
};

exports.deleteBuddy = (req, res) => {
  const result = service.remove(req.params.employeeId);
  res.status(result.status).json(result.data);
};