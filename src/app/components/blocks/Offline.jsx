import React, { Component } from 'react';

export default class Keyboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div className="fail-block">
				<div>Server is unavailable, please try again later =(</div>
				<a href="#" onClick={this.props.onClick} className="btn btn-danger btn-lg" style={{marginTop: "15px"}}>Reload</a>
			</div>
		);
	}
}