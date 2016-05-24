import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Session from "core/models/Session";

class Loader extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// here take data from authorize
		Session._getSessionData(Session.Model.user).then((authorizeInfo) => {
			let enterPage = authorizeInfo.session && authorizeInfo.session.user && authorizeInfo.session.user.id ? '/pin' : '/connect/main';
			// TODO: delete settimeout
			setTimeout(() => {
				hashHistory.push(enterPage);
			}, 0);
		});
	}

	render() {
		return (
			<div>
				Settings
			</div>
		);
	}
}

module.exports = Loader;