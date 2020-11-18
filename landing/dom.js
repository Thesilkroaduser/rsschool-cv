// DOM elements
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
let time = document.createElement('time');
time.className = 'time';

// Show time
function showTime() {
  let today = new Date();
  let hours = today.getHours();
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  // Set AM & PM
  const amPm = hours >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hours = hours % 12 || 12;

  // Output Time
  time.textContent = `${hours}:${addZeros(mins)}:${addZeros(secs)} ${amPm}`;
  setTimeout(showTime, 1000);
};

// Add Zeros
function addZeros(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
};

// Set Background
function setBackground() {
  let today = new Date();
  let hours = today.getHours();
  if (hours >= 5 && hours < 12) {
    // Morning
    document.body.style.backgroundImage = "url('./assets/img/morning.jpg')";
    greeting.textContent = 'Good Morning';
  }
  else if (hours > 12 && hours < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('./assets/img/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon';
  }
  else {
    // Evening
    document.body.style.backgroundImage = "url('./assets/img/evening.jpg')";
    greeting.textContent = 'Good Evening';
    document.body.style.color = 'white';
  };
  setTimeout(setBackground, 1000);
};

// Set Name and Focus
function setUserSettings(e) {
  let id = e.target.id;
  if (e.type === 'keypress' && (e.which == 13 || e.keyCode == 13)) {
    localStorage.setItem(id, e.target.innerText);  
    name.blur();
  }
  else {
    localStorage.setItem(id, e.target.innerText);    
  };
};
 

function getUserSettings() {
  // Het Name
  if (localStorage.getItem('name') === null || !/\S/.test(localStorage.getItem('name'))) {
    name.textContent = '[Enter Name]';
  }
  else {
    name.textContent = localStorage.getItem('name');  
  };
  //Get Focus
  if (localStorage.getItem('focus') === null || !/\S/.test(localStorage.getItem('focus'))) {
    focus.textContent = '[Enter Your Focus]';   
  }
  else { 
    focus.textContent = localStorage.getItem('focus');
  };    
};

document.body.prepend(time);
name.addEventListener('keypress', setUserSettings);
name.addEventListener('blur', setUserSettings);
focus.addEventListener('keypress', setUserSettings);
focus.addEventListener('blur', setUserSettings);

// Run
showTime();
setBackground();
getUserSettings(); 
