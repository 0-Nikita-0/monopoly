let p = ['p'];

let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39'];

let positionZero = 0;

function getRandomInt(min, max) {
  min = 
 
Math.ceil(min);
  max = 
  max =

  max
Math.floor(max);
  
 
return Math.floor(Math.random() * (max - min + 1)) + min;
}



function checkButtonClick() {


	const randomNumber = getRandomInt(2, 12);
	console.log(randomNumber);

	let tdElement = document.getElementById("p" + randomNumber);

	let divElement = document.createElement("div");

	divElement.className = "playerRed";

	tdElement.appendChild(divElement);
}
