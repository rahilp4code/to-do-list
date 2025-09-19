import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
dotenv.config();

dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

//route
app.use("/api/v1/users", userRouter);
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this sever!..`, 404));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
