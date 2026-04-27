import { signup, login, logout } from "../services/authService.js";
import logger from "../config/logger.js";

//register user
const registerUser = async (req, res) => {
    try {
        logger.info("Register request received", { path: req.originalUrl, method: req.method, body: { employeeID: req.body.employeeID } });
        const signUpResult = await signup(req.body);
        logger.info("User registered successfully");
        res.status(signUpResult.status).json(signUpResult.data);
    }
    catch (error) {
        logger.error("Failed to sign up", { message: error.message, stack: error.stack });
        res.status(500).json({ message: error.message });
    }
}

//login user
const loginUser = async (req, res) => {
    try {
        logger.info("Login request", { employeeID: req.body.employeeID, path: req.originalUrl });
        const loginResult = await login(req.body.employeeID, req.body.password)
        logger.info("User log in succussfull");
        res.status(loginResult.status).json(loginResult.data);
    }
    catch (error) {
        logger.error("Failed to login", { message: error.message, stack: error.stack });
        res.status(500).json({ message: error.message });
    }
}

//logout user
const logoutUser = async (req, res) => {
    try {
        logger.info("Logout request", { employeeID: req.user.employeeID, path: req.originalUrl });
        const logoutResult = await logout(req.user.employeeID)
        logger.info("User logout succussfull");
        res.status(logoutResult.status).json(logoutResult.data);
    }
    catch (error) {
        logger.error("Failed to logout", { message: error.message, stack: error.stack });
        res.status(500).json({ message: error.message });
    }
}

export { registerUser, loginUser, logoutUser };