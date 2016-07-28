import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import schema from 'schema';
import config from 'envConfig';

import LockCode from "models/LockCode";
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
			showLoaderBlock: true
		};

		this._checkIfUserIsConnected = this._checkIfUserIsConnected.bind(this);
	}

	componentDidMount() {
		this._listen();
		this._checkIfUserIsConnected();
	}

	_changeLoadStateTo(data) {
		this.setState({ loading: data.loading, showLoaderBlock: data.showLoaderBlock || false });
	}

	_changeOfflineStateTo(state) {
		this.setState({ offline: state });
	}

	_changeFailStateTo(state) {
		this.setState({ fail: state });
	}

	_listen() {
		$(document).on('system:loading', (event, data) => {
			this._changeLoadStateTo(data || {
				loading: true, showLoaderBlock: true
			});
		});
		$(document).on('system:loaded', (event, data) => {
			this._changeLoadStateTo(data || {
				loading: false, showLoaderBlock: false
			});
		});

		document.addEventListener("offline", this._changeOfflineStateTo.bind(this, true));
		document.addEventListener("online", this._changeOfflineStateTo.bind(this, false));

		$(document).on('system:fail', this._changeFailStateTo.bind(this, true));
		$(document).on('system:unfail', this._changeFailStateTo.bind(this, false));

		document.addEventListener("resume", function() {
			LockCode.isExist() && hashHistory.push('/pin');
		});
	}

	_checkIfUserIsConnected() {
		$(document).trigger('system:loading');

		this
			._checkConnection()
			.then(() => {
				hashHistory.replace(Token.token ? '/pin' : '/connects/qr');
			});
	}

	_checkConnection() {
		return schema.ping().done(() => {
			$(document).trigger('system:unfail');
			LockCode.isExist() && hashHistory.push('/pin');
		}).fail(() => {
			$(document).trigger('system:fail');
		});
	}

	render() {
		let platformName = config.process.getActivePlatform();

		return (<div className={"l-adaptive-top" + (platformName ? (" " + platformName) : "")}>
			{ this.props.children }

			<Loader
				show={this.state.showLoaderBlock}
			/>

			<LoadingBlock
				show={this.state.loading}
			/>

			<FailBlock
				onFail={this._checkIfUserIsConnected}
				fail={this.state.fail}
				offline={this.state.offline}
			/>
		</div>);
	}
}