import List                   from 'List';

import { getMobileSIMNumber } from "appConfig";

/** Import ================================================================== */

export default class Actions extends List {
	init(props) {
		this.managedResource = "actions";

		this.personal = props.personal;
	}

	afterInit() {
		this
			._getStaticModel()
			.then((model) => {
				this.assignAttributes(model);
			});
	}

	_getStaticModel() {
		let defaultModel = [
			{
				title: "dialplans.actions.follow_original",
				info: "",
				className: "",
				search: false,
				name: "origin",
				active_action_key: "origin"
			},
			{
				title: "dialplans.actions.follow_mobile",
				info: "",
				className: "",
				search: false,
				name: "mobile",
				active_action_key: "transfer"
			},
			{
				title: !this.personal ? "dialplans.actions.follow_mailbox" : "dialplans.actions.follow_my_mailbox",
				info: "",
				className: (!this.personal ? "with-search" : " "),
				search: !this.personal,
				name: "mailbox",
				link: "/mailboxes",
				active_action_key: "mailbox"
			},
			{
				title: "dialplans.actions.follow_to",
				info: "",
				className: "with-search",
				search: true,
				name: "contact",
				link: "/contacts",
				active_action_key: "transfer"
			}
		];

		return getMobileSIMNumber()
			.then((number) => {
				defaultModel[1].info = number;

				return defaultModel;
			});
	}
}
