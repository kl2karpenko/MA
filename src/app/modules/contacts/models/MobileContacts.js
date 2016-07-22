import List from 'List';

import config from 'envConfig';
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
		return data && data.map((item) => {
			var obj = {};

			obj.number = item.number;
			obj.image = item.image;
			obj.name = item.name;
			obj.type = "extension";

			return obj;
		});
	}
	
	load() {
		return Contacts.load();
	}
}

let instance = new MobileContacts();

module.exports = (() => {
	return instance;
})();
