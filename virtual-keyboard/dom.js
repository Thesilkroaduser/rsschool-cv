const keyBoard = document.querySelector('.keyboard-wrapper');
const fragment = document.createDocumentFragment();
const text = document.querySelector('.textarea');
const symbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "q", "w", "e", "r",
 "t", "y", "u", "i", "o", "p", "\[", "\]", "caps", "a", "s", "d","f", "g", "h", "j", "k", "l", ";", 
 "\'", "enter", "ok", "z", "x", "c", "v", "b", "n", "m", ",", ".", "\(","\)","?", "space"];

 let isUpperCase = false;
let layout = new Array();

// Create array of HTML elements
for (let i = 0; i < symbols.length + 4; i++) {
  let item;
  switch(i) {
    case 11: 
      item = document.createElement('br');
      layout.push(item);
      break;
    case 24: 
      item = document.createElement('br');
      layout.push(item);
      break;
    case 38: 
      item = document.createElement('br');
      layout.push(item);
      break;
    case 52: 
      item = document.createElement('br');
      layout.push(item);
      break;
    default: 
      item  = document.createElement('button');
      layout.push(item);
      break;
  };
};

layout.forEach(item => fragment.appendChild(item));

// Select keys from fragment
const keysArray = fragment.querySelectorAll('button');

// Style keys
keysArray.forEach((item, index) => {
  item.textContent = symbols[index];
  switch(item.textContent) {
    case 'space': 
      item.textContent = '';
      item.className = 'key key_space';
      break;
    case 'backspace': 
      item.textContent = ''; 
      item.className = 'key key_backspace';
      break;
    case 'enter': 
      item.textContent = ''; 
      item.className = 'key key_enter';
      break;
    case 'caps': 
      item.textContent = ''; 
      item.className = 'key key_caps';
      break;
    case 'ok': 
      item.textContent = ''; 
      item.className = 'key key_ok';
      break;
    case 'enter': 
      item.textContent = ''; 
      item.className = 'key key_enter';
      break;
    default:
      item.classList.add('key');
      break;
  };
});

// On/Off Caps Lock
function toggleCase(element) {
  isUpperCase = !isUpperCase;
  element.classList.toggle('active');
  keysArray.forEach(key => key.classList.toggle('upper'));
};

function handleMouse(e) {
  if (e.target === text) {
    keyBoard.classList.remove('hidden');
  };
  if (e.target.className.includes('key_ok')) {
    keyBoard.classList.add('hidden');
  };
  if (e.target.className === 'key' || e.target.className === 'key upper') {
    text.textContent += `${isUpperCase ? e.target.textContent.toUpperCase() : e.target.textContent}`;
  };
  if (e.target.className.includes('key_backspace')) {
    text.textContent = text.textContent.substring(0, text.textContent.length - 1);
  };
  if (e.target.className.includes('key_caps')) {
    toggleCase(e.target);
  };
  if (e.target.className.includes('key_enter')) {
    text.textContent += '\n';
  };
  if (e.target.className.includes('key_space')) {
    text.textContent += ' ';
  };
};

function highlightKey(e) {
  if (e.target.tagName == 'BUTTON' && !e.target.className.includes('caps')) {
    e.target.classList.add('high');
    window.addEventListener('mouseup', () => e.target.classList.remove('high'));
  }
}

// Insert keys in Keyboard
keyBoard.appendChild(fragment);

window.addEventListener('click', handleMouse);
window.addEventListener('mousedown', highlightKey);