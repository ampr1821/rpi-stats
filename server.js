const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { exec } = require("child_process");
const io = new Server(server);
const port = 8080;
let data = {'temp': 0, 'cpu': 0, 'ram': 0};

function get_data() {
	exec("bash data.sh", (error, stdout, stderr) => {
	    if (error) {
	        console.log(`error: ${error.message}`);
	        return;
	    }
	    if (stderr) {
	        console.log(`stderr: ${stderr}`);
	        return;
	    }
	    var out = stdout.split(';');
	    data.temp = out[0];
	    data.cpu = out[1];
	    data.ram = out[2];
	});
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{get_data(); io.emit('msg', data);}, 1000);
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});