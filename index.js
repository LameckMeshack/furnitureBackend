const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productsRoutes");
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
app.use("/api/products", productRoutes);

app.listen(process.env.PORT || port, '0.0.0.0', () =>
  console.log(
    `Example app listening on port ${process.env.PORT}!`
      .blue
  )
);
