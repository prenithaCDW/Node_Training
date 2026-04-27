import jwt from "jsonwebtoken";
import user from "../models/user.js";
import logger from "../config/logger.js";


//Token verification
const verifyToken = async (req, res, next) => {
    const header = req.header("authorization");
    if (!header || !header.startsWith("Bearer")) {
        logger.warn("Authorization failed. Missing or invalid authorization header", { path: req.originalUrl, method: req.method });
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const token = header.split(" ")[1];
        logger.info("Token received", { path: req.originalUrl, method: req.method });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info("Token verified", { employeeID: decoded.employeeID });

        const findUser = await user.findOne({ employeeID: decoded.employeeID });
        if (!findUser) {
            logger.warn("Authorization failed as user was not found", { employeeID: decoded.employeeID });
            return res.status(401).json({ message: "User not found" });
        }
        //check the version of token as logout based
        if (findUser.tokenState !== decoded.tokenState) {
            logger.warn("Token version mismatch", { employeeID: findUser.employeeID, dbToken: findUser.tokenState, currentToken: decoded.tokenState });
            return res.status(401).json({
                message: "Token expired. Please login again"
            });
        }
        req.user = { employeeID: findUser.employeeID, role: findUser.role };
        logger.info("Authorization was successful", { employeeID: findUser.employeeID, role: findUser.role });
        next();
    }
    catch (error) {
        logger.error("Invalid token", { error: error.message, path: req.originalUrl });
        res.status(401).json({ error: 'Invalid token' });
    }
}

//Authorizaton of roles
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            logger.warn("Authorization failed as no correct role", { role: userRole, allowedRoles: roles, path: req.originalUrl, method: req.method });
            return res.status(403).json({ message: "The role does not haves access" });
        }
        logger.info("Authorization successful", { role: userRole, path: req.originalUrl });
        next();
    }
}

export { verifyToken, authorizeRole };