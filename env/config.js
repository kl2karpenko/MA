import $ from 'jquery';
import ProcessInfo from './process';

function _getMobileNumber() {
	return new Promise((resolve) => {
		resolve("0504144151");
	});
}

function _getContactsFromMobile() {
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
		})
	});
}


function getTokenHostName() {
	let tokenHostName = "http://10.60.28.150:4445/token";
	let localTokenHostName = "/token";

	return tokenHostName;
}

module.exports = {
	modules: [
		"core",
		"connects",
		"pin",
		"settings",
		"dialplans",
		"contacts",
		"mailboxes"
	],
	schema: {
		hostname: "",
		tokenHostname: getTokenHostName(),
		mobileContacts: _getContactsFromMobile,
		mobileSIMNumber: _getMobileNumber
	},
	process: ProcessInfo
};
