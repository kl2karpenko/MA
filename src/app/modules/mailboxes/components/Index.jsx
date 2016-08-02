import React, {Component}   from 'react';
import { hashHistory }      from 'react-router';
import Tappable             from 'react-tappable';

import Dialplan             from "models/Dialplan";

import MailboxesList        from "../models/MailboxesList";
import ListComponent        from "components/list/Index.jsx";
import imageLoader          from 'imageLoader';

import AdaptiveFixed        from 'components/layouts/adaptive/IndexFixed.jsx';
import AdaptiveWrapper      from 'components/layouts/adaptive/Wrapper.jsx';

import Angle                from 'components/modules/angle/Index.jsx';
import AngleTop             from 'components/modules/angle/Top.jsx';

import MainScroll           from 'components/layouts/main/Scroll.jsx';

import { $t }               from 'lib/locale';

/** Import ================================================================== */

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

	static _leave() {
		hashHistory.push('/dialplans/' + Dialplan.getValueByPath("_id"));
	}

	render() {
		return (
			<AdaptiveWrapper class="l-adaptive-sm">
				<Angle header={false}>
					<div className="m-angle-content">
						<AngleTop title={$t("mailboxes.follow_to")}/>
					</div>

					<Tappable
						pressDelay={500}
						component="button"
						className="m-angle__button btn btn-round btn-sm btn-right btn-round-grey"
						onTap={Index._leave}
					>
						<img src={imageLoader(require("images/icons/cross-white-big.png"))} alt="Quit settings"/>
					</Tappable>
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