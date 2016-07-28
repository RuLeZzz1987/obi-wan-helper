'use strict';

import { combineReducers } from 'redux';
import PlanetReducer from './PlanetReducer';
import LordsReducer from './LordsReducer';
import ScrollReducer from './ScrollReducer';

export default combineReducers({
	planetInfo: PlanetReducer,
	lordsInfo: LordsReducer,
	scroll: ScrollReducer
});
