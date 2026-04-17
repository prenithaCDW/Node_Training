const fs=require("fs");
const path=require("path");

const filePath = path.join(__dirname, "..", "data", "cdw_ace26_buddies.json");

exports.readData = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

exports.writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};