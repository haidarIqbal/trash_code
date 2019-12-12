var mongoose = require("mongoose");
var conn = require("../database/connection");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  userName: String,
  password: String
});
var User = mongoose.model("users", UserSchema);

module.exports = {
  User
};
