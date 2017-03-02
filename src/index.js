import {loadMoreRequest} from './car-service';
import {registerWorker} from './worker-reg';
import 'file-loader?name=worker.js!./worker';
import './index.scss';

window.services = {
  loadMoreRequest
};

loadMoreRequest();
registerWorker();
