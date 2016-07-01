import React, { Component } from 'react';

import Session from "models/Session";

export default class Keyboard extends Component {
	constructor(props) {
		super(props);
	}

	onClickButton() {
		return Session
			._getSessionData()
	}

	render() {
		return (<div className="fail-block">
				<div>Server is unavailable, please try again later =(</div>
				<a href="#" onClick={this.onClickButton} className="btn btn-danger btn-lg" style={{marginTop: "15px"}}>Reload</a>
			</div>
		);
	}
}