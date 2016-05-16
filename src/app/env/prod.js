function _getContactsFromMobile(contacts, cb) {
	return contacts.list((contactsList) => {
		contactsList = contactsList.filter((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		cb(contactsList);
	});
}

module.exports = {
	"routesData": {
		"contacts": _getContactsFromMobile,
		"login": process.env.platformName === 'ios' ? "http://192.168.2.105:8030/ajax/login" : "http://192.168.3.51:8030/ajax/login",
		"users": process.env.platformName === 'ios' ? "http://192.168.2.105:8030/ajax/users" : "http://192.168.3.51:8030/ajax/users"
	}
};

// work - http://192.168.4.186
// home - http://192.168.2.105