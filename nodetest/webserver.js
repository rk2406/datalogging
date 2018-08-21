var globe,final;

setInterval(function(){ globe=Math.floor((Math.random()*100)+1) ;
final=Math.floor((Math.random()*100)+1); }, 1000);


var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./public/index_new.html', 'utf-8', function(error, content) {
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
	console.log(globe,final)
        socket.emit('ping',{globe:globe,final:final})
    }, 1000)
});



server.listen(3333); 

