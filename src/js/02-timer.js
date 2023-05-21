import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let selectedDate;
let timer;

const now = new Date();
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= now) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

function handleTime() {
  const now = new Date();
  const timeDifference = selectedDate - now;
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  let leftTime = `${days}:${hours}:${minutes}:${seconds}`;

  if (leftTime === '00:00:00:00') {
    clearInterval(timer);
  }

  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  clearInterval(timer);
  timer = setInterval(handleTime, 1000);

  refs.input.disabled = true;
  refs.startBtn.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
