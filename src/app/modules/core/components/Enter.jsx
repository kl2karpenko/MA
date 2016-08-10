import React, {Component}       from 'react';
import { hashHistory }          from 'react-router';

import schema                   from 'schema';
import config                   from 'envConfig';
import locale                   from "lib/locale";

import LockCode                 from "models/LockCode";
import Token                    from "models/Token";

import FailBlock                from 'components/blocks/Fail.jsx';

import LoadingBlock             from 'components/blocks/Loading.jsx';
import Storage                  from "models/Storage";
import { logError, logInfo }    from "lib/logger";

/** Import ================================================================== */

export default class Enter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			fail: false,
			offline: false,
			showLoaderBlock: true,
			lang: "en"
		};

		this._checkIfUserIsConnected = this._checkIfUserIsConnected.bind(this);
		this._changeLoadStateToVisible = this._changeLoadStateToVisible.bind(this);
		this._changeLoadStateToHidden = this._changeLoadStateToHidden.bind(this);
		this._disconnect = this._disconnect.bind(this);

		this._disconnect();
	}

	componentDidMount() {
		this._listen();
		this._checkIfUserIsConnected();

		this._defineLang()
			.then((lang) => {
				this.setState({
					lang: lang
				});
			});
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

	_defineLang() {
		return locale.setCurrentLanguageOfDevice();
	}

	_changeLoadStateToVisible() {
		$('.app-loader').addClass('loading');
	}

	_changeLoadStateToHidden() {
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
		if (LockCode.isExist()) {
			hashHistory.replace('/pin');
		}
	}

	_disconnect() {
		if (Storage.existValue("disconnect") &&
			Storage.getValue("disconnect") === "true") {

			Storage.deleteValue("disconnect");
			Storage.clear();
			
			hashHistory.replace('/connects/qr');
			$(document).trigger('system:loading');
			return this;
		}
		return this;
	}

	_checkIfUserIsConnected() {
		$(document).trigger('system:loading');

		this
			._checkConnection()
			.then(() => {
				$(document).trigger('system:loaded');
				hashHistory.replace(Token._getActiveValue() ? '/pin' : '/connects/qr');
			});
	}

	_checkConnection() {
		return schema.ping()
			.done(() => {
				$(document).trigger('system:unfail');
				LockCode.isExist() && hashHistory.replace('/pin');
			})
			.fail(() => {
				$(document).trigger('system:fail');
			});
	}

	render() {
		let platformName = config.process.getActivePlatform();

		return (<div className={"l-adaptive-top" + (platformName ? (" " + platformName) : "")}>
			{ this.props.children }

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