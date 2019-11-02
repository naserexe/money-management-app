const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = connectDB = async () => {
  try {
    mongoose.connect(
      keys.mongoURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("MongoDB Connected");
      }
    );
  } catch (err) {
    console.error(err);
  }
};
