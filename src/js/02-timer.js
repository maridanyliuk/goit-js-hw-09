import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startBtn = document.querySelector('button[data-start]');
const dateEl = document.querySelector('#datetime-picker');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
            window.alert("Please choose a date in the future");
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
            startBtn.addEventListener('click', countdownTime);
            function countdownTime() {
                timer = setInterval(() => {
                    startBtn.disabled = true;
            
                    const dateElMs = new Date(dateEl.value.replace(/-/g, '/')).getTime();
                    const now = new Date().getTime();
                    const distance = dateElMs - now;

                    const { days, hours, minutes, seconds } = convertElMs(distance);

                    dayEl.innerHTML = days < 10 ? addLeadingZero(days) : days;
                    hourEl.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
                    minuteEl.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
                    secondEl.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

                    if (distance < 1000) {
                        clearInterval(timer);
                        startBtn.disabled = false;
                    }
                }, 1000);
            }
            function addLeadingZero(value) {
                const stringValue = String(value);
                return stringValue.padStart(2, '0');
            }

      
            function convertMs(ms) {
                const second = 1000;
                const minute = second * 60;
                const hour = minute * 60;
                const day = hour * 24;

                const days = Math.floor(ms / day);
                const hours = Math.floor((ms % day) / hour);
                const minutes = Math.floor(((ms % day) % hour) / minute);
                const seconds = Math.floor((((ms % day) % hour) % minute) / second);

                return { days, hours, minutes, seconds };
            }
        };
    },
}

flatpickr(dateEl, options);