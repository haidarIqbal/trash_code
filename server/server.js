var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var userModel = require("../model/user");
const _ = require("lodash");
var app = express();
var port = 3000;

var server = app.listen(port, () => {
  console.log("listening on port 3000");
});
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.post("/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  userModel.User.findOne({ email: body.email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (!user) {
        res.send({ msg: "UserNotFound" });
      } else if (user.password !== body.password) {
        res.send({ msg: "notFound" });
      } else {
        res.send({ msg: "found", userName: user.userName });
      }
    }
  });
});

app.post("/register", (req, res) => {
  var body = _.pick(req.body, ["email", "password", "username"]);
  console.log(body);
  userModel
    .User({
      email: body.email,
      userName: body.username,
      password: body.password
    })
    .save((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Registered");
      }
    });
});

app.post("/checkUser", (req, res) => {
  var body = _.pick(req.body, ["userName"]);
  console.log(body);
  userModel.User.findOne({ userName: body.userName }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user) {
        res.send("found");
      } else {
        res.send("notFound");
      }
    }
  });
});

app.post("/checkEmail", (req, res) => {
  var body = _.pick(req.body, ["email"]);
  console.log(body);
  userModel.User.findOne({ email: body.email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user) {
        res.send("found");
      } else {
        res.send("notFound");
      }
    }
  });
});

var IO = require("socket.io").listen(server);
IO.on("connection", socket => {
  console.log("new User connected");

  socket.on("newMsg", message => {
    console.log(message);
    IO.emit("message", {
      from: message.from,
      text: message.text,
      createdAt: new Date(),
      code: message.timeCode
    });
  });
});

app.set("socketio", IO);
