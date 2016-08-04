import List from 'List';

class MailboxesList extends List {
	constructor(props) {
		super(props);
	}

	init() {
		this.managedResource = 'mailboxes';
	}

	_defaultMailboxesListItem() {
		return {
			"id": "",
			"name": "",
			"in_number": "",
			"color": "",
			"type": "mailbox"
		};
	}
}

let instance = new MailboxesList();

module.exports = (() => {
	return instance;
})();
