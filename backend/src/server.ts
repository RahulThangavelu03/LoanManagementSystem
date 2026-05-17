import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes" 
import LoanRoutes from "./routes/LoanRoutes"


import {
  protect
} from "./middleware/authMiddleware";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.get("/", (_, res) => {
  res.send("API Running...");
});

app.get(
  "/api/protected",

  protect,

  (req, res) => {

    res.json({
      message: "Protected route working"
    });
  }
);

app.use("/api/loan", LoanRoutes);


app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});