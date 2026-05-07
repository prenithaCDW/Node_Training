const {getAll,getOne,create,update,remove} = require("../services/buddiesService");

//fetch all buddies
const getAllBuddies = (req, res) => {
  const result = getAll();
  res.status(result.status).json(result.data);
};

//fetch a single buddy by a specific value: ID or name
const getSingleBuddy = (req, res) => {
  const result =getOne(req.params.value);
  res.status(result.status).json(result.data);
};

//create a new buddy
const addBuddy = (req, res) => {
  const result = create(req.body);
  res.status(result.status).json(result.data);
};

//update an existing buddy
const updateBuddy = (req, res) => {
  const result = update(req.params.employeeId, req.body);
  res.status(result.status).json(result.data);
};

// delete a buddy
const deleteBuddy = (req, res) => {
  const result = remove(req.params.employeeId);
  res.status(result.status).json(result.data);
};

module.exports={getAllBuddies,getSingleBuddy,addBuddy,updateBuddy,deleteBuddy};