import React, { Component } from 'react';

export default class Color extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-list-color">
				<span style={{ backgroundColor: this.props.color }}></span>
			</div>
		);
	}
}
