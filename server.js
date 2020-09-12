// import
const express = require("express");
const projectsRouter = require("./routers/projects-router.js");
const actionsRouter = require("./routers/actions-router.js");

// initialize
const server = express();

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;