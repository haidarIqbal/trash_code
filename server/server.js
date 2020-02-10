var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
//var userModel = require("../model/user");
const _ = require("lodash");
var app = express();
var port = process.env.PORT || 3000;

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
app.get("/", (req, res) => {
  res.send("yo connected");
});
// app.post("/login", (req, res) => {
//   var body = _.pick(req.body, ["email", "password"]);
//   userModel.User.findOne({ email: body.email }, (err, user) => {
//     if (err) {
//       res.send(err);
//     } else {
//       if (!user) {
//         res.send({ msg: "UserNotFound" });
//       } else if (user.password !== body.password) {
//         res.send({ msg: "notFound" });
//       } else {
//         res.send({ msg: "found", userName: user.userName });
//       }
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   var body = _.pick(req.body, ["email", "password", "username"]);
//   userModel
//     .User({
//       email: body.email,
//       userName: body.username,
//       password: body.password
//     })
//     .save((err, user) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send("Registered");
//       }
//     });
// });

// app.post("/checkUser", (req, res) => {
//   var body = _.pick(req.body, ["userName"]);
//   userModel.User.findOne({ userName: body.userName }, (err, user) => {
//     if (err) {
//       res.send(err);
//     } else {
//       if (user) {
//         res.send("found");
//       } else {
//         res.send("notFound");
//       }
//     }
//   });
// });

// app.post("/checkEmail", (req, res) => {
//   var body = _.pick(req.body, ["email"]);
//   userModel.User.findOne({ email: body.email }, (err, user) => {
//     if (err) {
//       res.send(err);
//     } else {
//       if (user) {
//         res.send("found");
//       } else {
//         res.send("notFound");
//       }
//     }
//   });
// });

var IO = require("socket.io").listen(server);
IO.on("connection", socket => {
  console.log("new User connected");

  socket.on("newMsg", message => {
    IO.emit("message", {
      from: message.from,
      text: message.text,
      video: message.videoTag,
      createdAt: new Date().toLocaleTimeString()
      //code: message.timeCode
    });
  });

  socket.on("newPublicMsg", message => {
    IO.emit("publicMessage", {
      from: message.from,
      text: message.text,
      video: message.videoTag,
      createdAt: new Date().toLocaleTimeString()
    });
  });
});

app.set("socketio", IO);
