'use strict';

import * as Constants from '../constants/index';

export const setPlanet = (planetName) => ({
	type: Constants.SET_PLANET,
	planetName
});

export const addLord = (lord, position) => ({
	type: Constants.ADD_LORD_DOWN,
	lord,
	position
});

export const loadLord = (currentPosition, url, direction) => dispatch => {
	
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();
	
	const promise = new Promise(resolve => {
		xhr.addEventListener('readystatechange', () => {
			if (xhr.readyState ===xhr.DONE) {
				resolve(JSON.parse(xhr.responseText));
			}
		});
	});
	
	dispatch(addLord(promise, currentPosition));

	promise.abort = () => xhr.abort();
	
	promise
		.then(data=>{
			dispatch(addLord(data, currentPosition));
			if (currentPosition < 5 ) {
				console.log(data.apprentice.url, data.master.url, direction, currentPosition);
				if (data.apprentice.url && direction == 'down') {
					loadLord(currentPosition + 1, data.apprentice.url, 'down')(dispatch)
				}
				if (data.master.url && direction == 'up') {
					loadLord(currentPosition - 1, data.master.url, 'up')(dispatch)
				}
			}
		});

};