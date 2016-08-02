'use strict';

import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../actions/index";

class LordsList extends Component {

	constructor(...props) {
		super(...props);

		this.props.dispatch(Actions.loadLord())
	}


	componentWillReceiveProps(nextProps) {
		console.log(this.props.urls != nextProps.urls);
		if (this.props.urls != nextProps.urls) {
			this.props.dispatch(Actions.loadLord())
		}
	}

	// componentWillReceiveProps(nextProps) {
	// 	var i;
	//	
	// 	if (nextProps.lords != this.props.lords && nextProps.scrolledUp) {
	// 		this.props.dispatch(Actions.toggleScrolledUp());
	// 		for (i = 0; i < nextProps.lords.length; i++) if (!!nextProps.lords[i]) break;
	// 		this.props.dispatch(Actions.loadLord(nextProps.lords[i].master.url, 'up'))
	// 	}
	// 	if (nextProps.lords != this.props.lords && nextProps.scrolledDown) {
	// 		this.props.dispatch(Actions.toggleScrolledDown());
	// 		for (i = nextProps.lords.length; i > 0; i--) if (!!nextProps.lords[i]) break;
	// 		this.props.dispatch(Actions.loadLord(nextProps.lords[i].master.url, 'down'))
	// 	}
	// }

	render() {
		return (
			<ul className="css-slots">
				{this.props.urls.map(url=>
					this.props.lords[url] && !(this.props.lords[url] instanceof Promise) ?
						<li
							className="css-slot"
						>
							<h3>{this.props.lords[url].name}</h3>
							<h6>Homeworld: {this.props.lords[url].homeworld.name}</h6>
						</li>
						:
						<li
							className="css-slot"
						/>
				)}
			</ul>
		)
	}
}

const mapStateToProps = state => ({
	lords: state.lordsInfo.lords,
	urls: state.lordsInfo.urls,
	scrolledUp: state.lordsInfo.scrolledUp,
	scrolledDown: state.lordsInfo.scrolledDown
});

export default connect(mapStateToProps)(LordsList)
