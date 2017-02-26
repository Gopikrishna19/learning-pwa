import * as carService from './car-service';
import './index.scss';

window.carService = carService;

carService.loadMoreRequest();
