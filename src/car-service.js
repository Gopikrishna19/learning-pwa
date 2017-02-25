import {getNodes} from './template';

export const loadMoreRequest = () => {

  const cars = document.querySelector('main .cars');
  const endPoint = '/api/latest-deals.json';

  return fetch(endPoint)
    .then(response => response.json())
    .then(data => getNodes(...data.cars))
    .then(nodes => nodes.forEach(node => cars.appendChild(node)));

};
