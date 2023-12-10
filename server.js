const express = require("express");
const app = express();
const tasks = require("./routes/task");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = 3001;

//Connection String (will delete)
const connectString = "mongodb://192.168.1.126:27017/";

//middleware
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(connectString); //will change connection string with process.env.MONGO_URI
    app.listen(port, console.log("Server is listening on port 3000"));
  } catch (error) {
    console.log(error);
  }
};

start();
