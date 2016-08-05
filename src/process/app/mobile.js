import $                      from 'jquery';
import config                 from "../config";
import Storage                from 'models/Storage';
import diagnostic             from 'diagnostic';
import dialogs                from 'dialogs';
import camera                 from 'camera';
import contacts               from 'contacts';
import barcodeScanner         from 'barcodeScanner';
import { logError, logInfo }  from "lib/logger";

function configContact (data) {
	let object = {};

	object.name = data.name && data.name.formatted;
	object.number = data.phoneNumbers[0].value;
	object.image = data.photos && data.photos[0] && data.photos[0].value || true;

	return object;
}

module.exports = {
	getMobileContacts() {
		return new Promise(
			(resolve, reject) => {
				$(document).trigger('system:loading');

				navigator.contacts.find(["displayName", "phoneNumbers", "photos"], (contactsList) => {
					let contacts = [];

					contactsList.forEach((contactItem) => {
						contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contacts.push(configContact(contactItem)) : false;
					});

					resolve({
						contacts: contacts
					});

					$(document).trigger('system:loaded');
				},
				(errorForContacts) => {
					reject(null);

					logError("Contacts", errorForContacts);

					$(document).trigger('system:loaded');
					},
					{
						multiple: true,
						hasPhoneNumber: true
					});
				}
		);
	},

	getMobileSIMNumber() {
		return new Promise((resolve, reject) => {
			if (!config.isIOS()) {
				window.plugins.sim.getSimInfo((result) => {
					if (result.phoneNumber) {
						Storage.setValue('phone', result.phoneNumber);
						resolve(result.phoneNumber);
					} else {
						resolve(null);
					}
				}, (result) => {
					reject(result);
				});
			} else {
				resolve(null);
			}
		});
	},

	dialogs: dialogs,

	diagnostic: diagnostic,
	
	camera: camera,

	barcodeScanner: barcodeScanner,
	
	contacts: contacts
};
