import $ from 'jquery';
import config from "./config";

function _getContactsFromMobile() {
	return $.get("/ajax/contacts", (contactsData) => {
		contactsData.contacts = contactsData.contacts.map((contactItem) => {
			return contactItem.phoneNumbers && contactItem.phoneNumbers[0] ? contactItem : false
		});
		return contactsData
	})
}

module.exports = $.extend(config, {
	"hostname": "/ajax/",
	mobileContacts: _getContactsFromMobile
});