const fs = require('fs');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

const timeFunc = () => {
    return new Date().toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric',});
}

const nameFunc = () => {
    return Date.now().toString().slice(-5);
}

let usersCounter = 0;

const server = http.createServer((req, res) => {
	const indexPath = path.join(__dirname, 'index.html');
	const readStream = fs.createReadStream(indexPath);
	readStream.pipe(res);
});

const io = socket(server);

io.on('connection', client => {
    usersCounter++
    client.broadcast.emit('user_count', usersCounter);
    client.emit('user_count', usersCounter);

	const user = { name: `User_${nameFunc()}`, time: timeFunc(), }
	client.broadcast.emit('user_connected', user);

    client.on('client_msg', data => {
        const payload = { name: user.name, message: data.message, }
        client.broadcast.emit('server_msg', payload);
        client.emit('server_msg', payload);
    });

    client.on('disconnect', () => {
        usersCounter--
        client.broadcast.emit('user_count', usersCounter);
        client.emit('user_count', usersCounter);

        const userDisc = {...user, time: timeFunc()}
        client.broadcast.emit('user_disconnected', userDisc);
    });
});

server.listen(5555, 'localhost');