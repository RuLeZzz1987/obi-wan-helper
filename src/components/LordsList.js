'use strict';

import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../actions/index";

class LordsList extends Component {

	constructor(...props) {
		super(...props);

		this.props.dispatch(Actions.loadLord(0, 'http://jedi.smartjs.academy/dark-jedis/3616', 'down'))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lords != this.props.lords && nextProps.scrolledUp) {
			this.props.dispatch(Actions.toggleScrolledUp());
			for (var i = 0; i < nextProps.lords.length; i++) if (!!nextProps.lords[i]) break;
			this.props.dispatch(Actions.loadLord(i, nextProps.lords[i].master.url, 'up'))
		}
		if (nextProps.lords != this.props.lords && nextProps.scrolledDown) {
			this.props.dispatch(Actions.toggleScrolledDown());
			for (var i = nextProps.lords.length; i > 0; i--) if (!!nextProps.lords[i]) break;
			this.props.dispatch(Actions.loadLord(i, nextProps.lords[i].master.url, 'down'))
		}
	}

	render() {
		return (
			<ul className="css-slots">
				{this.props.lords.map((lord, index)=>
					lord && !(lord instanceof Promise) ?
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
	scrolledUp: state.lordsInfo.scrolledUp,
	scrolledDown: state.lordsInfo.scrolledDown
});

export default connect(mapStateToProps)(LordsList)
