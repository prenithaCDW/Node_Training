const { readData, writeData } = require("../utils/fileUtil");
/***
 * Get all  buddies
 * Reads data from JSON file and returns all buddies
 * @returns all buddies from JSON file
 */
exports.getAll = () => {
    return { status: 200, data: readData() };
};

/**
 *  GET SINGLE BUDDY BY employeeId OR realName
 * @param {*} value 
 * @returns one buddy from JSON file
 */
exports.getOne = (value) => {
    const buddies = readData();
    const buddy = buddies.find((item) => {
        item.employeeId === value || item.realName.toLowerCase() === value.toLowerCase();
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
exports.create = (data) => {
    if (!data.employeeId || !data.realName) {
        return { status: 400, data: { message: "employeeId and realName are required" } };
    }
    const buddies = readData();
    const existBuddy = buddies.some((item) => item.employeeId === data.employeeId);
    if (existBuddy) {
        return { status: 400, data: { message: "Employee already exists" } };
    }
    buddies.push(data);
    writeData(buddies);
    return { status: 201, data };
};
/**
 * UPDATE EXISTING BUDDY (Partial Update)
 * @param {*} employeeId 
 * @param {*} updates 
 * @returns updated field of the buddy
 */
exports.update = (employeeId, updates) => {
    const buddies = readData();
    const index = buddies.findIndex(item => item.employeeId === employeeId);
    if (index === -1) {
        return { status: 404, data: { message: "Buddy not found" } };
    }
    if (updates.realName) {
        buddies[index].realName = updates.realName;
    }
    if (updates.nickName) {
        buddies[index].nickName = updates.nickName;
    }
    if (updates.hobbies) {
        buddies[index].hobbies = updates.hobbies;
    }
    if (updates.dob) {
        buddies[index].dob = updates.dob;
    }
    return { status: 200, data: buddies[index] };
};
/**
 * DELETE BUDDY BY employeeId
 * @param {*} employeeId 
 * @returns message 
 */
exports.remove = (employeeId) => {
    const buddies = readData();
    const index=buddies.findIndex(item=>item.employeeId===employeeId);
    if (index===-1) {
        return { status: 404, data: { message: "Buddy not found" } };
    }
    buddies.splice(index,1);
    writeData(buddies);
    return { status: 200, data: { message: "Buddy deleted successfully" } };
};