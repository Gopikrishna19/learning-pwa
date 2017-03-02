import {loadMoreRequest} from './car-service';
import {registerWorker} from './worker-reg';
import 'file-loader?name=worker.js!./worker';
import 'file-loader?name=manifest.json!./manifest.json';
import './index.scss';

window.services = {
  loadMoreRequest
};

loadMoreRequest();
registerWorker();
