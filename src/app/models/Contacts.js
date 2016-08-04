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

		this.textError = "contacts.errors.permission_denied";

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
			obj.type = "contact";

			return obj;
		});
	}

	_getContactsAccess() {
		return contacts.getContactsStatus().then((isAvailable) => {
			if(isAvailable === 1) {
				this.textError = false;
				return this._loadContactsOrTakeFromCache();
			}
		}).catch((isAvailable) => {
			console.log('fail load contacts', isAvailable);

			switch(isAvailable) {
				// contacts is have been requested but access was denied
				case 2:
					return this._getContactsRequestIfNotDetermined();
					break;
				case 3:
					this.textError = $t("contacts.errors.permission_denied");
					dialogs.confirm($t("contacts.allow_access_to_list"), (permissionAccess) => {
						switch(permissionAccess) {
							case 1:
								contacts.switchToSettings();
								break;
							case 0:
							case 2:
								hashHistory.replace('/contacts/extensions');
								break;
						}
					}, $t("contacts.access_to_list_contact_denied"), [$t("to_settings"), $t("cancel")]);
					break;
			}
		});
	}

	_getContactsRequestIfNotDetermined() {
		return contacts.requestForAccess().then((giveAccess) => {
			if (giveAccess) {
				this.textError = false;
				return this._loadContactsOrTakeFromCache();
			}
		}).catch((fl) => {
			console.log('fail', fl);
		});
	}

	_loadContactsOrTakeFromCache() {
		return new Promise((resolve) => {
			if (this.cachedContacts && !this.cachedContacts.length) {
				return getMobileContacts()
					.then((contactsList) => {
						
						this.cachedContacts = contactsList.contacts;
						console.log(contactsList, this.cachedContacts);

						resolve(contactsList);
					}).catch((fl) => {
						console.log('cant load contacts, error: ', fl);
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
			}).catch((fl) => {
				console.log('fail load contacts', fl);
				$(document).trigger('system:loaded');
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
