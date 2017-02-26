import {retrieveCars, storeCars} from './client-storage';
import {getNodes} from './template';

const carsNode = document.querySelector('main .cars');
const loaderNode = document.querySelector('main .first-load');

export const loadMore = () => retrieveCars()
  .then(cars => getNodes(...cars))
  .then(nodes => {

    loaderNode.remove();
    nodes.forEach(node => carsNode.appendChild(node));

  });

export const loadMoreRequest = () => {

  const endPoint = './api/latest-deals.json';

  return fetch(endPoint)
    .then(response => response.json())
    .then(data => storeCars(...data.cars))
    .then(loadMore);

};
