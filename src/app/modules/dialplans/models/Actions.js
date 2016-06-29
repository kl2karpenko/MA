import List from 'List';

export default class Actions extends List {
	init(props) {
		this.managedResource = "actions";

		this.personal = props.personal;
	}

	afterInit() {
		this.assignAttributes(this._getStaticModel());
	}

	_getStaticModel() {
		return [
			{
				title: "Follow original dialplan",
				info: "",
				className: "",
				name: "original"
			},
			{
				title: "Forward to my mobile",
				info: "",
				className: "",
				name: "mobile"
			},
			{
				title: "Forward to " + (this.personal ? "my" : " ") + " voicemail",
				info: "",
				className: (!this.personal ? "with-search" : " "),
				name: "voicemail"
			},
			{
				title: "Forward to",
				info: "",
				className: "with-search",
				name: "contact"
			}
		];
	}
}
