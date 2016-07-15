import $ from 'jquery';
import ProcessInfo from './process';

function _getMobileNumber() {
	let deferred = $.Deferred();

	deferred.resolve("0504144151");

	return deferred;
}

function _getContactsFromMobile() {
	function configContact (data) {
		let object = {};

		object.name = data.displayName;
		object.image = data.image;
		object.number = data.phoneNumbers[0].normalizedNumber;

		return object;
	}

	return $.get("/contacts", (contactsData) => {
		if (Array.isArray(contactsData.contacts)) {
			contactsData.contacts = contactsData.contacts.map((contactItem) => {
				return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? configContact(contactItem) : false
			});
		}
		return contactsData;
	})
}

module.exports = {
	modules: [
		"core",
		"authorize",
		"connects",
		"pin",
		"settings",
		"dialplans",
		"contacts",
		"mailboxes"
	],
	schema: {
		hostname: "/",
		mobileContacts: _getContactsFromMobile,
		mobileSIMNumber: _getMobileNumber
	},
	process: ProcessInfo
};