const express = require("express");
const app = express();
const tasks = require("./routes/task");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = 3000;

//Connection String (will delete)
const connectString = "mongodb://root:example@192.168.1.126:27017/";

//middleware
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(connectString); //will change connection string with process.env.MONGO_URI
    app.listen(port, console.log("Server is listening on port 3000"));
  } catch (error) {
    console.log(error);
  }
};

start();

//Feature#1 Complete
