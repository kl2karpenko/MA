import React, { Component } from 'react';
import { hashHistory } from 'react-router'

import schema from 'schema';

import Session from "core/models/Session";

class Loader extends Component {
	constructor(props) {
		super(props);

		// here take data from authorize
		this._getInfoAboutAuthorize().then((authorizeInfo) => {
			let info = authorizeInfo.authorize && authorizeInfo.authorize.user && authorizeInfo.authorize.user.id;
			let enterPage = info ? '/pin' : '/connect/main';

			if (info) {
				Session.assignAttributesTo(Session.user, authorizeInfo.authorize.user);
			}

			// TODO: delete settimeout
			setTimeout(() => {
				hashHistory.push(enterPage);
			}, 0);
		});
	}
	
	_getInfoAboutAuthorize() {
		return schema.authorize.read();
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