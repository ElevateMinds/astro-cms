import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api", userRouter);
app.use(errorHandler);

export default app;
