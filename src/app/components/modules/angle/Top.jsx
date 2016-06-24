import React, { Component } from 'react';

export default class AngleTop extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-angle-top">
				<div className="m-angle-name">{this.props.title}</div>
				{this.props.children}
			</div>
		);
	}
}