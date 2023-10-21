let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39'];
let currentPosition = 0;
let movesRemaining = 9999999999;
let previousMove = null;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkButtonClick() {
  if (movesRemaining >= 0) {
    const randomNumber = getRandomInt(2, 12);
    console.log(randomNumber);

    if (previousMove !== null) {
      let previousTdElement = document.getElementById("p" + previousMove);
      let previousDivElement = previousTdElement.querySelector(".playerRed");
      if (previousDivElement) {
        previousTdElement.removeChild(previousDivElement);
      }
    }

    currentPosition += randomNumber;
    if (currentPosition > 39) {
      currentPosition -= 40;
    }

    let tdElement = document.getElementById("p" + currentPosition);

    let divElement = document.createElement("div");
    divElement.className = "playerRed";
	
	

    tdElement.appendChild(divElement);

    previousMove = currentPosition;

    movesRemaining--;

    if (movesRemaining === 0) {
      let buttonElement = document.getElementById("btn");
      buttonElement.disabled = true;
    }
  } else {
    console.log("No more moves remaining.");
  }
}

function resetGame() {
  currentPosition = 0;
  movesRemaining = 12;
  previousMove = null;

  for (let i = 2; i <= 39; i++) {
    let tdElement = document.getElementById("p" + i);
    let divElement = tdElement.querySelector(".playerRed");
    if (divElement) {
      tdElement.removeChild(divElement);
    }
  }

  let buttonElement = document.getElementById("btn");
  buttonElement.disabled = false;
}



