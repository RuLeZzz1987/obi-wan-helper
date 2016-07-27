'use strict';

import { combineReducers } from 'redux';
import PlanetReducer from './PlanetReducer';
import LordsReducer from './LordsReducer';

export default combineReducers({
	planetInfo: PlanetReducer,
	lords: LordsReducer
});
