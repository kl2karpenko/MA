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

	_changeLoadStateTo(state) {
		this.setState({ loading: state });
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
		return (<div className={"l-adaptive-top " + process.env.platformName}>
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