import List from 'List';

import config from 'envConfig';

class Pin extends List {
	init() {
		this.managedResource = 'contacts';
		this.cachedContacts = [];

		return List.prototype.init();
	}

	load() {
		if (!this.cachedContacts.length) {
			return config.schema
				.mobileContacts()
				.done((contactsList) => {
					this.cachedContacts = contactsList.contacts;
					this.assignAttributes(contactsList.contacts);
				});
		} else {
			return $.Deferred()
				.resolve({
					"contacts": this.cachedContacts
				})
				.done((data) => {
					// TODO add caching of contacts
					console.log(data.contacts);

					this.assignAttributes(data.contacts);
					return data;
				});
		}
	}

	_defaultContactsItem() {
		return {
			"number": "",
			"image": "",
			"name": ""
		};
	}
}

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
