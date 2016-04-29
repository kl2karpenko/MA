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
		"users": "http://192.168.3.51:8030/ajax/users"
	}
};