// timer.js
const START_TIME = 15 * 60; // 15 minutes in seconds
let time1 = START_TIME;
let time2 = START_TIME;
let activePlayer = null;
let interval = null;

function updateDisplay() {
  document.getElementById("time1").innerText = formatTime(time1);
  document.getElementById("time2").innerText = formatTime(time2);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function handlePlayerClick(player) {
   if (activePlayer === null) {
     // First move: player finishes his move, so other player's timer starts
     activePlayer = player === 1 ? 2 : 1;
     startTimer();
   } else if (activePlayer === player) {
     // Active player clicked — finish move, switch to opponent
     switchTurn();
   }
   // Ignore if inactive player taps — they can't do anything
 }


function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (activePlayer === 1) {
      if (--time1 < 0) {
        time1 = 0;
        clearInterval(interval);
      }
    } else {
      if (--time2 < 0) {
        time2 = 0;
        clearInterval(interval);
      }
    }
    updateDisplay();
  }, 1000);
  updateStyles();
}

function switchTurn() {
  activePlayer = activePlayer === 1 ? 2 : 1;
  startTimer();
}

function updateStyles() {
   const p1 = document.getElementById("player1");
   const p2 = document.getElementById("player2");
 
   p1.className = 'player ' + (activePlayer === 1 ? (time1 <= 60 ? 'critical' : 'active') : 'inactive');
   p2.className = 'player ' + (activePlayer === 2 ? (time2 <= 60 ? 'critical' : 'active') : 'inactive');
 }
 

updateDisplay();
document.getElementById("player1").classList.add("inactive");
document.getElementById("player2").classList.add("inactive");

function resetTimer() {
   clearInterval(interval);
   time1 = START_TIME;
   time2 = START_TIME;
   activePlayer = null;
   updateDisplay();
   document.getElementById("player1").className = 'player inactive';
   document.getElementById("player2").className = 'player inactive';
 }
 