var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const rectangleBtn = document.getElementById("rectangle");
const circleBtn = document.getElementById("circle");
const eraserBtn = document.getElementById("eraser");
const brushBtn = document.getElementById("brush");

var size = document.getElementById("size");
var currentTool;
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 100;

function draw() {
    switch(currentTool) {
		case "rectangle":
			context.strokeRect(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
			break;
		case "circle":
			context.strokeCircle(startX, startY, distance());
            break;
        case "eraser":
            context.clearRect(startX, startY, size.value, size.value);
            break;
        case "brush":
            context.fillRect(startX, startY, size.value, size.value);
            break;
		default:
			break;
	}
}

function distance() {
    return Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
}

rectangleBtn.addEventListener("click", () => {
    currentTool = "rectangle";
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
});

circleBtn.addEventListener("click", () => {
	currentTool = "circle";
});

eraserBtn.addEventListener("click", () => {
    currentTool = "eraser";
    startX = 0;
    startY = 0;
});

brushBtn.addEventListener("click", () => {
    currentTool = "brush";
    startX = 0;
    startY = 0;
})

context.__proto__.strokeCircle = function(x, y, radius) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI * 2, false);
    this.stroke();
}

canvas.addEventListener("mousedown", (e) => {
    startX = e.layerX;
    startY = e.layerY;
    canvas.addEventListener("mousemove", drag);
});

canvas.addEventListener("mouseup", (e) => {
    endX = e.layerX;
    endY = e.layerY;
    draw();
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
    canvas.removeEventListener("mousemove", drag);
});

function drag(e) {
    if ( ( startX == 0 && startY == 0 ) || ( "eraser" != currentTool && "brush" != currentTool )) {
        return;
    }
    startX = e.layerX;
    startY = e.layerY;
    draw();
}