import "dotenv/config";
import express from "express";
import authRouter from "./routes/authRouter.js";
import workoutRouter from "./routes/workoutRouter.js";
import exerciseRouter from "./routes/exerciseRouter.js";
import profileRouter from "./routes/profileRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const CLIENT_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/workout", workoutRouter);
app.use("/exercise", exerciseRouter);
app.use("/profile", profileRouter);
app.use("/session", sessionRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started → ${PORT}`);
});
