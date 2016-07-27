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
			loader: true
		};

		this._checkIfUserIsConnected = this._checkIfUserIsConnected.bind(this);
	}

	componentDidMount() {
		this._listen();
		this._checkIfUserIsConnected();
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

		$(document).ajaxStop(() => {
			$(document).trigger('system:ajaxStop');
		});

		$(document).on('system:ajaxStart',this._changeLoadStateTo.bind(this, true));
		$(document).on('system:ajaxStop',this._changeLoadStateTo.bind(this, false));

		document.addEventListener("offline", this._changeOfflineStateTo.bind(this, true), false);
		document.addEventListener("online", this._changeOfflineStateTo.bind(this, false), false);

		$(document).on('system:fail', this._changeFailStateTo.bind(this, true));
		$(document).on('system:unfail', this._changeFailStateTo.bind(this, false));

		document.addEventListener("resume", function() {
			LockCode.isExist() && hashHistory.push('/pin');
		});
	}

	_checkIfUserIsConnected() {
		this
			._checkConnection()
			.then(() => {
				hashHistory.replace(Token.token ? '/pin' : '/connects/qr');

				setTimeout(this._changeLoadStateTo.bind(this, false), 500);
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
			{ this.props.children && React.cloneElement(this.props.children, { system: this }) }

			<Loader
				show={this.state.loader}
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