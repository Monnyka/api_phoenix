const mongoose = require("mongoose");
const { url } = require("wd/lib/commands");
mongoose.set("strictQuery", false);

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Connected To DB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
