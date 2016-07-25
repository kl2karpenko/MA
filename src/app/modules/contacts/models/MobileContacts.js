import List from 'List';

import Contacts from "models/Contacts";

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

	configData(data) {
		return Contacts.configData(data);
	}
	
	load() {
		return Contacts.load();
	}
}

let instance = new MobileContacts();

module.exports = (() => {
	return instance;
})();
