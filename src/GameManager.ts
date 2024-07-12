import WebSocket from "ws";
import { CANCEL_GAME, INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
    private games:  Game[];
    private pendingUsers: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUsers = null;
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);   
    }
    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if(message.type === CANCEL_GAME) {
                if(this.pendingUsers === socket) {
                    this.pendingUsers = null;
                }
            }
            if (message.type === INIT_GAME ) {
                if(this.pendingUsers){
                    const game = new Game(this.pendingUsers, socket);
                    this.games.push(game);
                    this.pendingUsers = null;
                }
                else{
                    this.pendingUsers = socket; 
                }
            }
            if(message.type === MOVE){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    game.makeMove(socket, message.payload.move);
                }
            }
            if(message.type === "resign"){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    const winner = game.player1 === socket ? 'black' : 'white';
                    game.player1.send(JSON.stringify({type: 'game_over', payload: {winner}}));
                    game.player2.send(JSON.stringify({type: 'game_over', payload: {winner}}));
                }
            }
        }

    );}
}