import React, { Component } from 'react';

export default class AngleInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-angle-info">
				{this.props.children}
			</div>
		);
	}
}