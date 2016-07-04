import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import Session from "models/Session";
import FailBlock from 'components/blocks/Fail.jsx';

import LoadingBlock from 'components/blocks/Loading.jsx';

export default class Enter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			fail: false,
			offline: false
		};

		this._listen();
	}

	_listen() {
		$(document).ajaxStart(() => {
			this.setState({
				loading: true
			});
		});

		$(document).ajaxComplete(() =>{
			this.setState({
				loading: false
			});
		});

		document.addEventListener("offline", () => {
			this.setState({
				offline: true
			});
		}, false);

		document.addEventListener("online", () => {
			this.setState({
				offline: false
			});
		}, false);

		$(document).on('system:fail', () => {
			this.setState({
				fail: true
			});
		});

		$(document).on('system:unfail', () => {
			this.setState({
				fail: false
			});
		});
	}

	_checkConnection() {
		Session
			._getSessionData()
			.then(() => {
				$(document).trigger('system:unfail');
				hashHistory.replace(Session._isConnected() ? '/pin' : '/authorize');
			})
			.fail(() => {
				$(document).trigger('system:fail');
			});
	}

	render() {
		return (<div className="l-adaptive-top">
			{this.props.children}

			<LoadingBlock
				show={this.state.loading}
			/>

			<FailBlock
				onFail={this._checkConnection}
				fail={this.state.fail}
				offline={this.state.offline}
			/>
		</div>);
	}
}