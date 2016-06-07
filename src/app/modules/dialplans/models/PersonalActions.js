import List from 'List';

class PersonalActions extends List {
	init() {
		this.managedResource = 'personalActions';
	}

	afterInit() {
		this.assignAttributes(this._defineLoadModel());
	}

	_defineLoadModel() {
		return [
			{
				name: "Follow original dialplan",
				info: "",
				className: "",
				value: "original",
				active: true
			},
			{
				name: "Forward to my mobile",
				info: "+38093 403 23 79",
				className: "",
				value: "mobile",
				active: true
			},
			{
				name: "Forward to my voicemail",
				info: "",
				className: "",
				value: "voicemail",
				active: true
			},
			{
				name: "Forward to",
				info: "Tap to choose a contact",
				className: "with-search",
				value: "contact",
				active: true
			}
		];
	}

	_defaultPersonalActionsItem() {
		return {
			name: "",
			info: "",
			className: "",
			value: "",
			active: true
		};
	}
}

let instance = new PersonalActions();

module.exports = (() => {
	return instance;
})();
