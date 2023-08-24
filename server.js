const express = require("express");
const app = express();
const tasks = require("./routes/task");
const connectDB = require("./db/connect");
require("dotenv").config();

const port = 3000;

//Connection String (will delete)
const connectString =
  "mongodb+srv://nyka:1234@projectone.foglf.mongodb.net/?retryWrites=true&w=majority";

//middleware
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

const start = async () => {
  try {
    await connectDB(connectString); //will change connection string with process.env.MONGO_URI
    app.listen(port, console.log("Server is listening on port 3000"));
  } catch (error) {
    console.log(error);
  }
};

start();
