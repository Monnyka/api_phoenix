const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const connectDB = (url) => {
  const option = {
    dbName: process.env.DBNAME,
    user: process.env.DBUSER,
    pass: process.env.DBPASS,
    authMechanism: process.env.DBAUTHMECHANISM,
  };
  return mongoose
    .connect(url, option)
    .then(() => console.log("Connected to database successfully"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
