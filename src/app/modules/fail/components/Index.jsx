import React, { Component } from 'react';

import {hashHistory} from 'react-router';

import Session from "models/Session";

export default class Keyboard extends Component {
	constructor(props) {
		super(props);
	}

	_reload() {
		Session
			._getSessionData()
			.then(() => {
				let
					isConnected = Session._isConnected();

				hashHistory.replace(isConnected ? '/pin' : '/authorize');
			});
	}

	render() {
		return (
			<div className="fail">
				<div className="fail-block">
					<div>Server is unavailable, please try again later!</div>
					<a href="#" onClick={this._reload} className="btn btn-danger btn-lg" style={{marginTop: "15px"}}>Reload</a>
				</div>
			</div>
		);
	}
}