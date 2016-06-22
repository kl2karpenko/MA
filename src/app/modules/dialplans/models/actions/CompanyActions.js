import List from 'List';

class CompanyActions extends List {
	init() {
		this.managedResource = 'personalActions';
	}

	afterInit() {
		this.assignAttributes(this._getStaticModel());
	}

	_getStaticModel() {
		return [
			{
				name: "Follow original dialplan",
				info: "",
				className: "",
				value: "original"
			},
			{
				name: "Forward to my mobile",
				info: "+38093 403 23 79",
				className: "",
				value: "mobile"
			},
			{
				name: "Forward to voicemail",
				info: "",
				className: "with-search",
				value: "voicemail"
			},
			{
				name: "Forward to",
				info: "Tap to choose a contact",
				className: "with-search",
				value: "contact"
			}
		];
	}

	_defaultCompanyActionsItem() {
		return {
			name: "",
			info: "",
			className: "",
			value: "",
			active: true
		};
	}
}

let instance = new CompanyActions();

module.exports = (() => {
	return instance;
})();
