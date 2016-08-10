import List                             from 'List';
import { hashHistory }                  from 'react-router';

import { contacts, switchToSettings,
	dialogs, getMobileContacts,
	getMobileImages }          from "appConfig";

import { $t }                           from 'lib/locale';
import { logError, logInfo }            from "lib/logger";

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
		return contacts
			.getContactsStatus()
			.then((isAvailable) => {
				if(isAvailable === 1) {
					this.textError = false;
					return this._loadContactsOrTakeFromCache();
				} else {
					logError("contacts permission, undefined status for permission", isAvailable);
				}

				$(document).trigger('system:loaded');
			})
			.catch((statusPermission) => {
				logInfo('Contacts', `get status: ${statusPermission}`);

				switch(statusPermission) {
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

				$(document).trigger('system:loaded');
			});
	}

	_getContactsRequestIfNotDetermined() {
		return contacts
			.requestForAccess()
			.then((giveAccess) => {
				if (giveAccess) {
					this.textError = false;
					return this._loadContactsOrTakeFromCache();
				} else {
					logInfo("contacts permission", "permission denied");
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
					})
					.catch((errorForLoadContacts) => {
						this.cachedContacts = [];
						resolve({ "contacts": this.cachedContacts });

						getMobileImages(this.cachedContacts).then(() => {
							logInfo("Contacts", "load images for contacts");
						});

						logError("Contacts", errorForLoadContacts);
					});
			} else {
				resolve({ "contacts": this.cachedContacts });
			}
			
			$(document).trigger('system:loaded');
		});
	}

	load() {
		$(document).trigger('system:loading');

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
