const express = require("express");
const fs = require("fs");
const path = require("path");
const buddiesRoutes = require("./src/routes/buddiesRoute.js");

const app = express();
const PORT = 5000;

//middleware
app.use(express.json());

//file set up
const aceDataFile = path.join(__dirname, "src/data", "cdw_ace26_buddies.json");
if (!fs.existsSync(aceDataFile)) {
    fs.writeFileSync(aceDataFile, JSON.stringify([], null, 2));
    console.log("cdw_ace26_buddies.json file created");
}

//routes
app.use("/buddies", buddiesRoutes);

//server starts
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})