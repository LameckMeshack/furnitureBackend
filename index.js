const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('DB connection successful!'.bgGreen)).catch((err)=>console.log(err));



app.get("/", (req, res) => res.send("Furniture world!"));
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`.blue)
);

 
// mongodb+srv://Rhino:<password>@cluster0.iqwmz9u.mongodb.net/