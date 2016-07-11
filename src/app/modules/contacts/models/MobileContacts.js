import List from 'List';

import config from 'envConfig';

class MobileContacts extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'contacts';
	}

	_defaultContactsItem() {
		return {
			"name": "",
			"number": ""
		};
	}
	
	load() {
		return config.mobileContacts().done((data) => {
			let type = Array.isArray(data.contacts);

			console.log(type, data.contacts);

			type && this.assignAttributes(data.contacts);
		});
	}
}

let instance = new MobileContacts();

module.exports = (() => {
	return instance;
})();
