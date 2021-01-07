document.addEventListener("DOMContentLoaded", () => {
  const width = 10;
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".square"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  let nextRandom = 0;

  //The Tetraminoes
  const lTetramino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetramino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetramino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetramino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetramino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetraminoes = [
    lTetramino,
    zTetramino,
    tTetramino,
    oTetramino,
    iTetramino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = getRandom();
  let current = tetraminoes[random][currentRotation];

  function getRandom() {
    return Math.floor(Math.random() * tetraminoes.length);
  }

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetramino");
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetramino");
    });
  }

  let timerId = setInterval(moveDown, 1000);

  //assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }

  window.addEventListener("keyup", control);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      //start a new tetramino falling
      random = nextRandom;
      nextRandom = getRandom();
      current = tetraminoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );
    if (!isAtLeftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );
    if (!isAtRightEdge) currentPosition += 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;

    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = tetraminoes[random][currentRotation];

    draw();
  }

  const displaySquares = document.querySelectorAll(".mini-square");
  const displayWidth = 4;
  const displayIndex = 0;

  const displayTetraminos = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetramino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetramino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetramino
    [0, 1, displayWidth, displayWidth + 1], //oTetramino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetramino
  ];

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("tetramino");
      square.style.backgroundColor = "";
    });

    displayTetraminos[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetramino");
    });
  }
});
