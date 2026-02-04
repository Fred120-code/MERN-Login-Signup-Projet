const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config()
require('./Models/db')
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("DONG");
});

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
