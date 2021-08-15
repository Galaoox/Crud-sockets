const socket = io('http://localhost:3000');

function loadNotes(callback) {
    socket.on('server:loadnotes', (notes) => {
        callback(notes);
    })
}

function saveNote(title, description) {
    socket.emit('client:newnote', {
        title,
        description
    });
}

function listenServerNewNote(callback) {
    socket.on('server:newnote', data => {
        callback(data);
    });
}

function removeNote(id) {
    socket.emit('client:deletenote', id);
}

function updateNote(note) {
    socket.emit('client:updatenote', note);
}