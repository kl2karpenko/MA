import React, { Component }     from 'react';
import { hashHistory }          from 'react-router';

import Swipeable                from "react-swipeable";

import Extensions               from "../models/Extensions";
import ListComponent            from "components/list/Index.jsx";

import Dialplan                 from "models/Dialplan";
import { $t }                   from 'lib/locale';

/** Import ================================================================== */

export default class ExtensionsCom extends Component {
	constructor(props) {
		super(props);
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
				type: "extension",
				id: contactData._id,
				user_id: contactData.user_id
			})
			.then(() => {
				hashHistory.replace('/dialplans/' + id);
			});
	}

	render() {
		return (
			<Swipeable
				className="swipeable"
				onSwipingRight={() => {
					clearTimeout(this.isSwiping);

					this.isSwiping = setTimeout(() => {
						this.isSwiping = false;
						hashHistory.replace("contacts/mobile");
					}, 50);
				}}
				flickThreshold={0.1}
			>
			<ListComponent
				model={Extensions}
				listClass="m-list-contacts"
				onClick={this._setActiveContact}
				configData={Extensions.configData}
				withImg={true}
				onError={$t("contacts.errors.empty")}
			/>
			</Swipeable>
		);
	}
}