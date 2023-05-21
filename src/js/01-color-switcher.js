const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', startFn);

refs.stopBtn.addEventListener('click', stopFn);

let timerId = null;

function startFn() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  if (timerId) {
    refs.startBtn.disabled = true;
  }

  refs.stopBtn.disabled = false;
}

function stopFn() {
  clearInterval(timerId);

  if (timerId) {
    refs.startBtn.disabled = false;
  }

  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
