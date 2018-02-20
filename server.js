
var express = require('express');
var app = express();

var puck;

function Puck(x, y, xspeed, yspeed, r) {
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.r = r;
}

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

io.sockets.on('connection',

  function (socket) {

    console.log("We have a new client: " + socket.id);

    socket.on('puck',
      function(data) {

        console.log("Received: 'puck' " + data.x + " " + data.y);

        // Send it to all other clients
        socket.broadcast.emit('puck', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
