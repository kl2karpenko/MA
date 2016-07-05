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
				name: "original"
			},
			{
				title: "Forward to my mobile",
				info: "",
				className: "",
				search: false,
				name: "mobile"
			},
			{
				title: "Forward to " + (this.personal ? "my" : " ") + " mailbox",
				info: "",
				className: (!this.personal ? "with-search" : " "),
				search: (!this.personal ? true : false),
				name: "mailbox",
				link: "/mailboxes"
			},
			{
				title: "Forward to",
				info: "",
				className: "with-search",
				search: true,
				name: "contact",
				link: "/contacts"
			}
		];

		return config
			.mobileSIMNumber()
			.then((number) => {
				defaultModel[1].info = number;

				return defaultModel;
			});
	}
}
