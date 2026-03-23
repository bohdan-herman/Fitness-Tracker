import express from "express";
import authRouter from "./routes/authRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.listen(PORT, () => {
  console.log(`Сервер запущен → ${PORT}`);
});
