import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import { v4 as uuid } from 'uuid';

let notes = [];

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('new connection: ', socket.id);

    socket.emit('server:loadnotes', notes);

    socket.on('client:newnote', (data) => {
        const note = {
            id: uuid(),
            ...data
        };
        notes.push(note);
        io.emit('server:newnote', note);
    });

    socket.on('client:deletenote', (noteId) => {
        notes = notes.filter((note) => note.id !== noteId);
        io.emit('server:loadnotes', notes);
    });

    socket.on('client:updatenote', (noteClient) => {
        notes = notes.map((note) => {
            if (note.id === noteClient.id) {
                return noteClient;
            } else {
                return note;
            }
        });
        io.emit('server:loadnotes', notes);
    });

});

server.listen(3000, () => {
    console.log('Server on port 3000');
});