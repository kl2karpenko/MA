import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import Swipeable from "react-swipeable";

import MobileContacts from "../models/MobileContacts";
import ListComponent from "components/list/Index.jsx";

import Dialplan from "models/Dialplan";

export default class Contacts extends Component {
	constructor(props) {
		super(props);

		this.isSwiping = false;
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
			<Swipeable
				className="swipeable"
				onSwipingLeft={() => {
					clearTimeout(this.isSwiping);

					this.isSwiping = setTimeout(() => {
						this.isSwiping = false;
						hashHistory.push("contacts/extensions");
					}, 50);
				}}
				flickThreshold={0.1}
			>
				<ListComponent
					model={MobileContacts}
					listClass="m-list-contacts"
					onClick={this._setActiveContact}
					configData={MobileContacts.configData}
					withImg={true}
					onError={"No permission to your contact list"}
				/>
			</Swipeable>
		);
	}
}