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
let timer;
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

function startTimer() { 
    let minutes = 0;
    let seconds = 0
    const minutesDOM = document.getElementById('timer-minutes')
    const secondsDOM = document.getElementById('timer-seconds')

    timer = setInterval(() => {
        // Set the correct number to seconds and minutes
        // TODO: prevent minutes from > 59
        if (seconds < 59) {
            seconds++
        }
        else {
            seconds = 0
            minutes++
        }
        // update DOM

        if (minutes < 10) {
            minutesDOM.textContent = `0${minutes}: `
        } else {
            minutesDOM.textContent = `${minutes}: `
        }
        if (seconds < 10) {
            secondsDOM.textContent = "0" + seconds
        } else {
            secondsDOM.textContent = seconds
        }

        console.log(`${minutes}: ${seconds}`)
    }, 1000)
}

function stopTimer() {
    clearInterval(timer)
}

function gameStart() {
    const gameIntro = document.querySelector("#game-intro");
    const gameBoard = document.querySelector("#game-board");

    gameIntro.classList.add("hidden");
    gameBoard.classList.remove("hidden");

    createBoard();
    startTimer()
}

function gameRestart() {
    resultDisplay.textContent = "0";
    createBoard()
    stopTimer()
}
