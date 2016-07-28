'use strict';

import React, { Component, PropTypes } from "react";
import CurrentPlanet from "./CurrentPlanet";
import LordsList from "./LordsList";
import Navigation from "./Navigation";
import "./styles.css";

export default class App extends Component {

	render() {
		return (
			<section className="app-container">
				<div className="css-root">
					<CurrentPlanet />
					<section className="css-scrollable-list">
						<LordsList />
						<Navigation />
					</section>
				</div>
			</section>
		)
	}
}
