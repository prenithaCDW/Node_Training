import Joi from "joi";
import logger from "../config/logger.js";

/**
 * Validation Schemes
 * createBuddySchema: Requires all fields for creating a new Buddy
 * updateBuddySchema: Allows partial updates but requires at least one field
 */
const createBuddySchema = Joi.object({
    employeeID: Joi.string().required().messages({
        "string.base": "employeeId must be a string",
        "any.required": "employeeId is required",
    }),
    realName: Joi.string().required().messages({
        "string.base": "realName must be a string",
        "any.required": "realName is required",
    }),
    nickName: Joi.string().required().messages({
        "string.base": "nickName must be a string",
        "any.required": "nickName is required",
    }),
    dob: Joi.date().iso().required().messages({
        "date.base": "dob must be a valid date",
        "date.format": "dob must be in YYYY-MM-DD format",
    }),
    hobbies: Joi.array().items(Joi.string()).required().messages({
        "array.base": "hobbies must be an array",
        "string.base": "each hobby must be a string",
    }),
});

//update
const updateBuddySchema = Joi.object({
    employeeID: Joi.string().messages({
        "string.base": "employeeId must be a string",
    }),

    realName: Joi.string().messages({
        "string.base": "realName must be a string",
    }),

    nickName: Joi.string().messages({
        "string.base": "nickName must be a string",
    }),

    dob: Joi.date().iso().messages({
        "date.base": "dob must be a valid date",
        "date.format": "dob must be in YYYY-MM-DD format",
    }),

    hobbies: Joi.array().items(Joi.string()).messages({
        "array.base": "hobbies must be an array",
        "string.base": "each hobby must be a string",
    }),
}).min(1).messages({ "object.min": "At least one field must be provided for update", });

/**
 * Validation middleware of pUT/POST
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */
const validateMiddleware = (req, res, next) => {
    let schema;

    if (req.method === "POST") {
        schema = createBuddySchema;
    } else if (req.method === "PUT") {
        schema = updateBuddySchema;
    } else {
        logger.debug("Validation skipped for non-POST/PUT request", { method: req.method, url: req.originalUrl, });
        return next();
    }

    const { error } = schema.validate(req.body, { abortEarly: true, });

    if (error) {
        logger.warn("Validation failed for request body", { method: req.method, message: error.message, stack: error.stack });
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    logger.info("Validation passed successfully", { method: req.method, url: req.originalUrl, });
    next();
};

export { validateMiddleware };