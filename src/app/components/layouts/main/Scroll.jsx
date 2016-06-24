import React, { Component } from 'react';

export default class MainScroll extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="l-main">
				<div className="l-main-scroll">
					{this.props.children}
				</div>
			</div>
		);
	}
}