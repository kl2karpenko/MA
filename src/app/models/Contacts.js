import List                             from 'List';
import { hashHistory }                  from 'react-router';

import { contacts, switchToSettings,
	dialogs, getMobileContacts }          from "appConfig";

import { $t }                           from 'lib/locale';

/** Import ================================================================== */

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
						if (giveAccess) {
							return this._loadContactsOrTakeFromCache();
						}
					});
					break;
				case 3:
					dialogs.confirm($t("contacts.allow_access_to_list"), (permissionAccess) => {
						switch(permissionAccess) {
							case 1:
								contacts.switchToSettings();
								break;
							case 0:
							case 2:
								hashHistory.push('/contacts/extensions');
								break;
						}
					}, $t("contacts.access_to_list_contact_denied"), [$t("to_settings"), $t("cancel")]);
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
		$(document).trigger('system:loading');

		return this._getContactsAccess()
			.then((data) => {
				this.assignAttributes(data.contacts);
				$(document).trigger('system:loaded');
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
