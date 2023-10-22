const path = require("path");
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const PUBLIC_PATH = path.join(__dirname, "/../public");
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(PUBLIC_PATH + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a new user just connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
