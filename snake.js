"use strict";

// Board
const blockSize = 25;
const rows = 20;
const columns = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// snake speed
let velocityX = 0;
let velocityY = 0;

// snake body
let snakeBody = [];

// food
let foodX;
let foodY;

let gameOver = false;

const changeDirection = (event) => {
  if (event.code === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (event.code === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (event.code === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (event.code === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

const update = () => {
  if (gameOver) return;
  // board styling
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // food styling
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // snake styling
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX >= columns * blockSize ||
    snakeY < 0 ||
    snakeY >= rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over!");
    window.location.reload();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over!");
      window.location.reload();
    }
  }
};

const placeFood = () => {
  //(0-1) * columns -> (0-19.9999...) -> (0-19) * 25
  foodX = Math.floor(Math.random() * columns) * blockSize;

  //(0-1) * rows -> (0-19.9999...) -> (0-19) * 25
  foodY = Math.floor(Math.random() * rows) * blockSize;
};

window.onload = () => {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); //100milliseconds
};
