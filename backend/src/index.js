import express from "express";
import authRouter from "./routes/authRouter.js";
import workoutRouter from "./routes/workoutRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/workout", workoutRouter);

app.listen(PORT, () => {
  console.log(`Server started → ${PORT}`);
});
