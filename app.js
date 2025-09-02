const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ensure views folder is set

// ✅ Correct way to serve static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
