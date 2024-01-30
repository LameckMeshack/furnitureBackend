const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/productsRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3001;
const hostname = "localhost";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!".bgGreen))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//Endpoints
app.use("/api/products", productRouter);
app.use("/api/", authRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT || port, "0.0.0.0", () =>
  console.log(`Example app listening on port ${process.env.PORT}!`.blue)
);
