'use strict';

import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../actions/index";

class LordsList extends Component {

	constructor(...props) {
		super(...props);

		this.props.dispatch(Actions.loadLord(0, 'http://jedi.smartjs.academy/dark-jedis/3616', 'down'))
	}

	render() {
		return (
			<ul className="css-slots">
				{this.props.lords.map((lord, index)=>
					lord && !(lord instanceof Promise)?
						<li 
							className="css-slot" 
							key={lord.id || index}
						>
							<h3>{lord.name}</h3>
							<h6>Homeworld: {lord.homeworld.name}</h6>
						</li> 
						:
						<li 
							key={index} 
							className="css-slot"
						/>
				)}
			</ul>
		)
	}
}

const mapStateToProps = state => ({
	lords: state.lordsInfo.lords,
	planet: state.planetInfo.planetName
});

export default connect(mapStateToProps)(LordsList)
