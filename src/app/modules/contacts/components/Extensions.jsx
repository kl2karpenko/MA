import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Extensions from "../models/Extensions";
import ListComponent from "components/list/Index.jsx";

import Dialplan from "models/Dialplan";

function _configData(data) {
	return data.map((item) => {
		var obj = {};

		obj._id = item._id;
		obj.number = item.in_number;
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
				number: contactData.number,
				type: "extension"
			})
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	render() {
		return (
			<ListComponent
				model={Extensions}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={_configData}
				withImg={true}
			/>
		);
	}
}