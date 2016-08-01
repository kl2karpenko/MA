import React, { Component }   from 'react';
import { hashHistory }        from 'react-router';

import AllContacts            from "../models/AllContacts";
import ListComponent          from "components/list/Index.jsx";

import Dialplan               from "models/Dialplan";

import { $t }                 from 'lib/locale';

/** Import ================================================================== */

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchContacts: AllContacts.getStateBy('searchQuery')
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			searchContacts: newProps.parentState
		});
	}

	_setActiveContact(i, contactData) {
		// TODO: edit search in contacts
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
				search={this.state.searchContacts}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				withImg={true}
				onError={$t("contacts.errors.empty")}
			/>
		);
	}
}