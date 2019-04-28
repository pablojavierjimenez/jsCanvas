/* Explanations at junerockwell.com */
var canvas, context;
var isDraggable = false;
var star_img = new Image();

var currentX = 0;
var currentY = 0;

function dragInit ( imgId ) {
  var originalImage = document.getElementById( imgId );
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  currentX = canvas.width/2;
  currentY = canvas.height/2;

  star_img.onload = function() {
    _Go();
  };
  star_img.src = originalImage.src;
};

function _Go() {
  _MouseEvents();

  setInterval(function() {
    _ResetCanvas();
    _DrawImage();
  }, 1000/30);
}
function _ResetCanvas() {
  context.fillStyle = '#fff';
  context.fillRect(0,0, canvas.width, canvas.height);
}
function _MouseEvents() {
  canvas.onmousedown = function(e) {

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;


    if (mouseX >= (currentX - star_img.width/2) &&
        mouseX <= (currentX + star_img.width/2) &&
        mouseY >= (currentY - star_img.height/2) &&
        mouseY <= (currentY + star_img.height/2)) {
      isDraggable = true;
      //currentX = mouseX;
      //currentY = mouseY;
    }
  };
  canvas.onmousemove = function(e) {

    if (isDraggable) {
      currentX = e.pageX - this.offsetLeft;
      currentY = e.pageY - this.offsetTop;
    }
  };
  canvas.onmouseup = function(e) {
    isDraggable = false;
  };
  canvas.onmouseout = function(e) {
    isDraggable = false;
  };
}
function _DrawImage() {
  context.drawImage(star_img, currentX-(star_img.width/2), currentY-(star_img.height/2));
}

dragInit('originalImage');


