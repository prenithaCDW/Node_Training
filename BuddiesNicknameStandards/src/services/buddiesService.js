import Buddy from "../models/buddy.js";
/***
 * Get all  buddies
 * Reads data from JSON file and returns all buddies
 * @returns all buddies from JSON file
 */
const getAll = async () => {
    const allData = await Buddy.find();
    return { status: 200, data: allData };
};

/**
 *  GET SINGLE BUDDY BY employeeID OR realName
 * @param {*} value 
 * @returns one buddy from JSON file
 */
const getOne = async (value) => {
    const buddy = await Buddy.findOne({
        $or: [{ employeeID: value },
        { realName: new RegExp(`^${value}$`, "i") },
        ]
    });

    if (!buddy) {
        return { status: 404, data: { message: "Buddy not found" } };
    }
    return { status: 200, data: buddy };
};
/**
 * CREATE / ADD NEW BUDDY
 * @param {*} data 
 * @returns the buddy created
 */
const create = async (data) => {
    if (!data.employeeID || !data.realName) {
        return { status: 400, data: { message: "employeeID and realName are required" } };
    }
    const existBuddy = await Buddy.findOne({ employeeID: data.employeeID });
    if (existBuddy) {
        return { status: 400, data: { message: "Employee already exists" } };
    }
    const newBuddy = await Buddy.create(data);
    return { status: 201, data: newBuddy };
};
/**
 * UPDATE EXISTING BUDDY (Partial Update)
 * @param {*} employeeID 
 * @param {*} updates 
 * @returns updated field of the buddy
 */
const update = async (employeeID, updates) => {
    const updateBuddy = await Buddy.findOneAndUpdate({ employeeID: employeeID }, updates, { returnDocument:"after"});
    if (!updateBuddy) {
        return { status: 404, data: { message: "Buddy not found" } }
    }
    return { status: 200, data: updateBuddy };
};
/**
 * DELETE BUDDY BY employeeID
 * @param {*} employeeID 
 * @returns message 
 */
const remove = async (employeeID) => {
    const removeBuddy = await Buddy.findOneAndDelete({employeeID});
    if (!removeBuddy) {
        return { status: 404, data: { message: "Buddy not found" } };
    }
    return { status: 200, data: { message: "Buddy deleted successfully" } };
};

export { getAll, getOne, create, update, remove };