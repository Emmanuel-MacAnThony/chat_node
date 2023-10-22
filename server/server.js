const path = require("path");
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { generateMessage, generateLocationMessage } = require("./utils/message");

const PUBLIC_PATH = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = new Server(server);

app.use(express.static(PUBLIC_PATH));

io.on("connection", (socket) => {
  console.log("a new user just connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app !")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    socket.broadcast.emit(
      "newMessage",
      generateMessage(message.from, message.text)
    );
    callback("Got it, the server");
  });

  socket.on("createLocationMessage", (message, callback) => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", message.lat, message.lng)
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
