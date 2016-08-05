import $                  from 'jquery';
import diagnostic         from 'diagnostic';
import dialogs            from 'dialogs';
import camera             from 'camera';
import contacts           from 'contacts';
import barcodeScanner     from 'barcodeScanner';

module.exports = {
	getMobileContacts: function () {
		function configContact (data) {
			let object = {};

			object.name = data.displayName;
			object.image = data.image;
			object.number = data.phoneNumbers[0].normalizedNumber;

			return object;
		}

		return new Promise((resolve) => {
			$.get("/contacts", (contactsData) => {
				if (Array.isArray(contactsData.contacts)) {
					contactsData.contacts = contactsData.contacts.map((contactItem) => {
						return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? configContact(contactItem) : false
					});
				}

				resolve(contactsData);
			});
		});
	},
	
	getMobileSIMNumber: function () {
		return new Promise((resolve) => {
			resolve("0504144151");
		});
	},

	dialogs: dialogs,

	diagnostic: diagnostic,

	camera: camera,

	barcodeScanner: barcodeScanner,

	contacts: contacts
};
