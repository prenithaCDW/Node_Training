import logger from "../config/logger.js";

const errorLogger = (err, req, res, next) => {
    logger.error("HTTP error", {
        method: req.method,
        url: req.originalUrl,
        statusCode: err.status || 500,
        message: err.message,
        stack: err.stack,
    });
    res.status(500).json({
        message: "Internal Server Error",
    });
};

export default errorLogger;