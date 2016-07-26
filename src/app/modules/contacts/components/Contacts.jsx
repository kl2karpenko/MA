import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import MobileContacts from "../models/MobileContacts";
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
				type: "contact"
			})
			.then(() => {
				hashHistory.push('/dialplans/' + id);
			});
	}

	render() {
		return (
			<ListComponent
				model={MobileContacts}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={MobileContacts.configData}
				withImg={true}
				onError={"No permission to your contact list"}
			/>
		);
	}
}