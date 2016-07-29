'use strict';

import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { scrollDown, scrollUp } from "../actions/index";

class Navigation extends Component {

	static propTypes = {
		scrollUp: PropTypes.func.isRequired,
		scrollDown: PropTypes.func.isRequired,
		up: PropTypes.bool.isRequired,
		down: PropTypes.bool.isRequired
	};

	render() {
		let upBtnClasses = `css-button-up ${this.props.up ? 'css-button-disabled' : ''}`;
		let downBtnClasses = `css-button-down ${this.props.down ? 'css-button-disabled' : ''}`;

		console.log(this.props.up, this.props.down);

		return (
			<aside className="css-scroll-buttons">
				<button
					disabled={this.props.up}
					className={upBtnClasses}
					onClick={this.props.scrollUp}
				/>
				<button
					disabled={this.props.down}
					className={downBtnClasses}
					onClick={this.props.scrollDown}
				/>
			</aside>
		)
	}
}

const mapStateToProps = state => ({
	up: state.lordsInfo.scrollable.up,
	down: state.lordsInfo.scrollable.down
});

const mapDispatchToProps = dispatch => ({
	scrollDown: () => dispatch(scrollDown()),
	scrollUp: () => dispatch(scrollUp())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);