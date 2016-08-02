import React, {Component}   from 'react';
import { hashHistory }      from 'react-router';

import schema               from 'schema';
import config               from 'envConfig';

import LockCode             from "models/LockCode";
import Token                from "models/Token";

import FailBlock            from 'components/blocks/Fail.jsx';

import LoadingBlock         from 'components/blocks/Loading.jsx';
import Loader               from 'components/layouts/Loader.jsx';

/** Import ================================================================== */

export default class Enter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			fail: false,
			offline: false,
			showLoaderBlock: true
		};

		this._checkIfUserIsConnected = this._checkIfUserIsConnected.bind(this);
		this._changeLoadStateToVisible = this._changeLoadStateToVisible.bind(this);
		this._changeLoadStateToHidden = this._changeLoadStateToHidden.bind(this);
	}

	componentDidMount() {
		this._listen();
		this._checkIfUserIsConnected();
	}

	componentWillUnmount() {
		$(document).off('system:loading', this._changeLoadStateToVisible);
		$(document).off('system:loaded', this._changeLoadStateToHidden);

		document.removeEventListener("offline", this._changeOfflineStateTo.bind(this, true));
		document.removeEventListener("online", this._changeOfflineStateTo.bind(this, false));

		$(document).off('system:fail', this._changeFailStateTo.bind(this, true));
		$(document).off('system:unfail', this._changeFailStateTo.bind(this, false));

		document.removeEventListener("resume", Enter._resume);
	}

	_changeLoadStateTo(data) {
		this.setState({ loading: data.loading, showLoaderBlock: data.showLoaderBlock || false });
	}

	_changeLoadStateToVisible(e) {
		$('.app-loader').addClass('loading');
	}

	_changeLoadStateToHidden(e) {
		$('.app-loader').removeClass('loading');
	}

	_changeOfflineStateTo(state) {
		this.setState({ offline: state });
	}

	_changeFailStateTo(state) {
		this.setState({ fail: state });
	}

	_listen() {
		$(document).on('system:loading', this._changeLoadStateToVisible);
		$(document).on('system:loaded', this._changeLoadStateToHidden);

		document.addEventListener("offline", this._changeOfflineStateTo.bind(this, true));
		document.addEventListener("online", this._changeOfflineStateTo.bind(this, false));

		$(document).on('system:fail', this._changeFailStateTo.bind(this, true));
		$(document).on('system:unfail', this._changeFailStateTo.bind(this, false));

		document.addEventListener("resume", Enter._resume);
	}

	static _resume() {
		LockCode.isExist() && hashHistory.push('/pin');
	}

	_checkIfUserIsConnected() {
		$(document).trigger('system:loading');

		this
			._checkConnection()
			.then(() => {
				$(document).trigger('system:loaded');
				hashHistory.replace(Token.token ? '/pin' : '/connects/qr');

				this.setState({
					showLoaderBlock: false
				});
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
				key="loader"
				show={this.state.showLoaderBlock}
			/>

			<LoadingBlock
				key="loadingBlock"
				show={this.state.loading}
			/>

			<FailBlock
				key="failBlock"
				onFail={this._checkIfUserIsConnected}
				fail={this.state.fail}
				offline={this.state.offline}
			/>
		</div>);
	}
}