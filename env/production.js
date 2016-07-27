import $ from 'jquery';
import config from "./config";

import Storage from 'models/Storage';

let isIOS = process.env.platformName === 'ios';

function getMobileNumber() {
	return new Promise((resolve, reject) => {
		if (!isIOS) {
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
}

function configContact (data) {
	let object = {};

	object.name = data.name && data.name.formatted;
	object.number = data.phoneNumbers[0].value;
	object.image = data.photos && data.photos[0] && data.photos[0].value || true;

	return object;
}

function _getContactsFromMobile() {
	return new Promise((resolve) => {
		let options = {};

		options.multiple = true;

		$(document).trigger('system:ajaxStart');

		navigator.contacts.find(["displayName", "phoneNumbers", "photos"], (contactsList) => {
			let contacts = [];

			contactsList.forEach((contactItem) => {
				contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contacts.push(configContact(contactItem)) : false;
			});

			resolve({
				contacts: contacts
			});

			$(document).trigger('system:ajaxComplete');
		}, () => {
			resolve({
				contacts: null
			});

			$(document).trigger('system:ajaxComplete');
		}, options);
	});
}

// let IPMac = 'http://192.168.2.105:8030/';
let IPMac = 'http://10.10.201.49:8030/';
let IPDesktop = 'http://10.10.200.28:8030/';

function getAddressOfHost() {
	let hostName =  isIOS ? IPMac : IPDesktop;

	return hostName;
}

module.exports = $.extend(true, config, {
	schema: {
		hostname: getAddressOfHost(),
		mobileContacts: _getContactsFromMobile,
		mobileSIMNumber: getMobileNumber
	}
});