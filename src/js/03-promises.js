import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
const delayMs = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  let delay = delayMs.valueAsNumber;;
  const step = delayStep.valueAsNumber;;
  const amount = amountEl.valueAsNumber;;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay).then(
      ({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      },
      ({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    );
    delay += step;
  }
});