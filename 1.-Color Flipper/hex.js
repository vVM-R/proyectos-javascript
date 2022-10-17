const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A","B", "C", "D", "E", "F"];

const btn = document.getElementById('btn');
const color = document.querySelector(".color");

btn.addEventListener('click', function(){
	//get random number between 0 - 16
	const randomNumber = getRandomNumber();
	let str = "#";
	for(let i = 0; i < 6; i++){
		str += colors[getRandomNumber()];
	}
	console.log(str);
	document.body.style.backgroundColor = str;
	color.textContent = str;
});

function getRandomNumber(){
	return Math.floor(Math.random() * colors.length);
}