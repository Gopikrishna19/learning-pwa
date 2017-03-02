import {loadMoreRequest} from './car-service';
import {registerWorker} from './worker-reg';
import 'file-loader?name=worker.js!./worker';
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
registerWorker();
