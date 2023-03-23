function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');
  let intervalId = null;

  startBtn.addEventListener('click', () => {
    if (intervalId !== null) {
      return;
    }
    
    intervalId = setInterval(() => {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, 1000);
    startBtn.disabled = true;
  });

  stopBtn.addEventListener('click', () => {
      clearInterval(intervalId);
      
    intervalId = null;
    startBtn.disabled = false;
  });
