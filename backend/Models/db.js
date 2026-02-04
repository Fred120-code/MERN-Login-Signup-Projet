const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CON;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Mongo Conected");
  })
  .catch((err) => console.log("Mongo Connected Error", err));
