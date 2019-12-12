const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/chatApp",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, success) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(success);
    }
  }
);

module.exports = { mongoose };
