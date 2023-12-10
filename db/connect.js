const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = (url) => {
  const option = {
    dbName: "phoenix",
    user: "admin",
    pass: "Nyka*277#",
    authMechanism: "DEFAULT",
  };
  return mongoose
    .connect(url, option)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
