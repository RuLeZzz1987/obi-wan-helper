'use strict';

import * as Constants from "../constants/index";

const defaultState = {
	lords: new Array(5)
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Constants.ADD_LORD_DOWN:
		{
			const nextLords = [...state.lords];
			nextLords[action.position] = action.lord;
			
			return {lords: nextLords};
		}
		default:
			return state;
	}
}