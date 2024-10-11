const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'chatApp';

// Initialize MongoDB client
const client = new MongoClient(url);

// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

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

    socket.on("user-message", async ({ message, name }) => { 
        try {
            // Insert message into MongoDB
            const db = client.db(dbName);
            const collection = db.collection('messages');
            await collection.insertOne({ message, sender: name, timestamp: new Date() });

            // Broadcast message to all clients
            io.emit('message', { message, sender: 'user', name });
        } catch (err) {
            console.error('Error inserting message into MongoDB:', err);
        }
    });
});

app.use(express.static(path.resolve("./public")));

server.listen(9000, () => console.log(`Server Started at PORT:9000`));
