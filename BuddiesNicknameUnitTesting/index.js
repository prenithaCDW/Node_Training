import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/services/DBService.js"
import buddiesRouter from "./src/routes/buddiesRoute.js";
import authRouter from "./src/routes/authRoute.js";
import requestLogger from "./src/middlewares/loggerMiddleware.js";
import errorLogger from "./src/middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(requestLogger);
app.use(cors());
app.use(express.json());

//db connection
connectDB();

//routes
app.use("/auth", authRouter);
app.use("/buddies", buddiesRouter);

app.use(errorLogger);
//server starts
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});

