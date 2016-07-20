import $ from 'jquery';
import config from "./config";

import Storage from 'models/Storage';

let isIOS = process.env.platformName === 'ios';

function getMobileNumber() {
	let deferred = $.Deferred();

	if (!isIOS) {
		window.plugins.sim.getSimInfo((result) => {
			Storage.setValue('phone', result.phoneNumber);
			deferred.resolve(result.phoneNumber);
		}, (result) => {
			console.error(result);
		});
	} else {
		deferred.resolve(null);
	}

	return deferred;
}

function configContact (data) {
	let object = {};

	object.name = data.name && data.name.formatted;
	object.number = data.phoneNumbers[0].value;
	object.image = data.photos && data.photos[0] && data.photos[0].value || true;

	return object;
}

function _getContactsFromMobile() {
	let deferred = $.Deferred();
	let options = {};

	options.multiple = true;

	$(document).trigger('system:ajaxStart');

	navigator.contacts.find(["displayName", "phoneNumbers", "photos"], (contactsList) => {
		let contacts = [];
		
		contactsList.forEach((contactItem) => {
			contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contacts.push(configContact(contactItem)) : false;
		});

		deferred.resolve({
			contacts: contacts
		});

		console.log('navigator.contacts.find')

		$(document).trigger('system:ajaxComplete');
	}, () => {
		deferred.resolve({
			contacts: null
		});

		$(document).trigger('system:ajaxComplete');
	}, options);

	return deferred;
}

let homeIPMac = 'http://192.168.2.105:8030/';
let workIPMac = 'http://10.10.201.49:8030/';
let workIPDesktop = 'http://10.10.200.28:8030/';

function getAddressOfHost() {
	let hostName =  isIOS ? workIPMac : workIPDesktop;

	return hostName;
}

module.exports = $.extend(config, {
	schema: {
		hostname: getAddressOfHost(),
		mobileContacts: _getContactsFromMobile,
		mobileSIMNumber: getMobileNumber
	}
});