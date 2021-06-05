const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors({ origin: "*" }));
const server = http.createServer(app);
module.exports = { app, server };
