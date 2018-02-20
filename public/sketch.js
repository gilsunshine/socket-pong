// Keep track of our socket connection
var socket;
var leftscore = 0;
var rightscore = 0;

function setup() {
  createCanvas(600, 400);

  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:3000');

  var data = {
   x: puck.x,
   y: puck.y,
   xspeed: puck.xspeed,
   yspeed: puck.yspeed,
   r: puck.r
 };
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('puck',
    // When we receive data
    function(data) {
      // console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      puck = data;
    }
  );
}

function draw() {
  background(0);
  puck.checkPaddleRight(right);
  puck.checkPaddleLeft(left);

  left.show();
  right.show();
  left.update();
  right.update();

  puck.update();
  puck.edges();
  puck.show();

  fill(255);
  textSize(32);
  text(leftscore, 32, 40);
  text(rightscore, width-64, 40);

  sendpuck(puck.x, puck.y, puck.xspeed, puck.yspeed, puck.r);
}

function keyReleased() {
    left.move(0);
    right.move(0);
}

function keyPressed() {
    console.log(key);
    if (key == 'A') {
        left.move(-10);
    } else if (key == 'Z') {
        left.move(10);
    }

    if (key == 'J') {
        right.move(-10);
    } else if (key == 'M') {
        right.move(10);
    }
}

// Function for sending to the socket
function sendpuck(x, y, xspeed, yspeed, r) {
  // We are sending!
  console.log("sendpuck: " + x + " " + y);

  // Make a little object with  and y

  var data = {
    x: puck.x,
    y: puck.y,
    xspeed: puck.xspeed,
    yspeed: puck.yspeed,
    r: puck.r
 };
  // Send that object to the socket
  socket.emit('puck',data);
}
