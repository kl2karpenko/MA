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

	object.name = data.name && data.name.formatted;
	object.number = data.phoneNumbers[0].value;
	object.image = data.photos && data.photos[0] && data.photos[0].value || true;

	return object;
}

let contactsFromMobileGlobal = [];

function _getContactsFromMobile() {
	let deferred = $.Deferred();

	$(document).trigger('system:ajaxStart');
	console.log(contactsFromMobileGlobal, '_getContactsFromMobile');

	navigator.contacts.find([
		navigator.contacts.fieldType.displayName,
		navigator.contacts.fieldType.phoneNumbers,
		navigator.contacts.fieldType.photos,
		navigator.contacts.fieldType.name
	], (contactsList) => {
		contactsList.forEach((contactItem) => {
			contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactsFromMobileGlobal.push(configContact(contactItem)) : false;
		});

		deferred.resolve({
			contacts: contactsFromMobileGlobal
		});

		$(document).trigger('system:ajaxComplete');
	}, () => {
		deferred.resolve({
			contacts: false
		});

		$(document).trigger('system:ajaxComplete');
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