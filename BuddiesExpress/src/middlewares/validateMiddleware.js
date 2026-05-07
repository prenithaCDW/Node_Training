const Joi = require("joi");

//Schema
//create
const createBuddySchema = Joi.object({
    employeeId: Joi.string().required().messages({
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
    employeeId: Joi.string().messages({
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
}).min(1).messages({ "object.min": "At least one field must be provided for update",});

// Validation middleware
const validateMiddleware = (req, res, next) => {
    let schema;

    if (req.method === "POST") {
        schema = createBuddySchema;
    } else if (req.method === "PUT") {
        schema = updateBuddySchema;
    } else {
        return next();
    }

    const { error } = schema.validate(req.body, {
        abortEarly: true,
    });

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    next();
};

module.exports = { validateMiddleware };