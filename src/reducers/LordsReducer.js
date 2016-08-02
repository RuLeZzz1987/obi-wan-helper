'use strict';

import * as Constants from "../constants/index";

const defaultState = {
	urls: ['http://jedi.smartjs.academy/dark-jedis/3616', ...new Array(4)],
	lords: {},
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
			return { ...state, scrolledDown: false };
		case Constants.TOGGLE_SCROLLED_UP:
			return { ...state, scrolledUp: false };
		case Constants.ON_UP:
			return { ...state, scrollable: { ...state.scrollable, up: false } };
		case Constants.SCROLL_UP:
		{
			const nextUrls = [...new Array(2), ...state.urls.slice(0, 3)];
			let lord = state.lords[state.urls[0]];
			let idx = nextUrls.indexOf(state.urls[0]);
			if (!nextUrls[idx + 1] && lord) {
				nextUrls[idx + 1] = lord.apprentice.url;
			}
			if (!nextUrls[idx - 1] && lord) {
				nextUrls[idx - 1] = lord.master.url;
			}
			return {
				...state,
				lords: state.urls.reduce((lords, url)=> {
					if (nextUrls.indexOf(url) != -1) {
						lords[url] = state.lords[url];
					} else {
						if (state.lords[url] instanceof Promise) {
							state.lords[url].abort();
						}
					}
					return lords;
				}, {}),
				urls: nextUrls,
				scrolledDown: true,
				scrollable: {
					up: state.scrollable.up,
					down: nextUrls.reduce((count, el)=>(!!el ? ++count : count), 0) == 0
				}
			}

		}
		case Constants.SCROLL_DOWN:
		{
			const nextUrls = [...state.urls.slice(2, 5), ...new Array(2)];
			let lord = state.lords[state.urls[2]];
			let idx = nextUrls.indexOf(state.urls[2]);
			if (!nextUrls[idx + 1] && lord) {
				nextUrls[idx + 1] = lord.apprentice.url;
			}
			if (!nextUrls[idx - 1] && lord) {
				nextUrls[idx - 1] = lord.master.url;
			}
			return {
				...state,
				lords: state.urls.reduce((lords, url)=> {
					if (nextUrls.indexOf(url) != -1) {
						lords[url] = state.lords[url];
					} else {
						if (state.lords[url] instanceof Promise) {
							state.lords[url].abort();
						}
					}
					return lords;
				}, {}),
				urls: nextUrls,
				scrolledDown: true,
				scrollable: {
					up: state.scrollable.up,
					down: nextUrls.reduce((count, el)=>(!!el ? ++count : count), 0) == 0
				}
			}
		}
		case Constants.ADD_LORD_DOWN:
		{
			if (!action.lord) {
				return state;
			}
			if (action.lord instanceof Promise) {
				return {
					...state,
					lords: {
						...state.lords,
						[action.url]: action.lord
					}
				}
			}
			else {
				const nextUrls = [...state.urls];
				const idx = nextUrls.indexOf(action.url);
				if (!nextUrls[idx - 1]) {
					nextUrls[idx - 1] = action.lord.master.url;
				}
				if (!nextUrls[idx + 1]) {
					nextUrls[idx + 1] = action.lord.apprentice.url;
				}
				return {
					...state,
					lords: {
						...state.lords,
						[action.url]: action.lord
					},
					urls: nextUrls
				}
			}
		}
		default:
			return state;
	}
}