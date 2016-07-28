'use strict';

import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../actions/ScrollActions";
import { bindActionCreators } from 'redux';

class Navigation extends Component {

	static propTypes = {
		action: PropTypes.shape({
			scrollUp: PropTypes.func.isRequired,
			scrollDown: PropTypes.func.isRequired
		}).isRequired,
		up: PropTypes.bool.isRequired,
		down: PropTypes.bool.isRequired
	};

	render() {
		let upBtnClasses = `css-button-up ${this.props.up ? 'css-button-disabled': ''}`;
		let downBtnClasses = `css-button-down ${this.props.down ? 'css-button-disabled': ''}`;
		
		return (
			<aside className="css-scroll-buttons">
				<button
					disabled={this.props.up}
					className={upBtnClasses}
					onClick={this.props.action.scrollUp}
				/>
				<button
					disabled={this.props.down}
					className={downBtnClasses}
					onclick={this.props.action.scrollDown}
				/>
			</aside>
		)
	}
}

const mapStateToProps = state => ({
	up: state.scroll.up,
	down: state.scroll.down
});

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);