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
  cardsArray.forEach((card, i) => {
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
  const gameIntro = document.querySelector("#game-intro");
  const gameBoard = document.querySelector("#game-board");

  gameIntro.classList.add("hidden");
  gameBoard.classList.remove("hidden");

  createBoard();
  timer.startTimer();
  // Set DOM element ot update with timer
  const DOMSeconds = document.querySelector("#timer-seconds")
  const DOMMinutes = document.querySelector("#timer-minutes");

  DOMSeconds.innerHTML = timer.seconds;
}

function gameRestart() {
  resultDisplay.textContent = "0";
  createBoard()
  timer.pauseTimer()
}
