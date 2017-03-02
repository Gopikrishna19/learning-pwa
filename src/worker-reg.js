/* eslint-disable no-console */
/* eslint-disable complexity */
const log = msg => console.log(`%c${msg}`, '{color: #f80}');

export const registerWorker = () => {

  if ('serviceWorker' in navigator) {

    navigator.serviceWorker
      .register('worker.js')
      .then(reg => {

        let serviceWorker;

        if (reg.installing) {

          log('Installing');
          serviceWorker = reg.installing;

        } else if (reg.waiting) {

          log('Waiting');
          serviceWorker = reg.waiting;

        } else if (reg.active) {

          log('Activated');
          serviceWorker = reg.active;

        }

        if (serviceWorker) {

          serviceWorker.addEventListener('statechange', () => log('State changed'));

        }

        reg.addEventListener('updatefound', () => {

          reg.installing.addEventListener('statechange', () => log('Installing new worker'));

          log('Found new worker');

        });

      });

    navigator.serviceWorker.addEventListener('controllerchange', () => log('Changing controller'));

  }

};
