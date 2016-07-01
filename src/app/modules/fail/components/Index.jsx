import React, { Component } from 'react';

export default class Keyboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: this.props.text
		};
	}

	render() {
		return (<div className="fail-block">
				<div>{this.state.text}</div>
				<a href="#" onClick={this.props.onClick} className="btn btn-danger btn-lg" style={{marginTop: "15px"}}>Reload</a>
			</div>
		);
	}
}