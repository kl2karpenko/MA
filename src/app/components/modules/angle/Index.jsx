import React, { Component } from 'react';

export default class Angle extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"m-angle" + (this.props.class ? " " + this.props.class : "")}>
				<div className="m-angle-wrapper">
					<h2 className="m-angle__header">{this.props.header}</h2>

					{this.props.children}
				</div>
			</div>
		);
	}
}