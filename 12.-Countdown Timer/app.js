const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
//console.log(items);

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate(); 

let futureDate = new Date(tempYear, tempMonth, tempDay+10, 0,30,0);
//console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
//console.log(months[month]);

const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];
console.log(weekday);

giveaway.textContent = `El sorteo termina el: ${weekday}, ${date} ${month} del ${year} ${hours}:${minutes}am `;


//tiempo en el futuro en ms
const futureTime = futureDate.getTime();
  //console.log(futureTime);

  function getRemainingTime(){
  const today = new Date().getTime();
  //console.log(today);
  const t = futureTime - today;
  //console.log(t);
  //1s = 1000ms
  //1m = 60s
  //1hr = 60min
  //1d = 24hr

  //Valor en ms
  const oneDay = 24 * 60 * 60 * 1000;
  //console.log(oneDay);
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  let days = t / oneDay;
  //console.log(days);
  days = Math.floor(days);
  let hours = Math.floor( (t % oneDay) / oneHour );
  let minutes = Math.floor( (t % oneHour) / oneMinute );
  let seconds = Math.floor( (t % oneMinute) / 1000 );

  //Dar los valores al arreglo
  const values = [days,hours,minutes,seconds];

  function format(item){
    if(item < 10){
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function(item, index){
    item.innerHTML = format(values[index]);
  });

  if(t < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">lo siento el sorteo a terminado</h4>`
  }
}
//Contador
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();