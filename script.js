const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let painting = false;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight * 0.65;

let currentColor = "#000000";

document.getElementById("colorPicker").addEventListener("change", (e) => {
  currentColor = e.target.value;
});

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const x = e.touches ? e.touches[0].clientX - canvas.offsetLeft : e.clientX - canvas.offsetLeft;
  const y = e.touches ? e.touches[0].clientY - canvas.offsetTop : e.clientY - canvas.offsetTop;

  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// Mouse and touch listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);
