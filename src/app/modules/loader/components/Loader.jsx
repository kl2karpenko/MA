import React, { Component } from 'react';
import { hashHistory } from 'react-router'

import schema from 'schema';

import Session from "core/models/Session";

class Loader extends Component {
	constructor(props) {
		super(props);

		// here take data from authorize
		Session._checkIfAuthorize(Session.session.user).then((authorizeInfo) => {
			let enterPage = authorizeInfo.session && authorizeInfo.session.user && authorizeInfo.session.user.id ? '/pin' : '/connect/main';
			// TODO: delete settimeout
			setTimeout(() => {
				hashHistory.push(enterPage);
			}, 0);
		});
	}

	render() {
		return (
			<div className="app-enterPage">
				<div className="app-loader">
					{[...Array(5)].map((x, i) =>
						<span></span>
					)}
				</div>
			</div>
		);
	}
}

module.exports = Loader;