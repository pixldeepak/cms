server_io.on('connection', function (socket) {
    console.log('sub server connected to main server');
});

server_io.on('new-chat-msg-success', function (data) {
    client_io.emit('new-chat-msg-success', data);
});

server_io.on('all-chat-msg-success', function (data) {
    client_io.emit('all-chat-msg-success', data);
});

client_io.on('connect', function (socket) {
    console.log('client system connected to client server');

    socket.on('new-chat-msg', function (_data) {
        server_io.emit('new-chat-msg', _data);
    });

    socket.on('all-chat-msg', function (_data) {
        console.log('hi');
        server_io.emit('all-chat-msg', _data);
    });

    socket.on('chat-notification', function (_data) {
        server_io.emit('chat-notification', _data);
    });
});