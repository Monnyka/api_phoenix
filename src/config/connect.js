const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const connectDB = async (url) => {
  try {
    const options = {
      dbName: process.env.DBNAME,
      user: process.env.DBUSER,
      pass: process.env.DBPASS,
      authMechanism: process.env.DBAUTHMECHANISM,
    };
    mongoose.connect(url, options);
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
