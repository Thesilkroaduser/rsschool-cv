const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const bgColor = document.querySelector('.bg-color');
const brushColor = document.querySelector('.color');
const brushSize = document.querySelector('.size');

let lastX = 0;
let lastY = 0;
let drawingFlag = false;
let stopDrawing = new Event('mouseup');

canvas.width = 700;
canvas.height = 550;
canvas.style.backgroundColor = bgColor.value;
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = brushSize.value;

//Drawing function
function draw(e) {
  if (!drawingFlag) {
    return;
  };
  if (e.offsetX < 0 || e.offsetX > 700 || e.offsetY < 0 || e.offsetY > 550) {
    canvas.dispatchEvent(stopDrawing);
    drawingFlag = false;
  };
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
};

//Set brush style
function updateBrush(e) {
  if (e.target.className == 'color') {
    context.strokeStyle = brushColor.value;
  }
  if (e.target.className == 'size') {
    context.lineWidth = brushSize.value;
  }
  if (e.target.className == 'bg-color') {
    context.lineWidth = brushSize.value;
    canvas.style.backgroundColor = bgColor.value;
  }
}

//Clear canvas
function clearCanvas(e) {
  if (e.target.id == 'clear') {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function isDraw(e) {
  if (e.type === 'mouseup') {
    drawingFlag = false;
  }
  if (e.type === 'mousedown') {
    drawingFlag = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

canvas.addEventListener('mouseup', isDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', isDraw);
window.addEventListener('change', updateBrush);
window.addEventListener('click', clearCanvas);
