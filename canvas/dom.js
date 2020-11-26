const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const bgColor = document.querySelector('.bg-color');
const brushColor = document.querySelector('.color');
const brushSize = document.querySelector('.size');
const cursor = document.getElementById('cursor');

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
    cursor.style.display = 'none';
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

function brushMove(e) {
  cursor.style.display = 'block';
  cursor.style.width = (brushSize.value) +'px';
  cursor.style.height = (brushSize.value) +'px';        
  cursor.style.left = e.pageX +5;
  cursor.style.top = e.pageY  +5;
}  

function hideBrush(e) {
  cursor.style.display = 'none';
}

canvas.addEventListener('mouseover', () => {
  canvas.addEventListener('mousemove', brushMove);
});

canvas.addEventListener('mouseup', isDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', isDraw);
canvas.addEventListener('mouseout', hideBrush);
window.addEventListener('change', updateBrush);
window.addEventListener('click', clearCanvas);
