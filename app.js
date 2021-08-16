const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Create global app object
let app = express();

var allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:4300",
  "http://localhost:3000",
  "http://165.22.228.6"
];



require("./server/app-config")(app);



// const http = require('http').Server(app);

// finally, let's start our server...
let server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});

global.vinqloSocket = require("socket.io")(server, {
  cors: {
    credentials: true,
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }
});

vinqloSocket.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});



function serverShutDown (reason) {
  console.info(reason+' signal received.');
  console.log('Closing http server.');

  server.close(() => {
    console.log('Http server closed.');
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log('MongoDb connection closed.');
      process.kill(process.pid, reason);
      process.exit();

    });
  });
}

process.on('SIGTERM', () => {
  serverShutDown('SIGTERM')
});
process.once('SIGUSR2', function () {
  serverShutDown('SIGUSR2')
});
process.on('SIGINT', function () {
  serverShutDown('SIGINT')
});