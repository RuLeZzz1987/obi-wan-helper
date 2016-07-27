'use strict';

import * as Constants from "../constants/index";

const defaultState = {
	lords: [],
	lordsUrls: []
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case Constants.ADD_LORD:
			return {
				lords: state.lords.concat(action.lord),
				lordsUrls: state.lordsUrls
			};
		default:
			return state;
	}
}