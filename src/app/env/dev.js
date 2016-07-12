import $ from 'jquery';
import config from "./config";

function getMobileNumber() {
	let deferred = $.Deferred();

	deferred.resolve(null);

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

function getAddressOfHost() {
// TODO: only for development, delete after deploy
	let hostName =  "/";

	return hostName;
}

module.exports = $.extend(config, {
	hostname: getAddressOfHost(),
	mobileContacts: _getContactsFromMobile,
	mobileSIMNumber: getMobileNumber
});