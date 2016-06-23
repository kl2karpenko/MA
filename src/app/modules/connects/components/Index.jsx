import React, { Component } from 'react';

export default class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<div className="l-adaptive-wrapper">
				{this.props.children}
			</div>
		);
	}
}