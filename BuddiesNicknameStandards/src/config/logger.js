import winston from "winston";
const LOGGER_LEVEL = process.env.LOGGER_LEVEL;

const logger = winston.createLogger({
  level: LOGGER_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({format:winston.format.colorize()}),
    new winston.transports.File({ filename: "./src/logger/combined.log" }),
    new winston.transports.File({ filename: './src/logger/error.log', level: 'error' }),
  ],
});

export default logger;