var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const rectangleBtn = document.getElementById("rectangle");
const circleBtn = document.getElementById("circle");
const eraserBtn = document.getElementById("eraser");
const brushBtn = document.getElementById("brush");
const clearBtn = document.getElementById("clear");
const pencilBtn = document.getElementById("pencil");
const size = document.getElementById("size");
const strokeColor = document.getElementById("stroke-color");
const fillColor = document.getElementById("fill-color");

var currentTool = "brush";
var startX = 0;
var startY = 0;
var lastX = 0;
var lastY = 0;
var endX = 0;
var endY = 0;

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 100;
context.strokeStyle = "#000000";

function draw() {
    switch(currentTool) {
		case "rectangle":
            context.strokeRect(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
            context.fillRect(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
			break;
		case "circle":
            context.strokeCircle(startX, startY, distance(), true);
            break;
        case "eraser":
            context.clearRect(startX, startY, size.value, size.value);
            break;
        case "brush":
            drawLine(size.value);
            break;
        case "pencil":
            drawLine(1);
            break;
		default:
			break;
	}
}

function distance() {
    return Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
}

function drawLine(strokeWidth) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineWidth = strokeWidth;
    context.stroke();
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
});

pencilBtn.addEventListener("click", () => {
    currentTool = "pencil";
    startX = 0;
    startY = 0;
});

clearBtn.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

strokeColor.addEventListener("change", (e) => {
    context.strokeStyle = e.target.value;
});

fillColor.addEventListener("change", (e) => {
    context.fillStyle = e.target.value;
});

context.__proto__.strokeCircle = function(x, y, radius, fill = false) {
    this.beginPath();
    this.arc(x, y, radius, 0, Math.PI * 2, false);
    this.stroke();
    if (fill) this.fill();
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
    if ( ( "eraser" != currentTool && "brush" != currentTool && "pencil" !== currentTool)) {
        return;
    }
    startX = endX || e.layerX;
    startY = endY || e.layerY;
    endX = e.layerX;
    endY = e.layerY;
    draw();
}