import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/user.js";

/**
 * Sign Up
 * @param {*} data
 * @returns succesful creation of user/admin
 */
const signup = async (data) => {
    const { employeeID, password, role } = data;
    if (!employeeID || !password) {
        return { status: 400, data: { message: "Details required correctly for signup" } };
    }

    const userExists = await user.findOne({ employeeID });
    if (userExists) {
        return { status: 400, data: { message: "user already exists" } };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ employeeID, password: hashedPassword, role });
    return { status: 201, data: { message: "New user created successfully", user: { employeeID: newUser.employeeID, role: newUser.role, } } };
}

/**
 * Log In
 * @param {*} employeeID 
 * @param {*} password
 * @returns succesful log in of user/admin
 */
const login = async (employeeID, password) => {
    const userLogin = await user.findOne({ employeeID });
    if (!userLogin) {
        return { status: 401, data: { message: "Authentication failed" } };
    }
    const passwordMatch = await bcrypt.compare(password, userLogin.password);
    if (!passwordMatch) {
        return { status: 401, data: { message: "Authentication failed" } };
    }
    const token = jwt.sign({ employeeID: userLogin.employeeID, role: userLogin.role, tokenState: userLogin.tokenState },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
    );
    return { status: 200, data: { message: "Login Successful", token, user: { employeeID: userLogin.employeeID, role: userLogin.role } } };
}

const logout = async (employeeID) => {
    await user.updateOne({ employeeID }, { $inc: { tokenState: 1 } });
    return { status: 200, data: { message: "Logout successfull" } };
}

export { signup, login, logout };