'use strict';

import * as Constants from '../constants/index';

const defaultState = {
	planetName: ''
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Constants.SET_PLANET:
			return {planetName: action.planetName};
		default:
			return state;
	}
}