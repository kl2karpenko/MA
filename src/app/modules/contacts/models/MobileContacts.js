import List     from 'List';

import Contacts from "models/Contacts";

/** Import ================================================================== */

class MobileContacts extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'contacts';
	}

	configData(data) {
		return Contacts.configData(data);
	}

	load() {
		return Contacts.load();
	}

	_defaultContactsItem() {
		return {
			"name": "",
			"number": "",
			"type": ""
		};
	}
}

let instance = new MobileContacts();

module.exports = (() => {
	return instance;
})();
