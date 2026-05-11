import mongoose from "mongoose";
import logger from "../config/logger.js";

/**
 * Connect to MongoDB Database
 * @returns {Promise<void>} Resolves when the connection is successful
 * @throws {Error} Throws an error if the database connection fails
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("MongoDB connected successfully");
    }
    catch (error) {
        logger.error("MongoDB connection failed:", {message:error.message, stack:error.stack});
        throw error;
    }
};

export default connectDB;