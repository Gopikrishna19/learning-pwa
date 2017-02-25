import localForage from 'localforage';

const instance = localForage.createInstance({
  name: 'cars'
});

export const storeCars = (...cars) => Promise.all(
  cars.map(car => instance.setItem(`${car.key}`, car.value))
);
