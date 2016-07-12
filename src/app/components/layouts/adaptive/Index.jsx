import React, { Component } from 'react';

export default class Adaptive extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"l-adaptive" + (this.props.class ? (" " + this.props.class) : "")}>
				{this.props.children}
			</div>
		);
	}
}