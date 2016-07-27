'use strict';

import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";

class CurrentPlanet extends Component {

	static propTypes = {
		planet: PropTypes.string.isRequired
	};

	render() {
		return (
			<h1
				className="css-planet-monitor"
			>
				{`Obi-Wan currently on ${this.props.planet}`}
			</h1>
		)
	}
}

const mapStateToProps = (state) => ({ planet: state.planetInfo.planetName });

export default connect(mapStateToProps)(CurrentPlanet);