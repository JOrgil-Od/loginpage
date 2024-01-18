const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const rfs = require("rotating-file-stream");
const morgan = require("morgan");

//minii uusgesen require
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//env
dotenv.config({ path: "./config/dev.env" });

//router oruulj ireh
const usersRoutes = require("./routes/users");

//server app uusgeh
const app = express();

//connect DB
connectDB();

//log bichih
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "logs"),
});
//cors option
const whiteList = ["http://localhost:3000"];
let corsOption = {
  origin: (origin, callback) => {
    if (origin === undefined || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS ERROR!!!"));
    }
  },
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

//use hiih
app.use(express.json());
app.use(cors(corsOption));
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/users", usersRoutes);
app.use(errorHandler);

app.listen(
  process.env.PORT,
  console.log(`Express server started, port: ${process.env.PORT}`)
);
