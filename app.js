require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");  //to parse data to token
const path = require("path");
/*const dotenv = require("dotenv");
dotenv.config();*/

const app = express();

// const connectDB = require("./db/connect.js");
const connectDB = require("./db/connect.js");
const authRoutes= require ('./routes/authRoutes.js')

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use('/api/v1/auth', authRoutes)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

