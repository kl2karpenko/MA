import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import AllContacts from "../models/AllContacts";
import ListComponent from "components/list/Index.jsx";

import Dialplan from "models/Dialplan";

export default class Contacts extends Component {
	constructor(props) {
		super(props);
	}

	_setActiveContact(i, contactData) {
		let id = Dialplan.getValueByPath("_id");

		if (!id) {
			hashHistory.push('/dialplans');
			return;
		}
		
		Dialplan
			._saveFollowToTransfer({
				number: contactData.number,
				type: contactData.type
			})
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	render() {
		return (
			<ListComponent
				model={AllContacts}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				withImg={true}
				onError={"No permission to your contact list"}
			/>
		);
	}
}