import {getNodes} from './template';
import {storeCars} from './client-storage';

export const loadMoreRequest = () => {

  const cars = document.querySelector('main .cars');
  const loader = document.querySelector('main .first-load');

  const endPoint = '/api/latest-deals.json';

  return fetch(endPoint)
    .then(response => response.json())
    .then(data =>
      storeCars(...data.cars).then(
        () => getNodes(...data.cars)
      )
    )
    .then(nodes => {

      loader.remove();
      nodes.forEach(node => cars.appendChild(node));

    });

};
