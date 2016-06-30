import $ from 'jquery';
import config from "./config";

function getMobileNumber() {
	let deferred = $.Deferred();
	
	window.plugins.sim.getSimInfo((result) => {
		deferred.resolve(result.phoneNumber);
		console.log(result.phoneNumber);
	}, (result) => {
		console.error(result);
	});
	
	return deferred;
}

function configContact (data) {
	let object = {};

	object.name = data.displayName;
	object.number = data.phoneNumbers[0].normalizedNumber;

	return object;
}

function _getContactsFromMobile() {
	let deferred = $.Deferred();

	navigator.contactsPhoneNumbers.list((contactsList) => {
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

let isIOS = process.env.platformName === 'ios';

let homeIPMac = 'http://192.168.4.186:8030/';
let workIPMac = 'http://192.168.1.12:8030/';
let workIPDesktop = 'http://10.10.200.28:8030/';

let devServerHostName = "http://mobile-app.dev.kwebbl.net:8030/";

function getAddressOfHost() {
// TODO: only for development, delete after deploy
	let Ip =  isIOS ? workIPMac : workIPDesktop;

	return workIPMac + "ajax/";
}

module.exports = $.extend(config, {
	"hostname": getAddressOfHost(),
	mobileContacts: _getContactsFromMobile,
	mobileSIMNumber: getMobileNumber
});