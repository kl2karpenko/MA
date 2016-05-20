import React, { Component } from 'react';
import { Link } from 'react-router';
import schema from 'schema';

import Session from "core/models/Session";
import User from "core/models/User";

import DialplanPersonal from './DialplanPersonal.jsx';
import DialplanCompany from './DialplanCompany.jsx';

class DialplanPage extends Component {
	constructor(props) {
		super(props);

		this._loadResources();
	}

	_loadResources() {
		return this
			._loadUser()
			.then(this._loadUserDialplan);
	}

	_loadUser() {
		return User.load();
	}

	_loadUserDialplan() {
		let { username, dialplan } = Session.user;

		return User.loadSingleResourceFromCollection(dialplan.id, 'dialplan', {
			id: username
		});
	}

	render() {
		// let { params } = this.props;
		// let type = params.type;
		let Page;
		
		if ("personal") {
			Page = <DialplanPersonal/>;
		} else {
			Page = <DialplanCompany/>;
		}

		return (
			<div className="l-adaptive-wrapper">
				{Page}
			</div>
		);
	}
}

module.exports = DialplanPage;