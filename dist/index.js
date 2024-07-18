"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const crog_1 = require("./crog");
const wss = new ws_1.WebSocketServer({ port: 10000 });
(0, crog_1.checkWebsite)();
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on('close', () => {
        gameManager.removeUser(ws);
    });
});
