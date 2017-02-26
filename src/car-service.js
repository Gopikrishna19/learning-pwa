import {retrieveCars, storeCars} from './client-storage';
import {getNodes} from './template';

const carsNode = document.querySelector('main .cars');
const loaderNode = document.querySelector('main .first-load');

export const loadMore = (source, status) => retrieveCars()
  .then(cars => getNodes(...cars))
  .then(nodes => {

    console.log(`%c${source}`, `color: ${status}`); // eslint-disable-line no-console

    loaderNode.remove();
    nodes.forEach(node => carsNode.appendChild(node));

  });

export const loadMoreRequest = () => {

  const endPoint = './api/latest-deals.json';

  return fetch(endPoint)
    .then(response => response.json())
    .then(data => storeCars(...data.cars))
    .then(() => loadMore('Connection successful, serving live data', 'green'))
    .catch(() => loadMore('Connection failed, serving cached data', 'red'));

};
