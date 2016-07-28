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

	_getContactsAccess() {
		return contacts.getContactsStatus().then((isAvailable) => {
			switch(isAvailable) {
				// contacts is have been requested and access is granted
				case 1:
					return this._loadContactsOrTakeFromCache();
					break;
				// contacts is have been requested but access was denied
				case 2:
					contacts.requestForAccess().then((giveAccess) => {
						console.log('giveAccess for contacts: ', giveAccess);

						if (giveAccess) {
							return this._loadContactsOrTakeFromCache();
						}
					});
					break;
				case 3:
					dialogs.confirm("Please check your settings to allow access to contact list", (permissionAccess) => {
						switch(permissionAccess) {
							case 1:
								contacts.switchToSettings();
								break;
							case 0:
							case 2:
								hashHistory.push('/contacts/extensions');
								break;
						}
					}, "Access to your contact list denied", ["Go to settings", "Don't allow"]);
					break;
			}
		});
	}

	_loadContactsOrTakeFromCache() {
		return new Promise((resolve) => {
			if (this.cachedContacts && !this.cachedContacts.length) {
				return getMobileContacts()
					.then((contactsList) => {
						this.cachedContacts = contactsList.contacts;

						resolve(contactsList);
					});
			} else {
				resolve({ "contacts": this.cachedContacts });
			}
		});
	}

	load() {
		return this._getContactsAccess()
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
