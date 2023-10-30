let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39'];
let BuyPols = ['p1', 'p3', 'p5', 'p6', 'p8', 'p9', 'p39', 'p11', 'p12', 'p37', 'p13', 'p14', 'p35','p15', 'p34', 'p16', 'p32', 'p18', 'p31', 'p19', 'p29', 'p28', 'p27', 'p26', 'p25', 'p24', 'p23', 'p21'];
let currentPosition = 0;
let movesRemaining = 9999999999; 
let previousMove = null;


// Находим элемент <td> с id "p0"
let tdElementPlayerRed = document.getElementById("p0");

// Находим элемент <div> с классом "playerRed" внутри <td>
let divElementPlayerRed = tdElementPlayerRed.querySelector(".playerRed");



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



const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const buyButton = document.getElementById("buyButton");
const cancelButton = document.getElementById("cancelButton");
const modal = document.getElementById("myModal");

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

openModalBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

buyButton.addEventListener("click", function () {
  // Найти все элементы с классом "playerRed"
  var playerRedElements = document.querySelectorAll(".playerRed");

  // Перебрать найденные элементы и изменить класс <td> родительского элемента
  playerRedElements.forEach(function (element) {
    var tdParent = element.closest("td"); // Найти ближайший родительский <td>
    if (tdParent) {
      
      tdParent.classList.add("buypol");
    }
  });

  // Закрыть модальное окно (если это ваша функция closeModal)
  closeModal();
});

cancelButton.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});




// Функция, которая будет вызываться при каждом изменении DOM
const callback = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Перебираем добавленные элементы
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode instanceof HTMLElement && addedNode.classList.contains('playerRed')) {
          const td = addedNode.closest('td');
          if (td) {
            const posIdRed = td.id;
            if (BuyPols.includes(posIdRed) && !td.classList.contains('buypol')) {
              openModal(); // Открываем модальное окно, если не имеет класс 'buypol'
            }
          }
        }
      });

      // Перебираем удаленные элементы, если это нужно
      mutation.removedNodes.forEach(removedNode => {
        removedNode instanceof HTMLElement && removedNode.classList.contains('playerRed')
      });
    }
  }
};

// Наблюдатель за изменениями DOM
const observer = new MutationObserver(callback);

// Начинаем наблюдение за изменениями в body
observer.observe(document.body, { childList: true, subtree: true });



