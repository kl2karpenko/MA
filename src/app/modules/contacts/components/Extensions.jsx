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
		obj.title = item.name;

		return obj;
	});
}

export default class Contacts extends Component {
	constructor(props) {
		super(props);
	}

	_setActiveContact(i, id) {
		Dialplan._followTo("contact", id);
		console.log(id, '_setActiveContact');

		Mailbox
			.load({
				id: id
			})
			.then(Dialplan.save.bind(Dialplan))
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	_setActiveContact(i, id) {
		console.log(i ,id);

		Dialplan.updateAttributesFor("follow.contact", id);
		Dialplan
			.save()
			.then(() => {
				hashHistory.goBack();
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