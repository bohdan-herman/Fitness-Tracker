import express from "express";
import authRouter from "./routes/authRouter.js";
import workoutRouter from "./routes/workoutRouter.js";
import exerciseRouter from "./routes/exerciseRouter.js";
import profileRouter from "./routes/profileRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/workout", workoutRouter);
app.use("/exercise", exerciseRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Server started → ${PORT}`);
});
