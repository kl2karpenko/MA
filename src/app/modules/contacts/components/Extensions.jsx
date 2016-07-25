import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Extensions from "../models/Extensions";
import ListComponent from "components/list/Index.jsx";

import Dialplan from "models/Dialplan";

export default class ExtensionsCom extends Component {
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
				configData={Extensions.configData}
				withImg={true}
				onError={"Empty list"}
			/>
		);
	}
}