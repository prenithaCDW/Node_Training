const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "cdw_ace26_buddies.json");

const readData = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports={readData,writeData};