const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const MONGO_URI="mongodb+srv://jeetmane:jeetmane@cluster0.ifjd0t5.mongodb.net/?retryWrites=true&w=majority"

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
