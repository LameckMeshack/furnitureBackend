const express = require("express");
const color = require("colors");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Furniture world!"));
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`.blue)
);
