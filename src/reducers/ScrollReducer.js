'use strict';

import * as Constants from '../constants/index';

const defaultState = {
	up: false,
	down: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Constants.TOGGLE_DOWN: 
			return {...state, down: !state.down};
		case Constants.TOGGLE_UP:
			return {...state, up: !state.up};
		default:
			return state;
	}
}