'use strict';

import * as Constants from "../constants/index";
import { fetch } from "../helper/fetch";

export const setPlanet = (planetName) => ({
	type: Constants.SET_PLANET,
	planetName
});

export const addLord = (lord, url) => ({
	type: Constants.ADD_LORD_DOWN,
	lord,
	url
});

export const scrollUp = () => dispatch => {
	dispatch({ type: Constants.SCROLL_UP });

};

export const toggleScrolledUp = () => ({ type: Constants.TOGGLE_SCROLLED_UP });

export const toggleScrolledDown = () => ({ type: Constants.TOGGLE_SCROLLED_DOWN });

export const scrollDown = () => ({ type: Constants.SCROLL_DOWN });

const offDown = () => ({ type: Constants.OFF_DOWN });

const offUp = () => ({ type: Constants.OFF_UP });

const onDown = () => ({ type: Constants.ON_DOWN });

const onUp = () => ({ type: Constants.ON_UP });

export const loadLord = (url, direction) => (dispatch, getState) => {

	const { lordsInfo: { lords, urls } } = getState();
	
	urls.forEach(url => {
		if (!url) {
			return;
		}
		if (!lords[url]) {
			const promise = fetch(url);
			dispatch(addLord(promise, url));
			promise
				.then(lord=> {
					dispatch(addLord(lord, url))
				})
		}
	});

};