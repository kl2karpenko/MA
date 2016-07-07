import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import MobileContacts from "../models/MobileContacts";
import ListComponent from "components/list/Index.jsx";

import Dialplan from "models/Dialplan";

function _configData(data) {	
	return data.map((item) => {
		var obj = {};

		obj.number = item.number;
		obj.image = true;
		obj.name = item.name;

		return obj;
	});
}

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
			.saveForFollowTo("contact", {
				_id: null,
				name: contactData.name + ` (${contactData.number})`,
				number: contactData.number,
				type: "mobile_contact"
			})
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	render() {
		console.log(MobileContacts);
		
		return (
			<ListComponent
				model={MobileContacts}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={_configData}
				withImg={true}
			/>
		);
	}
}