const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI);
  console.log("DB connection: ", conn.connection.host);
};

module.exports = connectDB;
