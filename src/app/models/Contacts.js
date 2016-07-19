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
		let deferred = $.Deferred();

		Contacts.isAvailable().then((isAvailable) => {
			console.log(isAvailable);


			if (isAvailable) {
				if (!this.cachedContacts.length) {
					return config.schema
						.mobileContacts()
						.then((contactsList) => {
							this.cachedContacts = contactsList.contacts;

							deferred.resolve(contactsList);
						});
				} else {
					return deferred
						.resolve({
							"contacts": this.cachedContacts
						})
				}
			} else {
				dialogs.confirm("Please check your settings to allow access to contact list", (permissionAccess) => {
					permissionAccess && Contacts.switchToSettings();
				}, "Access to contacts denied", ["Go to settings", "Cancel"]);

				deferred
					.resolve({
						"contacts": false
					});
			}
		});

		return deferred
			.then((data) => {
				console.log(data);

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
