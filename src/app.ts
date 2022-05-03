import express from "express";
import { createServer, Server } from "http";
import bodyParser from "body-parser";

import controller from "./controller";
import database from "./config/database";
import cors from "cors";
import { initializeWebsocket } from "./config/websocket";

const app = express();

database.sync({
  alter: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(controller);

const server = createServer(app);
initializeWebsocket(server);

server.listen(process.env.PORT || 5000);
