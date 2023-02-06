const mongoose = require("mongoose");
const { url } = require("wd/lib/commands");
mongoose.set("strictQuery", false);

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
