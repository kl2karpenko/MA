import React, { Component } from 'react';

import Session from "core/models/Session";
import User from "core/models/User";
import Dialplan from "../models/Dialplan";

import DialplanPersonal from './DialplanPersonal.jsx';
import DialplanCompany from './DialplanCompany.jsx';

class DialplanPage extends Component {
	constructor(props) {
		super(props);

		Session
			._checkIfAuthorize(Session.session.user)
			.then(() => {
				let { username, dialplan } = Session.session.user;
				this._loadResources(username, dialplan);
			});
	}

	_loadResources(username, dialplan) {
		return this
			._loadUser(username)
			.then(this._loadUserDialplan(dialplan));
	}

	_loadUser() {
		return User.load();
	}

	_loadUserDialplan(dialplan) {
		return Dialplan.load({
			id: dialplan.id
		});

		// return User.loadCollection('dialplan', {
		// 	id: username + ', ' + dialplan.id
		// });
	}

	render() {
		let Page;
		
		if (Dialplan.dialplan.personal) {
			Page = <DialplanPersonal dialplan={Dialplan.dialplan}/>;
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