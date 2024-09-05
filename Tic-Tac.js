let popUp = document.querySelector(".popup");
let btns = document.querySelectorAll(".btns");
let message = document.querySelector("#message");
let restart = document.querySelector("#restart");
let newGame = document.querySelector("#new-game");

// Winning array (using destructuring for cleaner access)
let winningArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Remove popup on page load
window.onload = () => popUp.classList.add("hide");

// Player X will play
let xTurn = true;
let count = 0;

// Add event listener to buttons
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      btn.style.color = "white";
      btn.style.backgroundColor = "blue";
      btn.innerText = "X";
      btn.disabled = true;
    } else {
      btn.style.color = "white";
      btn.style.backgroundColor = "red";
      btn.innerText = "O";
      btn.disabled = true;
      xTurn = true;
    }
    count++;
    if (count === 9) {
      draw();
    } else {
      checkWinner();
    }
  });
});

// Winning logic
let checkWinner = () => {
  for (let i = 0; i < winningArray.length; i++) {
    let [n1, n2, n3] = [
      btns[winningArray[i][0]].innerText,
      btns[winningArray[i][1]].innerText,
      btns[winningArray[i][2]].innerText,
    ];
    if (n1 !== "" && n2 !== "" && n3 !== "") {
      if (n1 === n2 && n2 === n3) {
        winFunction(n1);
        break; // Exit loop after a winner is found
      }
    }
  }
};

// Winning function
let winFunction = (n) => {
  disableButton();
  if (n === "X") {
    message.innerHTML = "&#127774; <span>X wins!</span>"; // Added exclamation mark for emphasis
  } else {
    message.innerHTML = "&#127774; <span>O wins!</span>"; // Added exclamation mark for emphasis
  }
};

// Disable buttons and show popup
let disableButton = () => {
  popUp.classList.remove("hide");
  btns.forEach((btn) => {
    btn.disabled = true;
  });
};

// Reset game
let enableButton = () => {
  popUp.classList.add("hide");
  btns.forEach((btn) => {
    btn.innerText = "";
    btn.style.backgroundColor = "";
    btn.disabled = false;
  });
  xTurn = true; // Reset turn indicator
  count = 0; // Reset move count
};

newGame.addEventListener("click", enableButton);

restart.addEventListener("click", enableButton);

// Draw function (optional, you can add functionality here)
let draw = () => {
  message.innerText = "It's a draw!";
  disableButton();
};
