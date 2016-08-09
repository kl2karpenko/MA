import $                      from 'jquery';
import config                 from "../config";
import Storage                from 'models/Storage';
import diagnostic             from 'diagnostic';
import dialogs                from 'dialogs';
import camera                 from 'camera';
import contacts               from 'contacts';
import barcodeScanner         from 'barcodeScanner';
import { logError, logInfo }  from "lib/logger";

function configContact (data, index) {
	let object = {};

	object.name = data.displayName;
	object.number = data.phoneNumbers[index || 0].normalizedNumber;
	object.image = true;

	return object;
}

module.exports = {
	getMobileContacts() {
		return new Promise(
			(resolve, reject) => {
				$(document).trigger('system:loading');

				navigator.contactsPhoneNumbers.list(function(contacts) {
					let contactsList = [];

					for(var i = 0; i < contacts.length; i++) {
						let contactItemPhones = contacts[i].phoneNumbers;

						if (contactItemPhones.length === 1) {
							contactsList.push(configContact(contacts[i]));
						} else {
							for(var j = 0; j < contactItemPhones.length; j++) {
								contactsList.push(configContact(contacts[i], j));
							}
						}
					}

					resolve({
						contacts: contactsList
					});

					$(document).trigger('system:loaded');
				}, function(error) {
					reject(null);

					logError("Contacts", error);

					$(document).trigger('system:loaded');
				});

				navigator.contacts.find([navigator.contacts.fieldType.displayName,
						navigator.contacts.fieldType.name,
						navigator.contacts.fieldType.phoneNumbers], (contactsList) => {
					let contacts = [];

					contactsList.forEach((contactItem) => {
						contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contacts.push(configContact(contactItem)) : false;
					});

					resolve({
						contacts: contacts
					});
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
