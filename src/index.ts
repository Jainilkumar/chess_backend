import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import { checkWebsite } from './crog';

const wss = new WebSocketServer({ port: 10000 });
checkWebsite();
const gameManager = new GameManager(); 

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on('close', () => {
        gameManager.removeUser(ws);
    }); 
}); 