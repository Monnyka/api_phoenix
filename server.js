const express = require("express");
const app = express();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();

const authentication = require("./middleware/authentication");

//Router
const authRouter = require("./routes/auth");
const tasks = require("./routes/task");

const port = process.env.PORT || 3001;

//Connection String
const connectString = process.env.MONGOURL;

//Middleware
app.use(express.json());

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authentication, tasks);

//error handler
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
