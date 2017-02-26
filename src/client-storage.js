import localForage from 'localforage';

const increment = 3;
const limit = 3;
let suffix = 0,
  lastItemId = null;

const instance = localForage.createInstance({
  name: 'cars'
});

export const retrieveCars = () => instance.keys().then(keys => {

  const index = keys.indexOf(`${lastItemId}`);

  if (index === 0) {

    return [];

  }

  const limitedKeys = keys.slice().slice(index + 1, index + 1 + limit);

  return Promise.all(limitedKeys.map(key => instance.getItem(key)))
    .then(values => {

      if (values.length) {

        lastItemId = values[values.length - 1].id;

      }

      return values;

    });

});

export const storeCars = (...cars) => {

  suffix += increment;

  return Promise.all(
    cars.map(car => {

      const id = car.key + suffix;

      return instance.setItem(`${id}`, Object.assign({}, car.value, {id}));

    })
  );

};
