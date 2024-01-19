const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productsRoutes");

const app = express();
const port = 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!".bgGreen))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


//Endpoints
app.use("/api/products", productRoutes);




app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`.blue)
);


