'use strict';

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import reducers from "./reducers/index";
import { createStore } from "redux";
import * as Actions from './actions/index';

const store = createStore(reducers, {});

const socket = new WebSocket('ws://jedi.smartjs.academy');

socket.addEventListener('message', ({ data })=> {
	const { name } = JSON.parse(data);
	store.dispatch(Actions.setPlanet(name));
});

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
