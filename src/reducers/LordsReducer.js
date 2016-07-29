'use strict';

import * as Constants from "../constants/index";

const defaultState = {
	lords: new Array(5),
	scrollable: {
		up: false,
		down: false
	},
	scrolledUp: false,
	scrolledDown: false
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Constants.OFF_DOWN:
			return { ...state, scrollable: { ...state.scrollable, down: true } };
		case Constants.ON_DOWN:
			return { ...state, scrollable: { ...state.scrollable, down: false } };
		case Constants.OFF_UP:
			return { ...state, scrollable: { ...state.scrollable, up: true } };
		case Constants.TOGGLE_SCROLLED_DOWN: 
			return {...state, scrolledDown: false };
		case Constants.TOGGLE_SCROLLED_UP:
			return {...state, scrolledUp: false };
		case Constants.ON_UP:
			return { ...state, scrollable: { ...state.scrollable, up: false } };
		case Constants.SCROLL_UP:
		{
			const nextLords = [...new Array(2), ...state.lords.slice(0, 3)];
			state.lords
				 .slice(3, 5)
				 .forEach(lord=>lord instanceof Promise ? lord.abort() : null);
			return { ...state, lords: nextLords, scrolledUp: true }
		}
		case Constants.SCROLL_DOWN:
		{
			const nextLords = [...state.lords.slice(2, 5), ...new Array(2)];
			state.lords
				 .slice(0, 2)
				 .forEach(lord=>lord instanceof Promise ? lord.abort() : null);
			return { ...state, lords: nextLords, scrolledDown: true }
		}
		case Constants.ADD_LORD_DOWN:
		{
			const nextLords = [...state.lords];
			nextLords[action.position] = action.lord;
			return {
				...state,
				lords: nextLords,
				scrollable: {
					down: !(action.lord instanceof Promise) ?  !action.lord.apprentice.url : state.scrollable.down,
					up: state.scrollable.up
				}
			};
		}
		default:
			return state;
	}
}