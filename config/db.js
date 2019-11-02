const mongoose = require("mongoose");

module.exports = connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb://localhost:27017/money-management-app",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("MongoDB Connected");
      }
    );
  } catch (err) {
    console.error(err);
  }
};
