var serialport = require('serialport');
var portName = 'COM16';
let globe;
var sp= new serialport(portName, {
    baudRate: 9600,
    dataBits: 8,
    // parity: 'none',
    // stopBits: 1,
    // flowControl: false,
})


sp.on('data', function abc(input) {
    if(input.toString()== ['1','2','3','4','5'])
        globe=input.toString();
});

var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!'); 

    setInterval(() => {
        socket.emit('ping', globe)
    }, 1000)
});



server.listen(3333); 