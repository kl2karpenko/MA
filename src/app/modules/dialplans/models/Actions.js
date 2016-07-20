import List from 'List';

import config from 'envConfig';

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
				title: "Follow original dialplan",
				info: "",
				className: "",
				search: false,
				name: "origin",
				active_action_key: "origin"
			},
			{
				title: "Forward to my mobile",
				info: "",
				className: "",
				search: false,
				name: "mobile",
				active_action_key: "transfer"
			},
			{
				title: "Forward to " + (this.personal ? "my" : " ") + " mailbox",
				info: "",
				className: (!this.personal ? "with-search" : " "),
				search: (!this.personal ? true : false),
				name: "mailbox",
				link: "/mailboxes",
				active_action_key: "mailbox"
			},
			{
				title: "Forward to",
				info: "",
				className: "with-search",
				search: true,
				name: "contact",
				link: "/contacts",
				active_action_key: "transfer"
			}
		];

		return config.schema
			.mobileSIMNumber()
			.then((number) => {
				console.log(number);
				
				defaultModel[1].info = number;

				return defaultModel;
			});
	}
}
