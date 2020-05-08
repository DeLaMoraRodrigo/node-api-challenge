const express = require("express");
const projectRouter = require("./data/helpers/projectRouter");
const actionRouter = require("./data/helpers/actionRouter");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", logger, (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`)
})

server.use("/api/projects", logger, projectRouter);
server.use("/api/actions", logger, actionRouter);

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

module.exports = server;