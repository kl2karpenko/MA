import List from 'List';
import { hashHistory } from 'react-router';

import { contacts, switchToSettings, dialogs, getMobileContacts } from "appConfig";

class ContactList extends List {
	init() {
		this.managedResource = 'contacts';
		this.cachedContacts = [];

		return List.prototype.init();
	}

	_getModelName() {
		return this.managedResource;
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
		let promise = new Promise((resolve) => {
			contacts.isAvailable().then((isAvailable) => {
				if (isAvailable) {
					if (this.cachedContacts && !this.cachedContacts.length) {
						return getMobileContacts()
							.then((contactsList) => {
								this.cachedContacts = contactsList.contacts;

								resolve(contactsList);
							});
					} else {
						resolve({ "contacts": this.cachedContacts })
					}
				} else {
					dialogs.confirm("Please check your settings to allow access to contact list", (permissionAccess) => {
						switch(permissionAccess) {
							case 1:
								switchToSettings();
								break;
							case 0:
							case 2:
								hashHistory.push('/contacts/extensions');
								break;
						}
					}, "Access to your contact list denied", ["Go to settings", "Don't allow"]);

					resolve({ "contacts": false });
				}
			});
		});

		return promise
			.then((data) => {
				this.assignAttributes(data.contacts);
				return data;
			});
	}

	_defaultContactsItem() {
		return {
			"number": "",
			"image": "",
			"name": ""
		};
	}
}

let instance = new ContactList();

module.exports = (() => {
	return instance;
})();
