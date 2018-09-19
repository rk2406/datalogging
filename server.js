var admin=require('firebase-admin')
var serviceAccount = require("./fire-demo-bd419-firebase-adminsdk-9387j-a9b5e9bb36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fire-demo-bd419.firebaseio.com"
});
const express=require('express')
const app=express();

const http=require('http')

const socketio=require('socket.io')
var SerialPort = require("serialport")
var serialPort = new SerialPort('COM22',
{   
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1, 
  parser: new SerialPort.parsers.Readline("\n"),
  flowControl: false
});

const server=http.createServer(app)
const io=socketio(server)
var receivedData="";
let sendData="";
let obj={};
let arr=[];
var ref = admin.app().database().ref();
var sensors = ref.child('server/users');
serialPort.on("open", function () {
    console.log('comm open');
    serialPort.on('data', function(data) {
      
      receivedData += data.toString();
      
      if(receivedData.indexOf('$')>0)
      {
        if(receivedData[0]!='#')
        receivedData='#'+receivedData;
        sendData=receivedData.split('$')[0];
        // console.log(sendData);
        obj.one=sendData.split('#')[2];
        obj.two=(sendData.split('#')[3]);
        obj.three=(sendData.split('#')[4]);
        obj.four=(sendData.split('#')[5]);
        if(obj.one== undefined || obj.two== undefined||obj.three== undefined||obj.four== undefined )
        {
          obj.one=-1;
          obj.two=-1;
          obj.three=-1;
          obj.four=-1;
        }
        console.log("Send Data "+obj.one+" "+obj.two+" "+obj.three+" "+obj.four);
        receivedData="";
        sensors.push({
            sensor_1:parseFloat(obj.one),
            sensor_2:parseFloat(obj.two),
            sensor_3:parseFloat(obj.three),
            sensor_4:parseFloat(obj.four)
           });    
      }
    });
});

serialPort.on('error', function(err) {
    console.log('Error: ', err.message);
    // console.error(err);
  })
  
  io.on('connection',(socket)=>{
    console.log('New socket formed from '+socket.id+" client");
    socket.emit('connected');
    setInterval(()=>{
      socket.emit('update', obj);
    },100)
     
  })
  
  server.listen(4000,()=>{
      console.log("server started")
  })


    
    
    

	

