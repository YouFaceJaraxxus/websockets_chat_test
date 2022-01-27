const express = require('express');
const http = require('http');
const WebSocket = require('ws');
var cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

var messageId = 1;

wss.on('connection', (ws, req) => {
    const userId = req.headers['sec-websocket-key'];
    ws.on('message', (data) => {
        console.log('message', data);
        const dataParsed = JSON.parse(data);
        if(dataParsed.type==='chatMessage') wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                
                const response = {
                    id: messageId++,
                    user: client == ws ? 'You' : userId,
                    text: dataParsed.text,
                }
                client.send(JSON.stringify(response));
            }
        });
    });
});

//start our server
server.listen(process.env.PORT || 8000, () => {
    console.log(`Server started on port ${process.env.PORT || 8000}`);
});