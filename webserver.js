
var admin = require("firebase-admin");
var serviceAccount = require("./fire-demo-bd419-firebase-adminsdk-9387j-a9b5e9bb36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fire-demo-bd419.firebaseio.com"
});
    var ref = admin.app().database().ref();
    var sensor_1 = ref.child('users1');
    var sensor_2=ref.child('users2');
    let globe,final;
    setInterval(function(){
        globe=Math.floor((Math.random()*100)+1);
        sensor_1.push({
            data:globe,
           }); 
        final=Math.floor((Math.random()*100)+1);
        sensor_2.push({
            data:final,
            });    
    },1000);

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
	console.log(globe,final);
        socket.emit('ping',{globe:globe,final:final});
    }, 1000);
});



server.listen(3333); 

