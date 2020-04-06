const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [
    {
        id: shortid.generate(),
        name: "Wesley Ruedebusch",
        bio: "Backend Attempt One"
    },
]

// Middleware
server.use(express.json());

// Endpoints
server.get('/', (req, res) => {
    res.json({ api: "Server is Running" });
});

server.get("/api/users", (req, res) => {
    res.json(users);
});

server.post("/api/users", (req, res) => {
    const userInfo = req.body;
    users.push(userInfo);
    res.status(201).json(users);
});

// Port 
const port = 5000;
server.listen(port, () => console.log(`\n== api on port ${port}==\n`));