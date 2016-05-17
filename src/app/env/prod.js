function _getContactsFromMobile(contacts, cb) {
	return contacts.list((contactsList) => {
		contactsList = contactsList.filter((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		cb(contactsList);
	});
}

// TODO: only for development, delete after deploy
function getAddressOfHost() {
	let Ip =  isIOS ? workIPMac : workIPDesktop;

	return Ip + "/ajax/";
}

let isIOS = process.env.platformName === 'ios';

let homeIPMac = 'http://192.168.4.186';
let workIPMac = 'http://192.168.2.105:8030';
let workIPDesktop = 'http://192.168.3.51:8030';

module.exports = {
	"hostname": getAddressOfHost()
};

// module.exports = {
// 	"schema": {
// 		"contacts": _getContactsFromMobile,
// 		"extensions": setAddressForRequest("extensions"),
// 		"login": setAddressForRequest("login"),
// 		"pin": setAddressForRequest("pin")
// 	}
// };

// work - http://192.168.4.186
// home - http://192.168.2.105