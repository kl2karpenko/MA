import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import MobileContacts from "../models/MobileContacts";
import ListComponent from "components/list/Index.jsx";

import Dialplan from "models/Dialplan";
import PhoneNumber from "models/PhoneNumber";

function _configData(data) {	
	return data && data.map((item) => {
		var obj = {};

		obj.number = item.number;
		obj.image = item.image;
		obj.name = item.name;

		return obj;
	});
}

export default class Contacts extends Component {
	constructor(props) {
		super(props);
	}

	_setActiveContact(i, contactData) {
		let id = Dialplan.getValueByPath("_id"),
			followObject = {
				number: contactData.number,
				type: "contact"
			},
			followPath = "contact";

		if (!id) {
			hashHistory.push('/dialplans');
			return;
		}

		/**
		 * if person takes from list of contacts his own number
		 */
		if (contactData.number === PhoneNumber.getValueByPath('value')) {
			followPath = "mobile";
		}
		
		Dialplan
			.saveForFollowTo(followPath, followObject)
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	render() {
		return (
			<ListComponent
				model={MobileContacts}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={_configData}
				withImg={true}
				onError={"No permission to your contact list"}
			/>
		);
	}
}