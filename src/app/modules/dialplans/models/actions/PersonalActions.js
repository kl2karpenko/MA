import List from 'List';
import CompanyActions from "../../models/actions/CompanyActions";

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
				is_on: false
			},
			{
				name: "Forward to my mobile",
				info: "+38093 403 23 79",
				className: "",
				value: "mobile",
				is_on: false
			},
			{
				name: "Forward to my voicemail",
				info: "",
				className: "",
				value: "voicemail",
				is_on: false
			},
			{
				name: "Forward to",
				info: "Tap to choose a contact",
				className: "with-search",
				value: "contact",
				is_on: false
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
