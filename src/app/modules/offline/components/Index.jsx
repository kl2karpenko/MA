import React, { Component } from 'react';

import {hashHistory} from 'react-router';

import Session from "models/Session";

export default class Offline extends Component {
	constructor(props) {
		super(props);
	}

	_reload() {
		Session.load().done(() => {
			hashHistory.goBack();
		});

		if ((navigator.connection && navigator.connection.type) !== (Connection && Connection.NONE)) {
			hashHistory.goBack();
		}
	}

	render() {
		return (
			<div className="fail info">
				<div className="fail-block">
					<div>You have gone offline, please check your connection</div>
					<a href="#" onClick={this._reload} className="btn btn-danger btn-lg" style={{marginTop: "15px"}}>Try again</a>
				</div>
			</div>
		);
	}
}