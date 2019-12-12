const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://haidarroot123:ChatPass#extension@docdb-2019-12-12-20-33-13.cluster-cltjtvqusmpi.us-east-2.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0",
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
