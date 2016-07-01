import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Session from "models/Session";

export default class Enter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fail: Session.failConnection,
			connected: Session._isConnected()
		};

		this._redirectTo();

		this._reloadApp = this._reloadApp.bind(this);
	}

	_redirectTo() {
		if (!Session.failConnection) {
			hashHistory.replace(this.state.connected ? '/pin' : '/authorize')
		}
	}

	_reloadApp() {
		return Session
			._getSessionData()
			.then(() => {
				this.setState({
					fail: Session.failConnection
				});

				this._redirectTo();
			});
	}

	render() {
		// TODO: edit delete errors
		return (
			<div className={"l-adaptive-top" + (this.state.fail ? " fail" : "")}>
				{(() => {
					if (!this.state.fail) {
						return this.props.children;
					} else {
						return <div className="fail-block">
							<div>{this.state.fail}</div>
							<a href="#" onClick={this._reloadApp} className="btn btn-danger btn-lg" style={{marginTop: "15px"}}>Reload</a>
						</div>;
					}
				})()}
			</div>
		);
	}
}