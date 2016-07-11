import $ from 'jquery';
import config from "./config";

function getMobileNumber() {
	let deferred = $.Deferred();

	deferred.resolve("+380934032379");

	return deferred;
}

function configContact (data) {
	let object = {};

	object.name = data.displayName;
	object.image = data.image;
	object.number = data.phoneNumbers[0].normalizedNumber;

	return object;
}

function _getContactsFromMobile() {
	return $.get("/contacts", (contactsData) => {
		if (Array.isArray(contactsData.contacts)) {
			contactsData.contacts = contactsData.contacts.map((contactItem) => {
				return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? configContact(contactItem) : false
			});
		}
		return contactsData;
	})
}

module.exports = $.extend(config, {
	hostname: "/",
	mobileContacts: _getContactsFromMobile,
	mobileSIMNumber: getMobileNumber
});