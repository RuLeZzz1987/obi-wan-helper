'use strict';

import * as Constants from '../constants/index';

export const setPlanet = (planetName) => ({
	type: Constants.SET_PLANET,
	planetName
});

export const addLord = (lord) => ({
	type: Constants.ADD_LORD,
	lord
});