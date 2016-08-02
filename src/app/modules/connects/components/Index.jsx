import React, { Component } from 'react';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';


export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		$(document).trigger('system:loaded');
		$(document).trigger('system:unblock');

		console.log((this.props.location.pathname));

		return (
			<ReactCSSTransitionGroup
				key={this.props.location.pathname + '-page'}
				transitionName="fade"
				transitionEnterTimeout = {500}
				transitionLeaveTimeout={500}
				transitionAppear = {false}
				transitionEnter = {true} transitionLeave = {true}>
			<AdaptiveWrapper>
				{React.cloneElement(this.props.children, {
					key: this.props.location.pathname + '-pagelist'
				})}
			</AdaptiveWrapper>
			</ReactCSSTransitionGroup>
		);
	}
}