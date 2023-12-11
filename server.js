const express = require("express");
const app = express();
const tasks = require("./routes/task");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = process.env.PORT || 3001;

//Connection String
const connectString = process.env.MONGOURL;

//Middleware
app.use(express.json());

//Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(connectString);
    app.listen(port, console.log("Server is listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
