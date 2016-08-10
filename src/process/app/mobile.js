import $                      from 'jquery';
import config                 from "../config";
import Storage                from 'models/Storage';
import diagnostic             from 'diagnostic';
import dialogs                from 'dialogs';
import camera                 from 'camera';
import contacts               from 'contacts';
import barcodeScanner         from 'barcodeScanner';

import helpers                from "lib/helpers";
import { logError, logInfo }  from "lib/logger";

function configContact (data, index) {
	let object = {};

	object.id = data.id;
	object.name = data.displayName;
	object.number = data.phoneNumbers[index || 0].normalizedNumber;
	object.image = true;

	return object;
}

module.exports = {
	getMobileContacts() {
		return new Promise((resolve, reject) => {
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
			}
		);
	},

	getMobileImages(arrayToAdd) {
		return new Promise((resolve) => {
			navigator.contacts.find([navigator.contacts.fieldType.photoes, navigator.contacts.fieldType.id], (contactsList) => {

				logInfo("Start load contacts with images");
					contactsList.forEach((contactItem) => {
						let contactId             = contactItem.id;
						let contactFromCacheIndex = helpers.getIndexOfItemByAttr("id", arrayToAdd, contactId);

						// set image for contact item in main list
						arrayToAdd[contactFromCacheIndex].image = contactItem.photos && contactItem.photos[0] &&
							contactItem.photos[0].value || true;
					});

					console.log(arrayToAdd);

					logInfo("End load contacts with images");
					resolve(arrayToAdd);
				},
				(errorForContacts) => {
					resolve(arrayToAdd);
					logError("Contacts", errorForContacts);
				},
				{
					multiple: true,
					hasPhoneNumber: true
				});
		});
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
