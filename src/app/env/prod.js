import $ from 'jquery';
import config from "./config";

let isIOS = process.env.platformName === 'ios';

function getMobileNumber() {
	let deferred = $.Deferred();
	deferred.resolve("094");

	return deferred;
}

function configContact (data) {
	let object = {};

	if (isIOS) {
		object.name = data.name && data.name.formatted;
		object.number = data.phoneNumbers[0].value;
	} else {
		object.name = data.displayName;
		object.number = data.phoneNumbers[0].normalizedNumber;
	}

	return object;
}

function _getContactsFromMobile() {
	let deferred = $.Deferred();

	navigator.contacts.find([
		navigator.contacts.fieldType.displayName,
		navigator.contacts.fieldType.phoneNumbers,
		navigator.contacts.fieldType.nickname,
		navigator.contacts.fieldType.photos,
		navigator.contacts.fieldType.name
	], (contactsList) => {
		console.log(contactsList);

		contactsList = contactsList.filter((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		contactsList = contactsList.map((contactItem) => {
			return configContact(contactItem)
		});

		deferred.resolve({
			contacts: contactsList
		});
	});

	return deferred;
}

let homeIPMac = 'http://192.168.4.186:8030/';
let workIPMac = 'http://10.10.201.49:8030/';
let workIPDesktop = 'http://10.10.200.28:8030/';

let devServerHostName = "http://mobile-app.dev.kwebbl.net:8030/";

function getAddressOfHost() {
// TODO: only for development, delete after deploy
	let hostName =  isIOS ? workIPMac : workIPDesktop;

	return hostName;
}

module.exports = $.extend(config, {
	hostname: getAddressOfHost(),
	mobileContacts: _getContactsFromMobile,
	mobileSIMNumber: getMobileNumber
});