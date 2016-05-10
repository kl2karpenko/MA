import $ from 'jquery';

function _getContactsFromMobile(contacts, cb) {
	return $.get("/ajax/contacts", (contactsData) => {
		contactsData = contactsData.map((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		cb(contactsData);
	})
}

module.exports = {
	"routesData": {
		"contacts": _getContactsFromMobile,
		"users": "/ajax/users"
	}
};