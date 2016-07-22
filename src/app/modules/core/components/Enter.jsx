import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import config from 'envConfig';

import Pin from "models/Pin";
import Token from "models/Token";

import FailBlock from 'components/blocks/Fail.jsx';

import LoadingBlock from 'components/blocks/Loading.jsx';
import Loader from 'components/layouts/Loader.jsx';

export default class Enter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			fail: false,
			offline: false,
			loader: true
		};

		this._listen();
		this._checkToken();
	}

	_changeLoadStateTo(state) {
		this.setState({ loading: state, loader: false });
	}

	_changeOfflineStateTo(state) {
		this.setState({ offline: state });
	}

	_changeFailStateTo(state) {
		this.setState({ fail: state });
	}

	_listen() {
		$(document).ajaxStart(() => {
			$(document).trigger('system:ajaxStart');
		});

		$(document).ajaxComplete(() => {
			$(document).trigger('system:ajaxComplete');
		});

		$(document).on('system:ajaxStart',this._changeLoadStateTo.bind(this, true));
		$(document).on('system:ajaxComplete',this._changeLoadStateTo.bind(this, false));

		document.addEventListener("offline", this._changeOfflineStateTo.bind(this, true), false);
		document.addEventListener("online", this._changeOfflineStateTo.bind(this, false), false);

		$(document).on('system:fail', this._changeFailStateTo.bind(this, true));
		$(document).on('system:unfail', this._changeFailStateTo.bind(this, false));

		document.addEventListener("resume", function() {
			Pin.isExist() && hashHistory.push('/pin');
		});

		document.addEventListener("showkeyboard", function() {
			alert("showkey");
		}, false);
	}

	_checkToken() {
		let clientToken = Token.token;

		console.log(clientToken, "clientToken");

		hashHistory.replace(clientToken ? '/pin' : '/connects/qr');

		setTimeout(this._changeLoadStateTo.bind(this, false), 500);

		// TODO think how to ping server when it is fail
		$(document).trigger('system:unfail');
	}

	render() {
		let platformName = config.process.getActivePlatform();

		return (<div className={"l-adaptive-top" + (platformName ? (" " + platformName) : "")}>
			{this.props.children}

			<Loader
				show={this.state.loader}
			/>

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