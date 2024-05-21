import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(bodyParser.json());
app.use("/api", userRouter);
app.use(errorHandler);

export default app;
