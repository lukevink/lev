var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var staticRoot = path.join(__dirname+'/app/');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var arduino = new SerialPort("/dev/tty.usbmodem1421", {baudrate: 9600});

var isOpen = false;

arduino.on("open", function () {
  isOpen=true;
});

//Expose static content
app.use(express.static('app'));

//Routes
app.get('/mf', function(req, res){
    res.sendFile(staticRoot+"index.html");
});

//WS Server
io.on('connection', function (socket) {

  socket.on('TurnMeOn', function (data) {
    console.log(data)
    if(isOpen)
      arduino.write("H");
  });

  socket.on('ballMoved', function (data) {
    console.log(data)
    if(isOpen)
    if(data>50){
      arduino.write("L");
    } else {
      arduino.write("H");
    }

  });


});

server.listen(3000,function(){
    var port = server.address().port;
    var host = server.address().address;
    (host == '::') ? host = 'localhost' : host = host;
    console.log('MFS Listening at http://%s:%s',host, port);
});
