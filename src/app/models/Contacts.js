import List from 'List';
import { hashHistory } from 'react-router';

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
		let promise = new Promise((resolve, reject) => {

			Contacts.isAvailable().then((isAvailable) => {

				if (isAvailable) {
					if (this.cachedContacts && !this.cachedContacts.length) {
						return config.schema
							.mobileContacts()
							.then((contactsList) => {
								this.cachedContacts = contactsList.contacts;

								resolve(contactsList);
							});
					} else {

						resolve({ "contacts": this.cachedContacts })
					}
				} else {
					dialogs.confirm("Please check your settings to allow access to contact list", (permissionAccess) => {
						console.log(permissionAccess, 'permissionAccess');

						switch(permissionAccess) {
							case 1:
								Contacts.switchToSettings();
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

let instance = new Pin();

module.exports = (() => {
	return instance;
})();
