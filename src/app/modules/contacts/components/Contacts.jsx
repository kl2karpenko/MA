import React, { Component }     from 'react';
import { hashHistory }          from 'react-router';

import MobileContacts           from "models/Contacts";
import ListComponent            from "components/list/Index.jsx";

import Dialplan                 from "models/Dialplan";

import { $t }                   from 'lib/locale';

/** Import ================================================================== */

export default class Contacts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: props.search
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			search: nextProps.search || ""
		});
	}

	_setActiveContact(i, contactData) {
		let id = Dialplan.getValueByPath("_id");

		if (!id) {
			hashHistory.replace('/dialplans');
			return;
		}
		
		Dialplan
			._saveFollowToTransfer({
				number: contactData.number,
				type: "contact"
			})
			.then(() => {
				hashHistory.replace('/dialplans/' + id);
			}).fail((fl) => {
			console.log('cant save diaplans for transfer, error: ', fl);
		});
	}

	render() {
		return (
			<ListComponent
				model={MobileContacts}
				search={this.state.search}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={MobileContacts.configData}
				withImg={true}
				onError={MobileContacts.textError}
			/>
		);
	}
}