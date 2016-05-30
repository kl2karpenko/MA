import $ from 'jquery';
import config from "./config";

function _getContactsFromMobile(contacts, cb) {
	return $.get("/ajax/contacts", (contactsData) => {
		contactsData = contactsData.map((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});

		cb(contactsData);
	})
}

module.exports = $.extend(config, {
	"hostname": "/ajax/"
});