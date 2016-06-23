import $ from 'jquery';
import config from "./config";

function _getContactsFromMobile(cb) {
	return navigator.contactsPhoneNumbers.list((contactsList) => {
		contactsList = contactsList.filter((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		cb(contactsList);
	});
}

let isIOS = process.env.platformName === 'ios';

let homeIPMac = 'http://192.168.4.186:8030';
let workIPMac = 'http://192.168.4.22:8030';
let workIPDesktop = 'http://192.168.4.42:8030';

let devServerHostName = "http://mobile-app.dev.kwebbl.net:8030/";

function getAddressOfHost() {
// TODO: only for development, delete after deploy
	let Ip =  isIOS ? workIPMac : workIPDesktop;

	return devServerHostName + "ajax/";
}

module.exports = $.extend(config, {
	"hostname": getAddressOfHost(),
	mobileContacts: _getContactsFromMobile
});