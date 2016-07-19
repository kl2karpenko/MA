import List from 'List';

import config from 'envConfig';
import dialogs from 'dialogs';
import Contacts from 'lib/contacts';

class Pin extends List {
	init() {
		this.managedResource = 'contacts';
		this.cachedContacts = [];

		return List.prototype.init();
	}

	load() {
		if (Contacts.isAvailable()) {
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
		} else {
			dialogs.confirm("Please check your settings to allow access to contact list", (permissionAccess) => {
				permissionAccess && Contacts.switchToSettings();
			}, "Access to camera denied", ["Go to settings", "Cancel"]);
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
