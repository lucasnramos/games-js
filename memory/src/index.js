const blankTile = { img: "images/blank.png", name: "blank" };
const whiteTile = { img: "images/white.png", name: "white" };
const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
const messageDOM = document.querySelector("#message")
const cardsWon = [];
const cardsArray = [
  { name: "fries", img: "images/fries.png" },
  { name: "cheeseburger", img: "images/cheeseburger.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "pizza", img: "images/pizza.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "hotdog", img: "images/hotdog.png" },
  { name: "fries", img: "images/fries.png" },
  { name: "cheeseburger", img: "images/cheeseburger.png" },
  { name: "ice-cream", img: "images/ice-cream.png" },
  { name: "pizza", img: "images/pizza.png" },
  { name: "milkshake", img: "images/milkshake.png" },
  { name: "hotdog", img: "images/hotdog.png" },
];
cardsArray.sort(() => 0.5 - Math.random());
const timer = new Timer();
let cardsChosen = [];
let cardsChosenId = [];

//create your board
function createBoard() {
  grid.innerHTML = ""
  cardsArray.forEach((_, i) => {
    const cardEl = document.createElement("img");
    cardEl.setAttribute("src", blankTile.img);
    cardEl.setAttribute("data-id", i);
    cardEl.addEventListener("click", flipCard);
    grid.appendChild(cardEl);
  });
}

//check for matches
function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  if (cardsChosen[0] === cardsChosen[1]) {
    cards[optionOneId].setAttribute("src", whiteTile.img);
    cards[optionTwoId].setAttribute("src", whiteTile.img);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", blankTile.img);
    cards[optionTwoId].setAttribute("src", blankTile.img);
  }
  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length;
  if (cardsWon.length === cardsArray.length / 2) {
    messageDOM.textContent = "Congratulations! You found them all!";
    stopTimer()
  }
}

//flip your card
function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardsArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardsArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}


function gameStart() {
  // DOM elements
  const gameIntro = document.querySelector("#game-intro");
  const gameBoard = document.querySelector("#game-board");

  // Changes view from intro to gameplay
  gameIntro.classList.add("hidden");
  gameBoard.classList.remove("hidden");

  createBoard();
  timer.startTimer(updateDOMTimer);
}

function gameUnpause() {
  timer.startTimer(updateDOMTimer)
}

function gamePause() {
  timer.pauseTimer()
}

function gameRestart() {
  resultDisplay.textContent = "0";
  createBoard()
  timer.resetTimer(updateDOMTimer)
}

function updateDOMTimer() {
  const DOMTimer = document.querySelector("#timer");
  DOMTimer.innerText = `${
      timer.minutes < 10 ? '0'+timer.minutes : timer.minutes
    }:${
      timer.seconds < 10 ? '0'+timer.seconds : timer.seconds}`
}
