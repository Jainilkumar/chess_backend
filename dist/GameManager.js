"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUsers = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === messages_1.CANCEL_GAME) {
                if (this.pendingUsers === socket) {
                    this.pendingUsers = null;
                }
            }
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUsers) {
                    const game = new Game_1.Game(this.pendingUsers, socket);
                    this.games.push(game);
                    this.pendingUsers = null;
                }
                else {
                    this.pendingUsers = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
            if (message.type === "resign") {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    const winner = game.player1 === socket ? 'black' : 'white';
                    game.player1.send(JSON.stringify({ type: 'game_over', payload: { winner } }));
                    game.player2.send(JSON.stringify({ type: 'game_over', payload: { winner } }));
                }
            }
        });
    }
}
exports.GameManager = GameManager;
