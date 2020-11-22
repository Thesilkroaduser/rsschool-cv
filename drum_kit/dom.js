const runDrumkit = () => {

  let keysArray = [65, 83, 68, 70, 71, 72, 74, 75, 76];

  const handleKeyboard = (e) => {
    playSound(e.keyCode);
  };

  const handleMouse = (e) => {
    playSound(e.target.id || e.target.parentElement.id);
  };

  function playSound(id) {
    if (!keysArray.includes(+id)) {
      return;
    }
        
    const sound = document.querySelector(`audio[data-key="${id}"]`); 
    const activeButton = document.querySelector(`.buttons__item[id="${id}"]`);
    
    activeButton.classList.add('active__item');
    sound.currentTime = 0;
    sound.play().then(() => {
      setTimeout(() =>{
        activeButton.classList.remove('active__item');
      }, 100)
    });
  };

  window.addEventListener('keydown', handleKeyboard);
  window.addEventListener('click', handleMouse);
};

runDrumkit();
