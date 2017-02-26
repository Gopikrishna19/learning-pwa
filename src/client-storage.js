import localForage from 'localforage';

const limit = 3;
let lastItemId = null;

const instance = localForage.createInstance({
  name: 'cars'
});

export const retrieveCars = () => instance.keys().then(keys => {

  let index = keys.indexOf(lastItemId);

  if (index === -1) {

    index = keys.length;

  }

  if (index === 0) {

    return [];

  }

  const limitedKeys = keys.slice(index - limit, index).reverse();

  return Promise.all(limitedKeys.map(key => instance.getItem(key)))
    .then(values => {

      lastItemId = values[values.length - 1].id;

      return values;

    });

});

export const storeCars = (...cars) => Promise.all(
  cars.map(car => instance.setItem(`${car.key}`, car.value))
);
