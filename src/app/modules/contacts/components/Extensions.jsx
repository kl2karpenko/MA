import React, { Component }     from 'react';
import { hashHistory }          from 'react-router';

import Extensions               from "../models/Extensions";
import ListComponent            from "components/list/Index.jsx";

import Dialplan                 from "models/Dialplan";
import { $t }                   from 'lib/locale';

/** Import ================================================================== */

export default class ExtensionsCom extends Component {
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
				type: contactData.type || "extension",
				id: contactData.id,
				user_id: contactData.user_id
			})
			.then(() => {
				hashHistory.replace('/dialplans/' + id);
			});
	}

	render() {
		return (
			<ListComponent
				model={Extensions}
				search={this.state.search}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={Extensions.configData}
				withImg={true}
			/>
		);
	}
}