import $ from 'jquery';
import config from "./config";

function _getContactsFromMobile(contacts, cb) {
	return contacts.list((contactsList) => {
		contactsList = contactsList.filter((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		cb(contactsList);
	});
}

function getAddressOfHost() {
// TODO: only for development, delete after deploy
	let Ip =  isIOS ? workIPMac : workIPDesktop;

	return workIPMac + "/ajax/";
}

let isIOS = process.env.platformName === 'ios';

let homeIPMac = 'http://192.168.4.186:8030';
let workIPMac = 'http://192.168.4.58:8030';
let workIPDesktop = 'http://192.168.4.42:8030';

module.exports = $.extend(config, {
	"hostname": getAddressOfHost()
});