import {loadMoreRequest} from './car-service';
import './index.scss';

const refresh = () => {

  if (window.applicationCache) {

    window.applicationCache.update();

  }

};

window.services = {
  loadMoreRequest,
  refresh
};

loadMoreRequest();
