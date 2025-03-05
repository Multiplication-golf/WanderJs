const canvas = document.createElement("canvas"); 
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

import wanderer from "./wanderer.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dot = { x: canvas.width / 2, y: canvas.height / 2, radius: 5 };
var wanderdot = new wanderer(
  canvas.width / 2,
  canvas.height / 2,
  100,
  canvas.width / 2,
  canvas.height / 2,
  1
);

function drawDot() {
  wanderdot.think();
  var x, y;
  var { x, y } = wanderdot.returnXY();
  dot.x = x;
  dot.y = y;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function loop() {
  drawDot();
  requestAnimationFrame(loop);
}
