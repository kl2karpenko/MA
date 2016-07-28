import React, {Component} from 'react';
import { hashHistory } from 'react-router';

import Dialplan from "models/Dialplan";

import MailboxesList from "../models/MailboxesList";
import ListComponent from "components/list/Index.jsx";

import AdaptiveFixed from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper from 'components/layouts/adaptive/Wrapper.jsx';

import Angle from 'components/modules/angle/Index.jsx';
import AngleTop from 'components/modules/angle/Top.jsx';

import MainScroll from 'components/layouts/main/Scroll.jsx';

function _configData(data) {
	return data.map((item) => {
		var obj = {};

		obj._id = item._id;
		obj.number = item.number;
		obj.image = false;
		obj.color = item.color;
		obj.name = item.name;

		return obj;
	});
}

export default class Index extends Component {
	constructor(props) {
		super(props);

		this._setActiveMailbox = this._setActiveMailbox.bind(this);
	}

	_setActiveMailbox(i, mailboxData) {
		let id = Dialplan.getValueByPath("_id");

		if (!id) {
			hashHistory.push('/dialplans');
			return;
		}

		Dialplan
			._saveFollowToMailbox({
				_id: mailboxData._id,
				number: mailboxData.number
			})
			.then(() => {
				hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
			});
	}

	render() {
		return (
			<AdaptiveWrapper class="l-adaptive-sm">
				<Angle header={false}>
					<div className="m-angle-content">
						<AngleTop title="Forward to:"/>
					</div>
				</Angle>
				<AdaptiveFixed class="l-mailbox">
					<MainScroll>
						<ListComponent
							model={MailboxesList}
							listClass="m-list-mailbox"
							onClick={this._setActiveMailbox}
							configData={_configData}
						/>
					</MainScroll>
				</AdaptiveFixed>
			</AdaptiveWrapper>
		);
	}
}