const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the login page initially
app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "public/login.html")); 
});

// Socket.io
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on("user-login", ({ name }) => { 
        // Set the username for this socket connection
        socket.username = name;
        // Broadcast a message indicating a new user has joined
        io.emit('message', { message: `${name} has joined the chat.`, sender: 'system', name: name });
    });

    socket.on("user-message", ({ message, name }) => { 
        io.emit('message', { message, sender: 'user', name }); 
    });
});

app.use(express.static(path.resolve("./public")));

server.listen(9000, () => console.log(`Server Started at PORT:9000`));

