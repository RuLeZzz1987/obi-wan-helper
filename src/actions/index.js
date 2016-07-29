'use strict';

import * as Constants from "../constants/index";

export const setPlanet = (planetName) => ({
	type: Constants.SET_PLANET,
	planetName
});

export const addLord = (lord, position) => ({
	type: Constants.ADD_LORD_DOWN,
	lord,
	position
});

export const scrollUp = () => dispatch => {
	dispatch({ type: Constants.SCROLL_UP });

};

export const toggleScrolledUp = () => ({type: Constants.TOGGLE_SCROLLED_UP});

export const toggleScrolledDown = () => ({type: Constants.TOGGLE_SCROLLED_DOWN});

export const scrollDown = () => ({ type: Constants.SCROLL_DOWN });

const offDown = () => ({ type: Constants.OFF_DOWN });

const offUp = () => ({ type: Constants.OFF_UP });

const onDown = () => ({ type: Constants.ON_DOWN });

const onUp = () => ({ type: Constants.ON_UP });

export const loadLord = (currentPosition, url, direction) => dispatch => {

	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();

	const promise = new Promise(resolve => {
		xhr.addEventListener('readystatechange', () => {
			if (xhr.readyState === xhr.DONE) {
				resolve(JSON.parse(xhr.responseText));
			}
		});
	});

	dispatch(addLord(promise, currentPosition));

	promise.abort = () => xhr.abort();

	promise
		.then(data=> {
			dispatch(addLord(data, currentPosition));
			if (direction == 'down') {
				if (currentPosition < 5) {
					if (data.apprentice.url) {
						loadLord(currentPosition + 1, data.apprentice.url, 'down')(dispatch)
					} else {
						dispatch(offDown());
					}
				}
			} else {
				if (currentPosition > 0) {
					if (data.master.url) {
						loadLord(currentPosition - 1, data.master.url, 'up')(dispatch)
					} else {
						dispatch(offUp());
					}
				}
			}
		});

};